import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Droplets, Cpu, Zap, Activity, ShieldCheck, TrendingUp, 
  BookOpen, Wind, Bot, Gamepad2, Languages, GraduationCap,
  Rocket
} from 'lucide-react';
import { motion } from 'framer-motion';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Icon mapping helper - Updated with Neon Colors
const IconMap = {
  Droplets: <Droplets className="h-6 w-6 text-primary" />,
  Cpu: <Cpu className="h-6 w-6 text-secondary" />,
  Zap: <Zap className="h-6 w-6 text-yellow-400" />,
  Activity: <Activity className="h-6 w-6 text-red-400" />,
  ShieldCheck: <ShieldCheck className="h-6 w-6 text-accent" />,
  TrendingUp: <TrendingUp className="h-6 w-6 text-blue-400" />,
  BookOpen: <BookOpen className="h-6 w-6 text-primary" />,
  Wind: <Wind className="h-6 w-6 text-cyan-400" />,
  Bot: <Bot className="h-6 w-6 text-secondary" />,
  Gamepad2: <Gamepad2 className="h-6 w-6 text-orange-400" />,
  Languages: <Languages className="h-6 w-6 text-accent" />,
  GraduationCap: <GraduationCap className="h-6 w-6 text-yellow-500" />
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
    return <div className="py-20 text-center text-primary font-mono">Loading Future Projects...</div>;
  }

  return (
    <div id="projects" className="py-24 bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono mb-6"
          >
            <Rocket className="w-4 h-4 mr-2" /> 
            <span className="tracking-widest uppercase">Coming Soon</span>
          </motion.div>
          
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-4xl leading-8 font-extrabold tracking-tight text-white sm:text-5xl"
          >
            Future Innovations
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="mt-6 max-w-2xl text-xl text-gray-400 lg:mx-auto"
          >
            We are building the next generation of drone technology. Everything you see here is currently in development.
          </motion.p>
        </div>

        <div className="space-y-40">
          {products.map((product, pIndex) => (
            <motion.div 
              key={pIndex} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Product Header */}
              <div className="flex flex-col md:flex-row gap-16 items-center mb-16">
                <div className={`w-full md:w-1/2 ${pIndex % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="relative rounded-xl shadow-2xl w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-[1.01] border border-white/10 bg-gray-900"
                    />
                    <div className="absolute top-4 right-4 bg-yellow-500/90 backdrop-blur-sm text-black text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                      In Development
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-4xl font-bold text-white mb-2 font-mono">{product.name}</h3>
                  <p className="text-xl text-primary font-medium mb-6 tracking-wide">{product.tagline}</p>
                  <p className="text-gray-400 text-lg leading-relaxed">{product.description}</p>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {product.features.map((feature, fIndex) => (
                  <motion.div 
                    key={fIndex} 
                    whileHover={{ y: -5, borderColor: 'rgba(0, 240, 255, 0.5)' }}
                    className="flex flex-col bg-card/50 backdrop-blur-md rounded-lg p-6 border border-white/5 hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-white/5 border border-white/10 mb-4 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                      {IconMap[feature.icon_name] || <Zap className="h-6 w-6 text-gray-400" />}
                    </div>
                    <h4 className="text-lg font-bold text-gray-200">{feature.title}</h4>
                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Comparison Tables - Updated Dark Theme */}
              {(product.comparison_table || (product.id === 'suryagatra')) && (
                <div className="mt-12 overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-[#0d0d12]">
                   <div className="px-6 py-5 bg-white/5 border-b border-white/10">
                    <h3 className="text-lg leading-6 font-medium text-white">
                        {product.id === 'suryagatra' && !product.comparison_table ? "Projected Performance vs Traditional Methods" : `Why ${product.name} Stands Out`}
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/5">
                      <thead className="bg-black/20">
                        <tr>
                            {product.comparison_table ? (
                                product.comparison_headers.map((header, hIndex) => (
                                    <th key={hIndex} className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${hIndex === 2 ? 'text-primary' : 'text-gray-400'}`}>
                                    {header}
                                    </th>
                                ))
                            ) : (
                                <>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manual Cleaning</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Robotic Cleaners</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-primary uppercase tracking-wider">Suryagatra (Target)</th>
                                </>
                            )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 bg-transparent">
                        {product.comparison_table ? (
                            product.comparison_table.map((row, rIndex) => (
                            <tr key={rIndex} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{row.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.competitor}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary">{row.us}</td>
                            </tr>
                            ))
                        ) : (
                            <>
                             <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">Water Usage / Panel</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">~15 Liters</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">100-200 mL</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary">5-30 mL</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">Cleaning Cycle (100MW)</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Weekly</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3-10 Days</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary">24 Hours</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">Cost per Panel</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">High Labor Cost</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹8 - ₹10</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary">₹6</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">Water Savings</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0%</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Moderate</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary">99.9%</td>
                            </tr>
                            </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
