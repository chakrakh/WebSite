import React from 'react';
import { Target, Lightbulb, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const cards = [
    {
      icon: <Target size={32} />,
      title: "Our Mission",
      description: "\"Technology serving humanity, not just profits.\" We build systems that solve real-world problems like water scarcity while boosting energy efficiency.",
      color: "text-primary",
      borderColor: "border-primary/30"
    },
    {
      icon: <Lightbulb size={32} />,
      title: "Our Vision",
      description: "To redefine the national drone ecosystem for lasting impact. We are building the future of drone technology for people of all ages.",
      color: "text-accent",
      borderColor: "border-accent/30"
    },
    {
      icon: <Heart size={32} />,
      title: "Our Values",
      description: "We will never compromise our core values for profits. Integrity, sustainability, and humanity-centric innovation drive everything we do.",
      color: "text-secondary",
      borderColor: "border-secondary/30"
    }
  ];

  return (
    <div id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Background glow elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold text-white sm:text-5xl tracking-tight"
          >
            Not Just a Company. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">A Mission.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto"
          >
            At Chakrakh, we believe that technology should serve humanity.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-card backdrop-blur-lg p-8 rounded-xl border ${card.borderColor} shadow-lg hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300 group`}
            >
              <div className={`flex items-center justify-center h-16 w-16 rounded-full bg-white/5 ${card.color} mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-4 font-mono">{card.title}</h3>
              <p className="text-gray-400 text-center leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
