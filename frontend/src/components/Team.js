import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/team`);
        setTeam(response.data);
      } catch (error) {
        console.error('Error fetching team data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return <div className="py-20 text-center text-primary font-mono animate-pulse">Initializing Team Protocol...</div>;
  }

  return (
    <div id="team" className="py-24 bg-[#050508] relative">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-extrabold text-white sm:text-5xl drop-shadow-lg">
            <span className="border-b-4 border-accent pb-2">Meet Our Visionaries</span>
          </h2>
          <p className="mt-8 text-xl text-gray-400 font-mono">The minds behind the revolution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <div key={index} className="group relative bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500">
              {/* Glow effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-0 group-hover:opacity-20 transition duration-500 blur-lg"></div>
              
              <div className="relative h-80 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60"></div>
                <img 
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0" 
                  src={member.image_url} 
                  alt={member.name} 
                />
              </div>
              
              <div className="relative p-8 z-20 -mt-12">
                <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-black uppercase bg-primary rounded-full shadow-[0_0_10px_rgba(0,240,255,0.6)]">
                    {member.role}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{member.name}</h3>
                <ul className="text-gray-400 space-y-2 text-sm">
                  {member.bio.map((item, i) => (
                    <li key={i} className="flex items-start">
                        <span className="mr-2 text-accent mt-1">▹</span>
                        {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
