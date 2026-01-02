from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Any, Dict
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

class ProductFeature(BaseModel):
    title: str
    description: str
    icon_name: str

class ComparisonRow(BaseModel):
    category: str
    competitor: str
    us: str

class Product(BaseModel):
    id: str
    name: str
    tagline: str
    description: str
    features: List[ProductFeature]
    image_url: Optional[str] = None
    type: str # 'hardware', 'software', 'game'
    status: str # 'live', 'coming_soon'
    comparison_table: Optional[List[ComparisonRow]] = None
    comparison_headers: Optional[List[str]] = None

# Data
TEAM_DATA = [
    {
        "name": "Hridayesh Behl (Heart)",
        "role": "Visionary",
        "bio": [
            "Currently pursuing a Master's in Drone & Anti-Drone Technologies at IIT Jodhpur.",
            "Visionary student entrepreneur and passionate researcher.",
            "Mechatronics Engineer and certified Data Engineer.",
            "Skill India 2024 medalist in renewable energy.",
            "Expertise in Quantum Technologies, IoT, and AI/ML."
        ],
        "image_url": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
    },
    {
        "name": "Prof N Satyanarayana (Wisdom)",
        "role": "Mentor & Scientific Advisor",
        "bio": [
            "Emirates Professor and ex HOD Physics Pondicherry University.",
            "Over 45 years of expertise in Materials Science and renewable energy.",
            "Published 150+ papers and completed 22 research projects."
        ],
        "image_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
    },
    {
        "name": "Mr Rao Ambati (Impact)",
        "role": "Strategic Advisor & Investor",
        "bio": [
            "20 years of experience in managing and delivering end-to-end projects.",
            "Specialist in Change and Release Management across global markets.",
            "Expertise in Retail, Telecom, Banking, and Energy sectors."
        ],
        "image_url": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop"
    }
]

PRODUCTS_DATA = [
    {
        "id": "suryagatra",
        "name": "Suryagatra",
        "tagline": "The Future of Solar Maintenance",
        "description": "We are building a UAV-powered solution designed for maximized efficiency, sustainable operations, and unmatched precision. Launching Soon.",
        "type": "hardware",
        "status": "coming_soon",
        "image_url": "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1000&auto=format&fit=crop",
        "features": [
            {"title": "Critical Water Conservation", "description": "Will save millions of liters annually using targeted dry and wet spotless cleaning. Targeting 5-30mL per panel.", "icon_name": "Droplets"},
            {"title": "AI-Driven Precision", "description": "Developing proprietary AbhiRaman path optimization and advanced AI for optimal cleaning paths.", "icon_name": "Cpu"},
            {"title": "Autonomous Control", "description": "Fully autonomous operations driven by real-time data analytics, requiring minimal manual intervention.", "icon_name": "Zap"},
            {"title": "Proactive Inspection", "description": "Comprehensive visual and thermal inspections will enable predictive maintenance and early fault detection.", "icon_name": "Activity"},
            {"title": "Proprietary Tech", "description": "Fully proprietary technology stack ensuring seamless integration, complete control, and data security.", "icon_name": "ShieldCheck"},
            {"title": "High ROI", "description": "Targeting 35% higher ROI than rover bots and 4% energy yield boost.", "icon_name": "TrendingUp"}
        ]
    },
    {
        "id": "haanth",
        "name": "Adventures of Haanth",
        "tagline": "Learn to Fly. Grow to Lead.",
        "description": "A unique narrative-driven flight simulator merging realistic drone physics with an immersive journey. Master piloting skills to unfold a story of evolution.",
        "type": "game",
        "status": "coming_soon",
        "image_url": "https://images.unsplash.com/photo-1662348316911-d6aef85f8560", 
        "comparison_headers": ["Category", "Typical EdTech Tools", "Adventures of Haanth"],
        "comparison_table": [
            {"category": "Framework", "competitor": "Basic Tutorials", "us": "Story-Driven Purpose"},
            {"category": "Character", "competitor": "Static NPC", "us": "Evolving Companion"},
            {"category": "Progression", "competitor": "Linear Levels", "us": "Narrative Milestones"},
            {"category": "Langauge", "competitor": "English Only", "us": "Multi-Language Support"},
            {"category": "Engagement", "competitor": "Points/Badges", "us": "Identity & Customization"},
            {"category": "Goal", "competitor": "Complete Tasks", "us": "Uncover the Journey"},
            {"category": "Appeal", "competitor": "Functional", "us": "Emotional Connection"}
        ],
        "features": [
            {"title": "Narrative-Driven", "description": "Experience a purposeful journey where every flight lesson drives the story forward.", "icon_name": "BookOpen"},
            {"title": "Realistic Physics", "description": "Master real-world piloting skills including wind compensation and flight dynamics.", "icon_name": "Wind"},
            {"title": "Holographic Mentor", "description": "Guided by Kovo, a smart assistant providing real-time feedback.", "icon_name": "Bot"},
            {"title": "Gamified Learning", "description": "Unlock customizations and upgrades as you progress through the adventure.", "icon_name": "Gamepad2"},
            {"title": "Multi-Language", "description": "Designed for accessibility with support for multiple regional languages.", "icon_name": "Languages"},
            {"title": "STEM Education", "description": "A safe, engaging environment for students to master drone technology.", "icon_name": "GraduationCap"}
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

@api_router.get("/products", response_model=List[Product])
async def get_products():
    return PRODUCTS_DATA

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
