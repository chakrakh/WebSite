import React from 'react';
import { Target, Lightbulb, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const cards = [
    {
      icon: <Target size={32} />,
      title: "Our Mission",
      subtitle: "Purpose-Driven Innovation",
      description: "Technology Serving Humanity, Not Just Profits. We engineer transformative solutions addressing critical global challenges from water scarcity to sustainable energy, creating measurable impact for communities worldwide.",
    },
    {
      icon: <Lightbulb size={32} />,
      title: "Our Vision",
      subtitle: "Pioneering Tomorrow",
      description: "To revolutionize India's aerospace ecosystem and establish a lasting legacy of innovation. We are architecting the future of autonomous flight technology, making it accessible and beneficial for generations to come.",
    },
    {
      icon: <Heart size={32} />,
      title: "Our Values",
      subtitle: "Uncompromising Principles",
      description: "Profit will never supersede our principles. We stand firmly on the pillars of Integrity, Sustainability, and Human-Centric Innovation, guiding every decision, every design, and every deployment.",
    }
  ];

  return (
    <div id="about" className="py-24 bg-secondary/30 dark:bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center mb-4"
          >
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">Who We Are</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
          >
            Engineering for <span className="text-primary">Impact</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            At Chakrakh, we believe technology should empower humanity and elevate communities.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-card dark:bg-slate-900/50 p-8 rounded-2xl border border-border dark:border-slate-700/50 shadow-sm hover:shadow-xl hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <motion.div 
                  className="flex items-center justify-center h-16 w-16 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary mb-6 mx-auto group-hover:bg-primary group-hover:text-white transition-all duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {card.icon}
                </motion.div>
                
                <h3 className="text-2xl font-bold text-foreground text-center mb-1">{card.title}</h3>
                <p className="text-primary text-sm font-medium text-center mb-4 uppercase tracking-wider">{card.subtitle}</p>
                <p className="text-muted-foreground dark:text-slate-400 text-center leading-relaxed">
                  {card.description}
                </p>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
