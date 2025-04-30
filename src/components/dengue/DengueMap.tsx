
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Layers, AlertTriangle, Info, RefreshCw, Calendar, Filter, Plus, Minus } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for Leaflet marker icons
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom marker icons for different risk levels
const highRiskIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const mediumRiskIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const lowRiskIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Mumbai center coordinates - explicitly typed as [number, number] (LatLngTuple)
const MUMBAI_CENTER: [number, number] = [19.0760, 72.8777];

// Define the type for our marker data
interface MarkerData {
  position: [number, number]; // Explicitly define as LatLngTuple
  name: string;
  cases: number;
  details: string;
}

// Sample data for dengue outbreaks
const dengueData: {
  highRisk: MarkerData[];
  mediumRisk: MarkerData[];
  lowRisk: MarkerData[];
} = {
  highRisk: [
    { position: [19.0825, 72.8411], name: "Andheri East", cases: 89, details: "Active breeding sites detected" },
    { position: [19.0454, 72.8891], name: "Dharavi", cases: 76, details: "Overcrowded area with poor drainage" },
    { position: [19.0359, 72.8552], name: "Worli", cases: 65, details: "Recent surge in cases" },
  ],
  mediumRisk: [
    { position: [19.0177, 72.8563], name: "Dadar", cases: 42, details: "Moderate cases reported" },
    { position: [19.1136, 72.9081], name: "Powai", cases: 37, details: "Cases increasing steadily" },
    { position: [19.0596, 72.8295], name: "Bandra West", cases: 31, details: "Recent cleanup operations ongoing" },
    { position: [19.0212, 72.8424], name: "Lower Parel", cases: 29, details: "Construction sites under surveillance" },
    { position: [19.0895, 72.8656], name: "Santacruz", cases: 25, details: "Preventive measures implemented" },
  ],
  lowRisk: [
    { position: [19.1765, 72.9480], name: "Mulund", cases: 14, details: "Limited cases reported" },
    { position: [19.2147, 72.9784], name: "Thane", cases: 12, details: "Situation under control" },
    { position: [19.0623, 72.8826], name: "Kurla", cases: 9, details: "Improved sanitation efforts" },
    { position: [19.0328, 72.8426], name: "Prabhadevi", cases: 7, details: "Few isolated cases" },
    { position: [19.0191, 73.0394], name: "Navi Mumbai", cases: 5, details: "Regular monitoring in place" },
    { position: [18.9542, 72.8358], name: "Colaba", cases: 4, details: "Few cases, well contained" },
    { position: [19.1554, 72.8369], name: "Borivali", cases: 3, details: "Minimal cases reported" },
    { position: [19.0438, 72.9452], name: "Ghatkopar", cases: 2, details: "Preventive measures effective" },
  ]
};

const DengueMap = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("weekly");
  const [severity, setSeverity] = useState("all");
  const [visualizationMode, setVisualizationMode] = useState("heatmap");
  const [activeTab, setActiveTab] = useState("this-week");
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mock data for the stats
  const stats = [
    { label: "Active Cases", value: "2,847", change: "+12%", trend: "up" },
    { label: "High-Risk Zones", value: "32", change: "+3", trend: "up" },
    { label: "Recovery Rate", value: "76%", change: "+2%", trend: "up" },
    { label: "Alert Level", value: "Moderate", trend: "neutral" }
  ];

  // Filter markers based on severity selection
  const getVisibleMarkers = () => {
    let markers: MarkerData[] = [];
    
    if (severity === "all" || severity === "high") {
      markers = [...markers, ...dengueData.highRisk];
    }
    
    if (severity === "all" || severity === "moderate") {
      markers = [...markers, ...dengueData.mediumRisk];
    }
    
    if (severity === "all" || severity === "low") {
      markers = [...markers, ...dengueData.lowRisk];
    }
    
    return markers;
  };
  
  // Get icon based on risk level
  const getMarkerIcon = (marker: MarkerData) => {
    if (dengueData.highRisk.some(m => m.name === marker.name)) {
      return highRiskIcon;
    } else if (dengueData.mediumRisk.some(m => m.name === marker.name)) {
      return mediumRiskIcon;
    } else {
      return lowRiskIcon;
    }
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-10 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Mumbai Dengue Outbreak Tracker
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Real-time visualization of dengue-affected areas, infection density, and outbreak trends across Mumbai.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {stats.map((stat, i) => (
            <Card key={i} className={`backdrop-blur-sm ${i === 3 && stat.trend === 'up' ? 'border-destructive/50 bg-destructive/5' : 'glass-panel-sm'}`}>
              <CardHeader className="pb-2">
                <CardDescription>{stat.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  {stat.change && (
                    <div className={`text-xs font-medium flex items-center ${
                      stat.trend === 'up' 
                        ? i === 2 ? 'text-green-500' : 'text-red-500' 
                        : stat.trend === 'down' 
                          ? i === 2 ? 'text-red-500' : 'text-green-500'
                          : 'text-yellow-500'
                    }`}>
                      {stat.trend === 'up' && <span className="mr-1">↑</span>}
                      {stat.trend === 'down' && <span className="mr-1">↓</span>}
                      {stat.trend === 'neutral' && <AlertTriangle size={12} className="mr-1" />}
                      {stat.change}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Last card with refresh */}
          <Card className="glass-panel-sm">
            <CardHeader className="pb-2">
              <CardDescription className="flex justify-between">
                <span>Last Updated</span>
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <RefreshCw size={12} />
                </Button>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium">Today, 3:45 PM</div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6 overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl">Dengue Outbreak Heatmap</CardTitle>
            <div className="flex gap-2 mt-2">
              <Button 
                variant={activeTab === "this-week" ? "default" : "outline"} 
                size="sm"
                className={activeTab === "this-week" ? "bg-health-teal" : ""}
                onClick={() => setActiveTab("this-week")}
              >
                This Week
              </Button>
              <Button 
                variant={activeTab === "this-month" ? "default" : "outline"} 
                size="sm"
                className={activeTab === "this-month" ? "bg-health-teal" : ""}
                onClick={() => setActiveTab("this-month")}
              >
                This Month
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 mt-4">
            <div className="h-[600px] w-full relative">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin mb-3" />
                    <p className="text-sm font-medium">Loading map data...</p>
                  </div>
                </div>
              ) : (
                <MapContainer 
                  center={MUMBAI_CENTER} 
                  zoom={12} 
                  style={{ height: "100%", width: "100%" }} 
                  zoomControl={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <ZoomControl position="topleft" />
                  
                  {getVisibleMarkers().map((marker, index) => (
                    <Marker 
                      key={index} 
                      position={marker.position} 
                      icon={getMarkerIcon(marker)}
                    >
                      <Popup>
                        <div className="p-1">
                          <h3 className="font-bold text-base">{marker.name}</h3>
                          <p className="text-sm mb-1"><span className="font-semibold">Cases:</span> {marker.cases}</p>
                          <p className="text-xs text-gray-600">{marker.details}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center pt-4">
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-red-500"></div>
                <span className="text-sm">High Risk Areas</span>
                <span className="text-xs text-gray-500">({dengueData.highRisk.length} zones)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-orange-400"></div>
                <span className="text-sm">Medium Risk Areas</span>
                <span className="text-xs text-gray-500">({dengueData.mediumRisk.length} zones)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-yellow-300"></div>
                <span className="text-sm">Low Risk Areas</span>
                <span className="text-xs text-gray-500">({dengueData.lowRisk.length} zones)</span>
              </div>
            </div>
            <div className="text-xs text-right text-gray-500">
              © <a href="https://www.openstreetmap.org/copyright" className="underline">OpenStreetMap</a> contributors
            </div>
          </CardFooter>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls panel */}
          <Card className="glass-panel-sm lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Map Controls</CardTitle>
              <CardDescription>
                Filter and customize the dengue outbreak visualization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  <Calendar size={14} />
                  Time Period
                </label>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  <AlertTriangle size={14} />
                  Severity Level
                </label>
                <Select value={severity} onValueChange={setSeverity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="high">High Risk Only</SelectItem>
                    <SelectItem value="moderate">Moderate & High</SelectItem>
                    <SelectItem value="low">Low Risk Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  <Layers size={14} />
                  Visualization Mode
                </label>
                <Tabs value={visualizationMode} onValueChange={setVisualizationMode} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
                    <TabsTrigger value="markers">Markers</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  <Filter size={14} />
                  Intensity Threshold
                </label>
                <Slider defaultValue={[65]} max={100} step={5} className="py-4" />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Reset Filters
              </Button>
            </CardFooter>
          </Card>
          
          {/* Prevention measures panel */}
          <Card className="glass-panel-sm lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg">Prevention Measures</CardTitle>
              <CardDescription>
                Steps to protect yourself and your community from dengue
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Eliminate standing water where mosquitoes breed",
                "Use mosquito repellent on exposed skin",
                "Wear long-sleeved shirts and long pants",
                "Install window and door screens",
                "Use mosquito nets while sleeping",
                "Apply insecticides in dark corners of the house"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5 shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-sm">{item}</p>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="text-white bg-health-teal hover:bg-health-teal/90">
                Download Prevention Guide
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DengueMap;
