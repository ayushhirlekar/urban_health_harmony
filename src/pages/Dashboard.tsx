
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { BadgePlus, Calendar, LineChart as LineChartIcon } from "lucide-react";

const dummyData = [
  { month: 'Jan', dengueReported: 20, mentalHealthCases: 45 },
  { month: 'Feb', dengueReported: 18, mentalHealthCases: 52 },
  { month: 'Mar', dengueReported: 25, mentalHealthCases: 49 },
  { month: 'Apr', dengueReported: 35, mentalHealthCases: 55 },
  { month: 'May', dengueReported: 45, mentalHealthCases: 59 },
  { month: 'Jun', dengueReported: 25, mentalHealthCases: 63 }
];

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-20 md:py-24">
      <Helmet>
        <title>Dashboard | Urban Health Portal</title>
        <meta name="description" content="Health statistics and trends for Mumbai urban areas" />
      </Helmet>
      
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Health Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">View health statistics and trends for Mumbai urban areas</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BadgePlus className="h-5 w-5 text-primary" />
                Dengue Cases
              </CardTitle>
              <CardDescription>Total reported this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">45</div>
              <p className="text-xs text-rose-500 mt-1">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Community Events
              </CardTitle>
              <CardDescription>Upcoming this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-xs text-emerald-500 mt-1">+3 more than last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <LineChartIcon className="h-5 w-5 text-primary" />
                Mental Health
              </CardTitle>
              <CardDescription>Consultations provided</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">63</div>
              <p className="text-xs text-emerald-500 mt-1">+7% from last month</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Health Trends</CardTitle>
            <CardDescription>Reported cases over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dummyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="dengueReported" stroke="#ef4444" activeDot={{ r: 8 }} name="Dengue Cases" />
                  <Line type="monotone" dataKey="mentalHealthCases" stroke="#8884d8" name="Mental Health Consultations" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Download Report</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
