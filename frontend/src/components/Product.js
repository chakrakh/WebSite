import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Droplets, Cpu, Zap, Activity, ShieldCheck, TrendingUp, 
  BookOpen, Wind, Bot, Gamepad2, Languages, GraduationCap,
  Rocket
} from 'lucide-react';
import { motion } from 'framer-motion';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const IconMap = {
  Droplets: <Droplets className="h-6 w-6 text-primary" />,
  Cpu: <Cpu className="h-6 w-6 text-primary" />,
  Zap: <Zap className="h-6 w-6 text-primary" />,
  Activity: <Activity className="h-6 w-6 text-primary" />,
  ShieldCheck: <ShieldCheck className="h-6 w-6 text-primary" />,
  TrendingUp: <TrendingUp className="h-6 w-6 text-primary" />,
  BookOpen: <BookOpen className="h-6 w-6 text-primary" />,
  Wind: <Wind className="h-6 w-6 text-primary" />,
  Bot: <Bot className="h-6 w-6 text-primary" />,
  Gamepad2: <Gamepad2 className="h-6 w-6 text-primary" />,
  Languages: <Languages className="h-6 w-6 text-primary" />,
  GraduationCap: <GraduationCap className="h-6 w-6 text-primary" />
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
    return <div className="py-20 text-center text-primary animate-pulse">Loading Systems...</div>;
  }

  return (
    <div id="projects" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4"
          >
            <Rocket className="w-3 h-3 mr-2" /> 
            Innovation Pipeline
          </motion.div>
          
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-3xl leading-8 font-bold text-foreground sm:text-4xl"
          >
            Autonomous Solutions
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto"
          >
            Pioneering the next generation of industrial and educational aerospace technology.
          </motion.p>
        </div>

        <div className="space-y-32">
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
              <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
                <div className={`w-full md:w-1/2 ${pIndex % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-muted">
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                      {/* Status Badge - Hide 'In Development' for Haanth */}
                      {!(product.id === 'haanth' && product.status === 'coming_soon') && (
                        <div className="bg-background/90 backdrop-blur text-foreground text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider shadow-sm">
                          {product.status === 'coming_soon' ? 'In Development' : 'Live'}
                        </div>
                      )}
                      
                      {/* Launching Soon Badge - Hide for Suryagatra */}
                      {product.status === 'coming_soon' && product.id !== 'suryagatra' && (
                         <div className="bg-primary/90 backdrop-blur text-primary-foreground text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider shadow-sm animate-pulse">
                           Launching Soon
                         </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl font-bold text-foreground mb-2">{product.name}</h3>
                  <p className="text-lg text-primary font-medium mb-6">{product.tagline}</p>
                  <p className="text-muted-foreground text-lg leading-relaxed">{product.description}</p>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {product.features.map((feature, fIndex) => (
                  <motion.div 
                    key={fIndex} 
                    whileHover={{ y: -5 }}
                    className="flex flex-col bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary text-primary mb-4">
                      {IconMap[feature.icon_name] || <Zap className="h-5 w-5" />}
                    </div>
                    <h4 className="text-base font-bold text-foreground">{feature.title}</h4>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Comparison Tables */}
              {(product.comparison_table || (product.id === 'suryagatra')) && (
                <div className="mt-12 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                   <div className="px-6 py-4 bg-muted/50 border-b border-border">
                    <h3 className={`text-base font-semibold ${product.id === 'haanth' ? 'text-foreground' : 'text-foreground'}`}>
                        {product.id === 'suryagatra' && !product.comparison_table ? "Performance Targets" : `Why ${product.name} Stands Out`}
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-border">
                      <thead className="bg-muted/30">
                        <tr>
                            {product.comparison_table ? (
                                product.comparison_headers.map((header, hIndex) => (
                                    <th key={hIndex} className={`px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-bold uppercase tracking-wider ${hIndex === 2 ? 'text-emerald-700 dark:text-emerald-400 drop-shadow-sm' : 'text-muted-foreground'}`}>
                                    {header}
                                    </th>
                                ))
                            ) : (
                                <>
                                <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Feature</th>
                                <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Manual</th>
                                <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Robotic</th>
                                <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-bold text-green-500 uppercase tracking-wider">Suryagatra</th>
                                </>
                            )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-card">
                        {product.comparison_table ? (
                            product.comparison_table.map((row, rIndex) => (
                            <tr key={rIndex} className="hover:bg-muted/30 transition-colors">
                                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-foreground">{row.category}</td>
                                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-muted-foreground">{row.competitor}</td>
                                <td className={`px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-bold ${product.id === 'haanth' ? 'text-emerald-700 dark:text-emerald-400 drop-shadow-sm' : 'text-primary'}`}>{row.us}</td>
                            </tr>
                            ))
                        ) : (
                            <>
                             <tr className="hover:bg-muted/30 transition-colors">
                                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-foreground">Water Usage / Panel</td>
                                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-muted-foreground">~15 Liters</td>
                                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-muted-foreground">100-200 mL</td>
                                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-bold text-green-500">5-30 mL</td>
                            </tr>
                            <tr className="hover:bg-muted/30 transition-colors">
                                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-foreground">Cleaning Cycle</td>
                                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-muted-foreground">Weekly</td>
                                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-muted-foreground">3-10 Days</td>
                                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-bold text-green-500">24 Hours</td>
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
