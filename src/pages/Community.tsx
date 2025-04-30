
import { useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  Flag, 
  PlusCircle,
  TrendingUp,
  Clock,
  UserPlus,
  Award
} from "lucide-react";

// Define types
type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  avatar: string;
  date: string;
  category: string;
  likes: number;
  comments: number;
  isLiked: boolean;
};

type Category = {
  id: string;
  name: string;
  icon: JSX.Element;
  postCount: number;
};

const Community = () => {
  // Sample community forum data
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "Tips for preventing dengue during monsoon season",
      content: "I've noticed an increase in mosquitoes in my area. Here are some preventive measures I'm taking: clearing stagnant water, using mosquito nets and repellents, and wearing full-sleeve clothes. What else can we do as a community?",
      author: "Priya Sharma",
      avatar: "https://i.pravatar.cc/150?img=36",
      date: "2 days ago",
      category: "Dengue Prevention",
      likes: 45,
      comments: 12,
      isLiked: false
    },
    {
      id: "2",
      title: "Mental health resources available in Andheri West",
      content: "I'm looking for affordable mental health counseling in Andheri West. I've found a few options but would appreciate recommendations from anyone who has had positive experiences with therapists in this area.",
      author: "Rahul Patel",
      avatar: "https://i.pravatar.cc/150?img=68",
      date: "3 days ago",
      category: "Mental Health",
      likes: 32,
      comments: 8,
      isLiked: false
    },
    {
      id: "3",
      title: "Organizing a community cleanup in Dharavi",
      content: "I'm planning to organize a community cleanup this weekend to address some of the sanitation issues in our area. Looking for volunteers and any suggestions on what we should focus on first.",
      author: "Aditya Kumar",
      avatar: "https://i.pravatar.cc/150?img=12",
      date: "1 week ago",
      category: "Community Action",
      likes: 76,
      comments: 24,
      isLiked: true
    },
    {
      id: "4",
      title: "Weekly yoga sessions at Juhu Beach",
      content: "I'm starting free yoga sessions every Sunday morning at Juhu Beach to promote physical and mental wellbeing. All levels welcome! We'll focus on breathing techniques that can help with stress and anxiety.",
      author: "Neha Gupta",
      avatar: "https://i.pravatar.cc/150?img=45",
      date: "5 days ago",
      category: "Wellness",
      likes: 52,
      comments: 15,
      isLiked: false
    },
    {
      id: "5",
      title: "Air quality concerns in Powai area",
      content: "Has anyone else noticed the declining air quality in Powai? I've been experiencing more respiratory issues lately and wondering if others are facing similar problems. Are there any community initiatives addressing this?",
      author: "Vikram Desai",
      avatar: "https://i.pravatar.cc/150?img=22",
      date: "3 days ago",
      category: "Environmental Health",
      likes: 38,
      comments: 21,
      isLiked: false
    }
  ]);

  const categories: Category[] = [
    { id: "1", name: "Dengue Prevention", icon: <TrendingUp size={16} />, postCount: 24 },
    { id: "2", name: "Mental Health", icon: <MessageSquare size={16} />, postCount: 18 },
    { id: "3", name: "Community Action", icon: <UserPlus size={16} />, postCount: 32 },
    { id: "4", name: "Wellness", icon: <Heart size={16} />, postCount: 15 },
    { id: "5", name: "Environmental Health", icon: <Award size={16} />, postCount: 22 }
  ];

  // Toggle like on a post
  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <Helmet>
        <title>Community Forum | Urban Health Portal</title>
        <meta name="description" content="Connect with the Mumbai community to discuss health concerns, share resources, and organize initiatives." />
      </Helmet>
      
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Community Health Forum
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Connect with others, share experiences, and contribute to making Mumbai a healthier city
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle>Discussion Categories</CardTitle>
                  <CardDescription>
                    Browse topics by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div 
                        key={category.id}
                        className="flex items-center justify-between p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            {category.icon}
                          </div>
                          <span>{category.name}</span>
                        </div>
                        <span className="text-sm text-slate-500">{category.postCount}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Categories
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Start a Discussion</CardTitle>
                  <CardDescription>
                    Share your thoughts or questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-primary to-accent text-white flex items-center gap-2">
                    <PlusCircle size={16} />
                    New Discussion
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Community Discussions</CardTitle>
                  <div className="flex items-center gap-2">
                    <Input 
                      placeholder="Search discussions..." 
                      className="w-full max-w-[220px]" 
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="popular">
                  <TabsList className="mb-4">
                    <TabsTrigger value="popular" className="flex items-center gap-1">
                      <TrendingUp size={14} />
                      Popular
                    </TabsTrigger>
                    <TabsTrigger value="recent" className="flex items-center gap-1">
                      <Clock size={14} />
                      Recent
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="popular" className="space-y-4">
                    {posts.sort((a, b) => b.likes - a.likes).map((post) => (
                      <PostCard 
                        key={post.id} 
                        post={post} 
                        onLike={() => toggleLike(post.id)} 
                      />
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="recent" className="space-y-4">
                    {posts.map((post) => (
                      <PostCard 
                        key={post.id} 
                        post={post} 
                        onLike={() => toggleLike(post.id)} 
                      />
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline">Load More</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostCard = ({ post, onLike }: { post: Post; onLike: () => void }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <img 
            src={post.avatar} 
            alt={post.author} 
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <div className="font-medium">{post.author}</div>
            <div className="text-xs text-slate-500">{post.date}</div>
          </div>
          <div className="ml-auto px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
            {post.category}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4">{post.content}</p>
        
        <div className="flex items-center justify-between border-t pt-3 mt-2">
          <div className="flex items-center gap-4">
            <button 
              onClick={onLike}
              className={`flex items-center gap-1 text-sm ${post.isLiked ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}
            >
              <Heart size={18} className={post.isLiked ? 'fill-current' : ''} />
              {post.likes}
            </button>
            <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-primary">
              <MessageSquare size={18} />
              {post.comments}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 text-slate-500 hover:text-primary">
              <Share2 size={18} />
            </button>
            <button className="p-1 text-slate-500 hover:text-red-500">
              <Flag size={18} />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Community;
