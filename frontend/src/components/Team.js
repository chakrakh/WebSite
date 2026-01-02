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
    return <div className="py-20 text-center">Loading Team...</div>;
  }

  return (
    <div id="team" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Meet Our Visionaries</h2>
          <p className="mt-4 text-xl text-gray-500">The minds behind the revolution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-64 overflow-hidden">
                <img 
                  className="w-full h-full object-cover object-center" 
                  src={member.image_url} 
                  alt={member.name} 
                />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold">{member.role}</div>
                <h3 className="block mt-1 text-lg leading-tight font-bold text-black">{member.name}</h3>
                <ul className="mt-4 text-gray-500 list-disc list-inside space-y-2">
                  {member.bio.map((item, i) => (
                    <li key={i} className="text-sm">{item}</li>
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
