import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Droplets, Cpu, Zap, Activity, ShieldCheck, TrendingUp, 
  BookOpen, Wind, Bot, Gamepad2, Languages, GraduationCap 
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Icon mapping helper
const IconMap = {
  Droplets: <Droplets className="h-6 w-6 text-blue-500" />,
  Cpu: <Cpu className="h-6 w-6 text-purple-500" />,
  Zap: <Zap className="h-6 w-6 text-yellow-500" />,
  Activity: <Activity className="h-6 w-6 text-red-500" />,
  ShieldCheck: <ShieldCheck className="h-6 w-6 text-green-500" />,
  TrendingUp: <TrendingUp className="h-6 w-6 text-indigo-500" />,
  BookOpen: <BookOpen className="h-6 w-6 text-blue-500" />,
  Wind: <Wind className="h-6 w-6 text-cyan-500" />,
  Bot: <Bot className="h-6 w-6 text-purple-500" />,
  Gamepad2: <Gamepad2 className="h-6 w-6 text-orange-500" />,
  Languages: <Languages className="h-6 w-6 text-green-500" />,
  GraduationCap: <GraduationCap className="h-6 w-6 text-yellow-600" />
};

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="py-20 text-center">Loading Products...</div>;
  }

  return (
    <div id="product" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-16">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Our Innovation</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Products & Solutions
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Breaking barriers with technology in solar maintenance and education.
          </p>
        </div>

        <div className="space-y-32">
          {products.map((product, pIndex) => (
            <div key={pIndex} className="relative">
              {/* Product Header */}
              <div className="flex flex-col md:flex-row gap-10 items-center mb-12">
                <div className={`w-full md:w-1/2 ${pIndex % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="rounded-xl shadow-2xl w-full h-80 object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-lg text-blue-600 font-medium mb-4">{product.tagline}</p>
                  <p className="text-gray-500 text-lg leading-relaxed">{product.description}</p>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {product.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex flex-col bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white shadow-sm mb-4">
                      {IconMap[feature.icon_name] || <Zap className="h-6 w-6 text-gray-400" />}
                    </div>
                    <h4 className="text-lg font-medium text-gray-900">{feature.title}</h4>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Suryagatra Specific Table */}
              {product.id === 'suryagatra' && (
                <div className="mt-10 overflow-hidden bg-white shadow sm:rounded-lg border border-gray-200">
                   <div className="px-4 py-5 sm:px-6 bg-gray-50">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Why Choose Suryagatra?</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
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
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
