
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Activity, Brain, Shield } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Integrated Urban Health Resilience
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Creating a <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">healthier</span> future for Mumbai
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-lg">
              Our platform addresses urban health challenges through real-time monitoring, AI-powered guidance, and community engagement.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white shadow-md hover:shadow-lg transition-all"
                asChild
              >
                <Link to="/mental-health">
                  Talk to AI Assistant <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary text-primary hover:bg-primary/5"
                asChild
              >
                <Link to="/dengue-map">
                  Explore Dengue Map
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin size={16} />
                </div>
                <span className="text-sm font-medium">Real-time mapping</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Brain size={16} />
                </div>
                <span className="text-sm font-medium">AI assistance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-health-teal/10 flex items-center justify-center text-health-teal">
                  <Shield size={16} />
                </div>
                <span className="text-sm font-medium">Health protection</span>
              </div>
            </div>
          </div>
          
          <div className={`relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            <div className="relative aspect-video md:aspect-square w-full max-w-md mx-auto">
              {/* Main feature phone mockup */}
              <div className="absolute inset-0 glass-panel rounded-2xl overflow-hidden animate-float shadow-glass-lg border border-white/30 backdrop-blur-md">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-60" />
                <div className="absolute inset-0 flex flex-col">
                  <div className="h-10 bg-black/10 flex items-center justify-between px-4">
                    <div className="w-16 h-2 bg-white/30 rounded-full" />
                    <div className="w-4 h-4 rounded-full bg-white/30" />
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center p-4 text-white gap-3">
                    <Activity size={48} className="mb-2 opacity-90" />
                    <h3 className="text-lg font-semibold text-shadow-sm">Urban Health Dashboard</h3>
                    <p className="text-xs text-center opacity-90 max-w-[200px]">
                      Real-time health monitoring and personalized insights
                    </p>
                    <div className="w-20 h-1 bg-white/30 rounded-full my-2" />
                    <div className="grid grid-cols-2 gap-2 w-full max-w-[200px]">
                      <div className="bg-white/10 rounded-lg p-2 text-center">
                        <div className="text-xs opacity-70">AQI Level</div>
                        <div className="text-sm font-bold">86</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-2 text-center">
                        <div className="text-xs opacity-70">Health Score</div>
                        <div className="text-sm font-bold">92%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Secondary features */}
              <div className="absolute -bottom-8 -left-8 h-48 w-48 glass-panel-sm rounded-2xl overflow-hidden animate-float shadow-glass" style={{ animationDelay: '1s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-health-teal/20 to-health-blue/20 opacity-60" />
                <div className="absolute inset-0 flex flex-col">
                  <div className="h-6 bg-black/10" />
                  <div className="flex-1 flex flex-col items-center justify-center p-2">
                    <MapPin size={24} className="mb-1 text-white opacity-90" />
                    <h4 className="text-sm font-medium text-white text-shadow-sm">Dengue Map</h4>
                    <p className="text-[10px] text-center text-white/90 mt-1">
                      Track outbreaks in real-time
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 h-44 w-44 glass-panel-sm rounded-2xl overflow-hidden animate-float shadow-glass" style={{ animationDelay: '1.5s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 opacity-60" />
                <div className="absolute inset-0 flex flex-col">
                  <div className="h-6 bg-black/10" />
                  <div className="flex-1 flex flex-col items-center justify-center p-2">
                    <Brain size={24} className="mb-1 text-white opacity-90" />
                    <h4 className="text-sm font-medium text-white text-shadow-sm">Mental Health</h4>
                    <p className="text-[10px] text-center text-white/90 mt-1">
                      AI support & guidance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-8 h-64 w-64 rounded-full bg-primary opacity-5 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-8 h-64 w-64 rounded-full bg-accent opacity-5 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default Hero;
