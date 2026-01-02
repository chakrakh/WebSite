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
    return <div className="py-20 text-center text-primary">Loading Team...</div>;
  }

  return (
    <div id="team" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Our Visionaries
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">The minds behind the revolution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="group relative bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="h-72 overflow-hidden bg-muted">
                <img 
                  className="w-full h-full object-cover object-top transform transition-transform duration-500 group-hover:scale-105" 
                  src={member.image_url} 
                  alt={member.name} 
                />
              </div>
              
              <div className="p-6">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground mb-4">
                    {member.role}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{member.name}</h3>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  {member.bio.map((item, i) => (
                    <li key={i} className="flex items-start">
                        <span className="mr-2 text-primary mt-1">•</span>
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
