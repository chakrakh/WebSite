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
  const [status, setStatus] = useState('idle');

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
    <div id="contact" className="py-24 bg-background border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Get In Touch</h2>
          <p className="mt-4 text-lg text-muted-foreground">Have questions about our technology or vision?</p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg bg-background border-input text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4 transition-all"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg bg-background border-input text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground">Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg bg-background border-input text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4 transition-all"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground">Message</label>
              <textarea
                name="message"
                id="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg bg-background border-input text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4 transition-all"
                placeholder="Your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-primary-foreground ${
                status === 'success' 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : status === 'error'
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-primary hover:bg-primary/90'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 disabled:opacity-50`}
            >
              {status === 'idle' && (
                <>
                  <Send className="mr-2 h-5 w-5" /> Send Message
                </>
              )}
              {status === 'submitting' && 'Sending...'}
              {status === 'success' && (
                <div className="flex items-center text-green-100">
                  <CheckCircle className="mr-2 h-5 w-5" /> 
                  <span>Your message has been sent. We'll get back to you ASAP!</span>
                </div>
              )}
              {status === 'error' && (
                <>
                  <AlertCircle className="mr-2 h-5 w-5" /> Error Sending
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
