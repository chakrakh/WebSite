import React, { useState } from 'react';
import axios from 'axios';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await axios.post(`${BACKEND_URL}/api/contact`, formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <div id="contact" className="py-24 bg-background relative overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Get In Touch</h2>
          <p className="mt-4 text-xl text-gray-400">Have questions about our technology or vision?</p>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg bg-black/50 border-white/10 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4 transition-all focus:shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg bg-black/50 border-white/10 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4 transition-all focus:shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg bg-black/50 border-white/10 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4 transition-all focus:shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
              <textarea
                name="message"
                id="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg bg-black/50 border-white/10 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4 transition-all focus:shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                placeholder="Your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-black uppercase tracking-wider ${
                status === 'success' 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : status === 'error'
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-primary hover:bg-cyan-400'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {status === 'idle' && (
                <>
                  <Send className="mr-2 h-5 w-5" /> Send Message
                </>
              )}
              {status === 'submitting' && 'Transmitting...'}
              {status === 'success' && (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" /> Message Sent
                </>
              )}
              {status === 'error' && (
                <>
                  <AlertCircle className="mr-2 h-5 w-5" /> Error Sending
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
