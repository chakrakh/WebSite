import React from 'react';
import { Target, Lightbulb, Heart, Rocket, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import FloatingDrone from './FloatingDrone';

const About = () => {
  const cards = [
    {
      icon: <Target size={32} />,
      title: "Our Mission",
      subtitle: "Purpose-Driven Innovation",
      description: "\"Technology Serving Humanity, Not Just Profits.\" We engineer transformative solutions addressing critical global challenges—from water scarcity to sustainable energy—creating measurable impact for communities worldwide.",
    },
    {
      icon: <Lightbulb size={32} />,
      title: "Our Vision",
      subtitle: "Pioneering Tomorrow",
      description: "To revolutionize India's aerospace ecosystem and establish a lasting legacy of innovation. We're architecting the future of autonomous flight technology, making it accessible and beneficial for generations to come.",
    },
    {
      icon: <Heart size={32} />,
      title: "Our Values",
      subtitle: "Uncompromising Principles",
      description: "Profit will never supersede our principles. We stand firmly on the pillars of Integrity, Sustainability, and Human-Centric Innovation—guiding every decision, every design, and every deployment.",
    }
  ];

  return (
    <div id="about" className="py-24 bg-secondary/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-foreground sm:text-4xl"
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
              className="bg-card p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-primary/10 text-primary mb-6 mx-auto">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground text-center mb-3">{card.title}</h3>
              <p className="text-muted-foreground text-center leading-relaxed">
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
