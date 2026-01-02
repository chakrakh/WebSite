import React from 'react';
import { Target, Lightbulb, Heart } from 'lucide-react';

const About = () => {
  return (
    <div id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            We're Not Just a Company. <span className="text-blue-600">We're a Mission.</span>
          </h2>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            At Chakrakh, we believe that technology should serve humanity, not just profits. 
            We are redefining what's possible with drones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-6 mx-auto">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-4">Our Mission</h3>
            <p className="text-gray-600 text-center">
              "Technology serving humanity, not just profits." We build systems that solve real-world problems like water scarcity while boosting energy efficiency.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6 mx-auto">
              <Lightbulb size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-4">Our Vision</h3>
            <p className="text-gray-600 text-center">
              To redefine the national drone ecosystem for lasting impact. We are building the future of drone technology for people of all ages.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 text-yellow-600 mb-6 mx-auto">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-4">Our Values</h3>
            <p className="text-gray-600 text-center">
              We will never compromise our core values for profits. Integrity, sustainability, and humanity-centric innovation drive everything we do.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
