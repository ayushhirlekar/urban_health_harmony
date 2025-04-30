
import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { 
  Map, Brain, Users, BarChart, 
  AlertTriangle, Activity, Heart, Shield 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeatureCard = ({ 
  icon, title, description, delay = 0, color = "primary", link 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <div 
      ref={ref}
      className={`glass-panel p-6 transition-all duration-700 ease-out ${
        inView 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`h-12 w-12 rounded-lg bg-${color}/10 flex items-center justify-center text-${color} mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
        {description}
      </p>
      {link && (
        <Link 
          to={link}
          className={`inline-flex items-center text-sm font-medium text-${color} hover:underline`}
        >
          Learn more
          <svg
            className="ml-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      )}
    </div>
  );
};

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const features = [
    {
      icon: <Map size={24} />,
      title: "Dengue Heatmap",
      description: "Interactive visualization of dengue-affected areas with real-time data and infection density tracking.",
      delay: 100,
      color: "health-blue",
      link: "/dengue-map"
    },
    {
      icon: <Brain size={24} />,
      title: "Mental Health Assistant",
      description: "AI-powered voice assistant analyzing tone and emotions to provide personalized mental health guidance.",
      delay: 200,
      color: "accent",
      link: "/mental-health"
    },
    {
      icon: <Users size={24} />,
      title: "Community Forum",
      description: "Connect with others, share experiences, and participate in discussions about urban health challenges.",
      delay: 300,
      color: "health-teal",
      link: "/community"
    },
    {
      icon: <BarChart size={24} />,
      title: "Health Dashboard",
      description: "Personalized health reports and insights based on your behavior and environmental conditions.",
      delay: 400,
      color: "health-indigo",
      link: "/dashboard"
    }
  ];
  
  return (
    <section className="py-20 relative">
      <div className="container px-4 md:px-6">
        <div 
          ref={ref}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-500 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Integrated Solutions
            </span> for Urban Health
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Our platform combines real-time monitoring, AI-powered guidance, and community insights to address the unique health challenges of urban environments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
        
        <div className="mt-20 glass-panel-lg p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Why Urban Health Matters in Mumbai
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Mumbai faces unique challenges due to high population density, pollution levels, and disease outbreaks. Our platform provides the tools to navigate these challenges and improve urban resilience.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-3 h-8 w-8 rounded-full bg-health-teal/10 flex items-center justify-center text-health-teal shrink-0">
                    <AlertTriangle size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium">Early Detection</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Our real-time monitoring systems help identify disease outbreaks before they spread widely.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 h-8 w-8 rounded-full bg-health-blue/10 flex items-center justify-center text-health-blue shrink-0">
                    <Activity size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium">Personalized Health Insights</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Get recommendations based on your environment, behavior, and health profile.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Heart size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium">Mental Wellbeing</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Access AI-guided support for stress, anxiety, and other mental health challenges.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 h-8 w-8 rounded-full bg-health-purple/10 flex items-center justify-center text-health-purple shrink-0">
                    <Shield size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium">Community Resilience</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Build collective knowledge and response capabilities through community engagement.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white shadow-md hover:shadow-lg transition-all"
                  asChild
                >
                  <Link to="/community">Join Our Community</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square max-w-lg mx-auto rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 animate-pulse-slow rounded-2xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 aspect-square bg-white/5 backdrop-blur-sm rounded-full border border-white/10 flex items-center justify-center">
                    <div className="w-2/3 aspect-square bg-white/10 backdrop-blur-sm rounded-full border border-white/10 flex items-center justify-center">
                      <div className="w-1/2 aspect-square bg-white/15 backdrop-blur-sm rounded-full border border-white/10 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
                          <Shield size={32} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Orbiting elements */}
                <div className="absolute top-1/4 right-1/4 bg-white/20 backdrop-blur-sm p-2 rounded-lg animate-float shadow-glass-sm">
                  <Activity size={24} className="text-primary" />
                </div>
                <div className="absolute bottom-1/3 left-1/4 bg-white/20 backdrop-blur-sm p-2 rounded-lg animate-float shadow-glass-sm" style={{ animationDelay: '1s' }}>
                  <Brain size={24} className="text-accent" />
                </div>
                <div className="absolute top-1/2 right-1/6 bg-white/20 backdrop-blur-sm p-2 rounded-lg animate-float shadow-glass-sm" style={{ animationDelay: '1.5s' }}>
                  <Map size={24} className="text-health-teal" />
                </div>
                <div className="absolute bottom-1/4 right-1/3 bg-white/20 backdrop-blur-sm p-2 rounded-lg animate-float shadow-glass-sm" style={{ animationDelay: '2s' }}>
                  <Users size={24} className="text-health-indigo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
