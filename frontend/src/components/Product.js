import React from 'react';
import { Droplets, Cpu, Zap, Activity, ShieldCheck, TrendingUp } from 'lucide-react';

const Product = () => {
  const features = [
    {
      icon: <Droplets className="h-6 w-6 text-blue-500" />,
      title: "Critical Water Conservation",
      description: "Saves millions of liters annually using targeted dry and wet spotless cleaning. Uses 5-30mL per panel vs 15L manually."
    },
    {
      icon: <Cpu className="h-6 w-6 text-purple-500" />,
      title: "AI-Driven Precision",
      description: "Proprietary AbhiRaman path optimization and advanced AI ensures optimal cleaning paths and efficiency."
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "Autonomous Control",
      description: "Fully autonomous operations driven by real-time data analytics, requiring minimal manual intervention."
    },
    {
      icon: <Activity className="h-6 w-6 text-red-500" />,
      title: "Proactive Inspection",
      description: "Comprehensive visual and thermal inspections enable predictive maintenance and early fault detection."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-green-500" />,
      title: "Proprietary Tech",
      description: "Fully proprietary technology stack ensures seamless integration, complete control, and data security."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-indigo-500" />,
      title: "High ROI",
      description: "35% higher ROI than rover bots and 4% energy yield boost. 99% labor reduction."
    }
  ];

  return (
    <div id="product" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-16">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Introducing</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Suryagatra: The Future of Solar Maintenance
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            A UAV-powered solution designed for maximized efficiency, sustainable operations, and unmatched precision.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white shadow-sm mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Suryagatra?</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manual Cleaning</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Robotic Cleaners</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50">Suryagatra (UAV)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Water Usage / Panel</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">~15 Liters</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">100-200 mL</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600 bg-blue-50">5-30 mL</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cleaning Cycle (100MW)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Weekly</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3-10 Days</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600 bg-blue-50">24 Hours</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cost per Panel</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">High Labor Cost</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹8 - ₹10</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600 bg-blue-50">₹6</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Water Savings</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Moderate</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600 bg-blue-50">99.9%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
