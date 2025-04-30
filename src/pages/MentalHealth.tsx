
import { Helmet } from "react-helmet";
import ChatBot from "@/components/mental-health/ChatBot";

const MentalHealth = () => {
  return (
    <div className="container mx-auto px-4 py-20 md:py-24">
      <Helmet>
        <title>Mental Health Assistant | Urban Health Portal</title>
        <meta name="description" content="AI-powered mental health support and resources for Mumbai residents." />
      </Helmet>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mental Health Assistant</h1>
        <p className="text-gray-500 dark:text-gray-400">Get AI-powered mental health support and resources</p>
      </div>
      
      <ChatBot />
    </div>
  );
};

export default MentalHealth;
