
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Mic, Send, MessageSquare, PlayCircle, PauseCircle, Brain, RefreshCcw, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type MessageType = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  emotion?: "happy" | "sad" | "anxious" | "stressed" | "neutral";
};

type Suggestion = {
  id: string;
  text: string;
};

const EmotionBadge = ({ emotion }: { emotion?: MessageType["emotion"] }) => {
  if (!emotion || emotion === "neutral") return null;
  
  const colors = {
    happy: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    sad: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    anxious: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    stressed: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };
  
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${colors[emotion]}`}>
      {emotion}
    </span>
  );
};

const ChatBot = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "1",
      content: "Hello! I'm your mental health assistant. How are you feeling today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const suggestions: Suggestion[] = [
    { id: "s1", text: "I'm feeling anxious today" },
    { id: "s2", text: "Can you help me with stress management?" },
    { id: "s3", text: "I need some relaxation techniques" },
    { id: "s4", text: "Tell me about breathing exercises" },
  ];
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // Analyze emotion based on keywords (in a real app, this would use NLP/AI)
    let detectedEmotion: MessageType["emotion"] = "neutral";
    const lowercaseMsg = inputValue.toLowerCase();
    
    if (lowercaseMsg.includes("happy") || lowercaseMsg.includes("good") || lowercaseMsg.includes("great")) {
      detectedEmotion = "happy";
    } else if (lowercaseMsg.includes("sad") || lowercaseMsg.includes("depressed") || lowercaseMsg.includes("unhappy")) {
      detectedEmotion = "sad";
    } else if (lowercaseMsg.includes("anxious") || lowercaseMsg.includes("nervous") || lowercaseMsg.includes("worry")) {
      detectedEmotion = "anxious";
    } else if (lowercaseMsg.includes("stress") || lowercaseMsg.includes("overwhelmed") || lowercaseMsg.includes("pressure")) {
      detectedEmotion = "stressed";
    }
    
    // Simulate bot response (would be replaced with actual AI API call)
    setTimeout(() => {
      let botResponse = "";
      
      switch (detectedEmotion) {
        case "happy":
          botResponse = "I'm glad you're feeling positive! It's great to maintain this energy. Would you like some tips to continue nurturing your mental wellbeing?";
          break;
        case "sad":
          botResponse = "I'm sorry to hear you're feeling down. Remember that it's okay to feel this way sometimes. Would you like to try a quick mood-lifting exercise, or perhaps talk about what's bothering you?";
          break;
        case "anxious":
          botResponse = "I notice you might be feeling anxious. Let's try a quick breathing exercise: breathe in for 4 counts, hold for 2, and exhale for 6. Would you like to try more relaxation techniques?";
          break;
        case "stressed":
          botResponse = "It sounds like you're under stress. Remember to take breaks and be kind to yourself. Would you like to explore some stress management techniques or perhaps try a guided meditation?";
          break;
        default:
          botResponse = "Thank you for sharing. How else can I support your mental wellbeing today? I can offer relaxation techniques, coping strategies, or simply be here to listen.";
      }
      
      const botMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
        emotion: detectedEmotion,
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    // Auto-send after a brief delay
    setTimeout(() => {
      handleSendMessage();
    }, 300);
  };
  
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "Voice recording stopped",
        description: "Processing your message...",
      });
      
      // Simulate voice recognition result
      setTimeout(() => {
        setInputValue("I've been feeling a bit stressed with work lately");
        // Auto-send after a brief delay
        setTimeout(handleSendMessage, 500);
      }, 1500);
    } else {
      setIsRecording(true);
      toast({
        title: "Voice recording started",
        description: "Speak clearly into your microphone...",
      });
    }
  };
  
  const toggleSpeech = () => {
    setIsSpeaking(!isSpeaking);
    
    if (!isSpeaking) {
      toast({
        title: "Text-to-speech activated",
        description: "Assistant will now read responses aloud",
      });
    } else {
      toast({
        title: "Text-to-speech deactivated",
        description: "Assistant will no longer read responses aloud",
      });
    }
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-10 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            AI Mental Health Assistant
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A supportive space where you can talk about your feelings and receive personalized guidance.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare size={16} />
                Chat Interface
              </TabsTrigger>
              <TabsTrigger value="exercises" className="flex items-center gap-2">
                <Brain size={16} />
                Exercises & Resources
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="mt-4">
              <Card className="glass-panel-lg relative overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        Mental Health Assistant
                      </CardTitle>
                      <CardDescription>
                        Your AI companion for emotional support and guidance
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSpeech}
                        className="h-8 w-8"
                        title={isSpeaking ? "Disable voice" : "Enable voice"}
                      >
                        {isSpeaking ? <Volume2 size={16} /> : <VolumeX size={16} />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          setMessages([{
                            id: "1",
                            content: "Hello! I'm your mental health assistant. How are you feeling today?",
                            sender: "bot",
                            timestamp: new Date(),
                          }]);
                        }}
                        title="Reset conversation"
                      >
                        <RefreshCcw size={16} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="h-[400px] sm:h-[500px] overflow-y-auto mt-4 px-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "glass-panel-sm"
                        }`}
                      >
                        {message.emotion && message.sender === "bot" && (
                          <div className="mb-1">
                            <EmotionBadge emotion={message.emotion} />
                          </div>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <div
                          className={`text-xs mt-1 ${
                            message.sender === "user"
                              ? "text-primary-foreground/70"
                              : "text-slate-500"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="glass-panel-sm max-w-[80%] rounded-2xl px-4 py-2">
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 rounded-full bg-slate-400 animate-pulse" />
                          <div
                            className="h-2 w-2 rounded-full bg-slate-400 animate-pulse"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <div
                            className="h-2 w-2 rounded-full bg-slate-400 animate-pulse"
                            style={{ animationDelay: "0.4s" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </CardContent>
                
                <div className="absolute bottom-0 left-0 right-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-t border-slate-200 dark:border-slate-700">
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion.id}
                          onClick={() => handleSuggestionClick(suggestion.text)}
                          className="text-xs px-3 py-1.5 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                        >
                          {suggestion.text}
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Type your message here..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="min-h-[40px] resize-none"
                      />
                      <div className="flex flex-col gap-2">
                        <Button
                          variant={isRecording ? "destructive" : "outline"}
                          size="icon"
                          onClick={toggleRecording}
                          className="h-10 w-10 rounded-full"
                        >
                          <Mic size={18} />
                        </Button>
                        <Button
                          onClick={handleSendMessage}
                          className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90"
                          disabled={!inputValue.trim()}
                        >
                          <Send size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="exercises" className="mt-4 space-y-6">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle>Guided Breathing Exercise</CardTitle>
                  <CardDescription>
                    Follow along with this simple breathing exercise to help reduce stress and anxiety
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-video relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-32 w-32 rounded-full bg-primary/20 animate-pulse flex items-center justify-center">
                        <div className="h-24 w-24 rounded-full bg-primary/30 flex items-center justify-center">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-14 w-14 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-md hover:scale-105 transition-transform"
                          >
                            <PlayCircle size={24} className="text-primary" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                      <div className="w-12 text-center text-xs font-medium">1:23</div>
                      <div className="flex-1 h-1 bg-white/30 rounded-full">
                        <div className="h-full w-1/3 bg-primary rounded-full" />
                      </div>
                      <div className="w-12 text-center text-xs font-medium">4:30</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary font-medium">
                      Breathe In (4s)
                    </div>
                    <div className="p-2 rounded-lg bg-accent/10 text-accent font-medium">
                      Hold (4s)
                    </div>
                    <div className="p-2 rounded-lg bg-health-teal/10 text-health-teal font-medium">
                      Breathe Out (6s)
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-primary to-accent text-white">
                    Start Guided Session
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-panel">
                  <CardHeader>
                    <CardTitle>Stress Management Techniques</CardTitle>
                    <CardDescription>
                      Practical approaches to manage everyday stress
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {[
                        "Progressive Muscle Relaxation",
                        "Mindfulness Meditation",
                        "Physical Exercise",
                        "Time Management Strategies",
                        "Journal Writing"
                      ].map((technique, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">
                            {i + 1}
                          </div>
                          <span>{technique}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Detailed Guide
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="glass-panel">
                  <CardHeader>
                    <CardTitle>Mood Tracking</CardTitle>
                    <CardDescription>
                      Monitor your emotional patterns over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm">
                        Tracking your mood can help identify patterns and triggers. How are you feeling today?
                      </p>
                      <div className="grid grid-cols-5 gap-2">
                        {[
                          { emoji: "😢", label: "Sad" },
                          { emoji: "😟", label: "Anxious" },
                          { emoji: "😐", label: "Neutral" },
                          { emoji: "🙂", label: "Good" },
                          { emoji: "😁", label: "Great" }
                        ].map((mood, i) => (
                          <button 
                            key={i}
                            className="flex flex-col items-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <span className="text-2xl mb-1">{mood.emoji}</span>
                            <span className="text-xs">{mood.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Mood History
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle>Professional Resources</CardTitle>
                  <CardDescription>
                    When to seek professional mental health support
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    While our AI assistant provides support and guidance, some situations require professional help. 
                    Here are resources available in Mumbai:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
                      <h4 className="font-medium mb-1">Crisis Helplines</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        24/7 mental health support: +91-XX-XXXX-XXXX
                      </p>
                    </div>
                    <div className="p-3 rounded-lg border border-accent/20 bg-accent/5">
                      <h4 className="font-medium mb-1">Counseling Centers</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Find nearby mental health professionals
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-primary to-accent text-white">
                    Find Mental Health Services Near You
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
