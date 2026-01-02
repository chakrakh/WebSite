from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TeamMember(BaseModel):
    name: str
    role: str
    bio: List[str]
    image_url: Optional[str] = None

class RoadmapItem(BaseModel):
    phase: str
    timeline: str
    title: str
    items: List[str]

# Data (Hardcoded for this MVP version, but served via API)
TEAM_DATA = [
    {
        "name": "Hridayesh Behl (Heart)",
        "role": "Founder & Visionary",
        "bio": [
            "Visionary student entrepreneur and passionate researcher.",
            "Mechatronics Engineer and certified Data Engineer.",
            "Skill India 2024 medalist in renewable energy.",
            "Expertise in Nanotechnology, Battery Technologies, IoT, and AI/ML."
        ],
        "image_url": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" # Placeholder
    },
    {
        "name": "Prof N Satyanarayana (Wisdom)",
        "role": "Mentor & Scientific Advisor",
        "bio": [
            "Emirates Professor and ex HOD Physics Pondicherry University.",
            "Over 45 years of expertise in Materials Science and renewable energy.",
            "Published 150+ papers and completed 22 research projects."
        ],
        "image_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" # Placeholder
    },
    {
        "name": "Mr Rao Ambati (Impact)",
        "role": "Strategic Advisor & Investor",
        "bio": [
            "20 years of experience in managing and delivering end-to-end projects.",
            "Specialist in Change and Release Management across global markets.",
            "Expertise in Retail, Telecom, Banking, and Energy sectors."
        ],
        "image_url": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" # Placeholder
    }
]

ROADMAP_DATA = [
    {
        "phase": "Foundation",
        "timeline": "Q4 2025 - Q2 2026",
        "title": "Hardware Integration & Testing",
        "items": [
            "AbhiRaman Optimizer validation",
            "Hardware-in-the-Loop (HIL) testing",
            "Proprietary propeller efficiency tests"
        ]
    },
    {
        "phase": "Regulatory",
        "timeline": "Q3 2026 - Q4 2026",
        "title": "Approvals & Pilot Onboarding",
        "items": [
            "Regulatory compliance certifications",
            "Partnering with key solar farms",
            "Phase 1 pilot setup"
        ]
    },
    {
        "phase": "Deployment",
        "timeline": "Q1 2027 - Q2 2027",
        "title": "Initial Pilot Deployment",
        "items": [
            "First field operations",
            "Real-world data collection",
            "Performance benchmarking"
        ]
    },
    {
        "phase": "Expansion",
        "timeline": "Q1 2028+",
        "title": "Global Expansion",
        "items": [
            "Commercial partnerships",
            "Global market entry",
            "Fleet scaling"
        ]
    }
]

# Routes
@api_router.get("/")
async def root():
    return {"message": "Chakrakh Technologies API"}

@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact(submission: ContactSubmission):
    doc = submission.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.contacts.insert_one(doc)
    return submission

@api_router.get("/team", response_model=List[TeamMember])
async def get_team():
    return TEAM_DATA

@api_router.get("/roadmap", response_model=List[RoadmapItem])
async def get_roadmap():
    return ROADMAP_DATA

# Include the router
app.include_router(api_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
