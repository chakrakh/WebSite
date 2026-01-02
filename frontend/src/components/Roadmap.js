import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Roadmap = () => {
  const [roadmap, setRoadmap] = useState([]);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/roadmap`);
        setRoadmap(response.data);
      } catch (error) {
        console.error('Error fetching roadmap:', error);
      }
    };

    fetchRoadmap();
  }, []);

  return (
    <div id="roadmap" className="py-20 bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Future Roadmap</h2>
          <p className="mt-4 text-xl text-blue-200">Our journey towards global impact.</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-700"></div>

          <div className="space-y-12">
            {roadmap.map((item, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-5/12"></div>
                
                <div className="z-10 flex items-center justify-center w-8 h-8 bg-green-500 rounded-full ring-4 ring-blue-900 shrink-0">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                
                <div className="w-full md:w-5/12 mt-4 md:mt-0 p-6 bg-blue-800 rounded-lg shadow-xl hover:bg-blue-700 transition-colors">
                  <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-green-900 uppercase bg-green-400 rounded-full">
                    {item.phase}
                  </span>
                  <span className="block text-sm text-blue-300 mb-2">{item.timeline}</span>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {item.items.map((subitem, i) => (
                      <li key={i}>{subitem}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
