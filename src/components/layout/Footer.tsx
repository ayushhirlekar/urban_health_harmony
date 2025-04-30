
import { Link } from "react-router-dom";
import { Github, Twitter, Facebook, Instagram, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <h3 className="text-xl font-bold">
                <span className="text-primary">Urban</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Health</span>
              </h3>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              Integrated Urban Health Resilience platform addressing pollution, disease outbreaks, and mental health challenges in Mumbai.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-500 hover:text-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-slate-500 hover:text-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-slate-500 hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-slate-500 hover:text-primary transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dengue-map" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">Dengue Map</Link></li>
              <li><Link to="/mental-health" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">Mental Health Chatbot</Link></li>
              <li><Link to="/community" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">Community Forum</Link></li>
              <li><Link to="/dashboard" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">Health Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Information</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Subscribe</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">Stay updated with our latest features</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="absolute right-1 top-1 bg-primary hover:bg-primary/90 text-white rounded-md px-2 py-1 text-xs">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <hr className="my-8 border-slate-200 dark:border-slate-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © {new Date().getFullYear()} Urban Health. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-slate-500 dark:text-slate-400 text-sm flex items-center">
              Made with <Heart size={14} className="mx-1 text-accent" /> for a healthier Mumbai
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
