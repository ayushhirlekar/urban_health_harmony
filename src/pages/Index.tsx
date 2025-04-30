
import { Link } from "react-router-dom";
import Hero from "@/components/home/Hero";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Mumbai Urban Health Portal</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive tools designed to address urban health challenges in Mumbai
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Dengue Map Card */}
          <Link to="/dengue-map" className="block group">
            <div className="glass-panel-sm hover:shadow-lg transition-all h-full overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-health-teal/20 to-health-blue/20 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/a6900d08-013e-4895-9430-2da7e9691dd0.png" 
                    alt="Dengue Heatmap" 
                    className="w-full h-full object-cover object-center opacity-90"
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-health-teal transition-colors">Dengue Outbreak Map</h3>
                <p className="text-gray-600 mb-4">
                  Real-time visualization of dengue-affected areas in Mumbai with comprehensive risk analysis.
                </p>
                <div className="flex items-center text-health-teal font-medium">
                  <span>Explore map</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Mental Health Chat Card */}
          <Link to="/mental-health" className="block group">
            <div className="glass-panel-sm hover:shadow-lg transition-all h-full">
              <div className="h-48 bg-gradient-to-r from-accent/20 to-primary/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-accent/60" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">Mental Health Assistant</h3>
                <p className="text-gray-600 mb-4">
                  AI-powered chatbot providing mental health support, coping strategies, and guidance.
                </p>
                <div className="flex items-center text-accent font-medium">
                  <span>Talk now</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Community Forum Card */}
          <Link to="/community" className="block group">
            <div className="glass-panel-sm hover:shadow-lg transition-all h-full">
              <div className="h-48 bg-gradient-to-r from-health-blue/20 to-health-purple/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-health-blue/60" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-health-blue transition-colors">Community Forum</h3>
                <p className="text-gray-600 mb-4">
                  Connect with others, share experiences, and participate in community-driven health initiatives.
                </p>
                <div className="flex items-center text-health-blue font-medium">
                  <span>Join discussion</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
