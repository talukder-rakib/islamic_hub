import React from 'react';
import SectionHeader from '../components/common/SectionHeader';
import { Mail, Phone, MessageCircle, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <SectionHeader 
        title="যোগাযোগ করুন" 
        subtitle="আমাদের সাথে যোগাযোগ করুন যেকোনো প্রশ্ন, মতামত বা পরামর্শের জন্য"
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="card p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-500 mb-4">
              <Mail size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              ইমেইল
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              info@islamichub.com
            </p>
          </div>
          
          <div className="card p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-500 mb-4">
              <Phone size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              ফোন
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              +৮৮০ ১৭১২ ৩৪৫৬৭৮
            </p>
          </div>
          
          <div className="card p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-500 mb-4">
              <MessageCircle size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              সোশ্যাল মিডিয়া
            </h3>
            <div className="flex space-x-3">
              <a href="#" className="text-primary-500 hover:text-primary-600">
                ফেসবুক
              </a>
              <a href="#" className="text-primary-500 hover:text-primary-600">
                টুইটার
              </a>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">
            যোগাযোগ ফর্ম
          </h3>
          
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  নাম
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="input"
                  placeholder="আপনার নাম"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ইমেইল
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="input"
                  placeholder="আপনার ইমেইল"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                বিষয়
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="input"
                placeholder="আপনার মেসেজের বিষয়"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                মেসেজ
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="input"
                placeholder="আপনার মেসেজ লিখুন"
              ></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary flex items-center">
              <Send size={18} className="mr-2" />
              <span>পাঠিয়ে দিন</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;