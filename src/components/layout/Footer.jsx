import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass-card border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              {/* <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                <Zap className="h-6 w-6 text-white" />
              </div> */}
              <span className="text-xl font-bold gradient-text">SyncUp</span>
            </div>
            <p className="text-gray-400 max-w-md mb-6">
              Find your perfect hackathon team and get AI-powered coaching to turn your ideas into winning projects.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <span className="text-white font-semibold mb-4 block">Quick Links</span>
            <div className="space-y-3">
              <Link to="/explorer" className="block text-gray-400 hover:text-white transition-colors">
                Explore Hackathons
              </Link>
              <Link to="/matchmaking" className="block text-gray-400 hover:text-white transition-colors">
                Find Teammates
              </Link>
              <Link to="/ai-coach" className="block text-gray-400 hover:text-white transition-colors">
                AI Coach
              </Link>
              <Link to="/profile" className="block text-gray-400 hover:text-white transition-colors">
                Profile
              </Link>
            </div>
          </div>

          {/* Support
          <div>
            <span className="text-white font-semibold mb-4 block">Support</span>
            <div className="space-y-3">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Help Center
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Community
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Contact Us
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </div> */}
        </div>

        {/* <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 SyncUp. All rights reserved. Built with ❤️ for the hackathon community.
          </p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;