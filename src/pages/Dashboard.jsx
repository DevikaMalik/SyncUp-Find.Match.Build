import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Calendar, Users, Brain, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  const quickStats = [
    { label: 'Hackathons Joined', value: '3', icon: Trophy, color: 'from-yellow-500 to-orange-500' },
    { label: 'Team Connections', value: '12', icon: Users, color: 'from-blue-500 to-purple-500' },
    { label: 'AI Sessions', value: '8', icon: Brain, color: 'from-green-500 to-teal-500' },
    { label: 'Skills Verified', value: user.skills?.length || 0, icon: Sparkles, color: 'from-pink-500 to-rose-500' }
  ];

  const upcomingHackathons = [
    {
      id: 1,
      name: 'AI Innovation Challenge',
      date: '2024-03-15',
      theme: 'Artificial Intelligence',
      participants: 1200,
      prize: '$50,000'
    },
    {
      id: 2,
      name: 'Green Tech Hackathon',
      date: '2024-03-22',
      theme: 'Sustainability',
      participants: 800,
      prize: '$25,000'
    },
    {
      id: 3,
      name: 'FinTech Revolution',
      date: '2024-04-05',
      theme: 'Financial Technology',
      participants: 1500,
      prize: '$75,000'
    }
  ];

  const suggestedTeammates = [
    {
      id: 1,
      name: 'Sarah Chen',
      skills: ['React', 'Node.js', 'UI/UX'],
      experience: '3 years',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      skills: ['Python', 'Machine Learning', 'Data Science'],
      experience: '5 years',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      skills: ['Flutter', 'Firebase', 'Mobile Dev'],
      experience: '4 years',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena'
    }
  ];

  // const handleFeatureClick = (feature) => {
  //   toast({
  //     title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
  //   });
  // };

  return (
    <>
      <Helmet>
        <title>Dashboard - SyncUp</title>
        <meta name="description" content="Your personalized SyncUp dashboard with hackathons, team matching, and AI coaching insights." />
        <meta property="og:title" content="Dashboard - SyncUp" />
        <meta property="og:description" content="Your personalized SyncUp dashboard with hackathons, team matching, and AI coaching insights." />
      </Helmet>

      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, <span className="gradient-text">{user.name}</span>! 👋
            </h1>
            <p className="text-gray-400 text-lg">
              Ready to build something amazing? Let's find your next hackathon adventure.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {quickStats.map((stat, index) => (
              <div key={stat.label} className="glass-card p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Main Dashboard Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs defaultValue="hackathons" className="space-y-6">
              <TabsList className="glass-card p-1 bg-white/5 border border-white/10">
                <TabsTrigger value="hackathons" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
                  <Calendar className="h-4 w-4 mr-2" />
                  Hackathon Explorer
                </TabsTrigger>
                <TabsTrigger value="matchmaking" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                  <Users className="h-4 w-4 mr-2" />
                  Team Matchmaking
                </TabsTrigger>
                <TabsTrigger value="ai-coach" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
                  <Brain className="h-4 w-4 mr-2" />
                  AI Coach
                </TabsTrigger>
              </TabsList>

              {/* Hackathon Explorer Tab */}
              <TabsContent value="hackathons" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Upcoming Hackathons</h2>
                  <Button 
                    onClick={() => navigate('/explorer')}
                    className="glass-button"
                  >
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingHackathons.map((hackathon) => (
                    <div key={hackathon.id} className="hackathon-card p-6 rounded-xl">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20">
                          <Trophy className="h-5 w-5 text-blue-400" />
                        </div>
                        <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
                          {hackathon.theme}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{hackathon.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        {new Date(hackathon.date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                        <span>{hackathon.participants} participants</span>
                        <span className="text-green-400 font-semibold">{hackathon.prize}</span>
                      </div>
                      <Button 
                        // onClick={() => handleFeatureClick('join-hackathon')}
                        className="w-full glass-button"
                      >
                        Join Hackathon
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Team Matchmaking Tab */}
              <TabsContent value="matchmaking" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Suggested Teammates</h2>
                  <Button 
                    onClick={() => navigate('/matchmaking')}
                    className="glass-button"
                  >
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suggestedTeammates.map((teammate) => (
                    <div key={teammate.id} className="teammate-card p-6 rounded-xl">
                      <div className="flex items-center mb-4">
                        <img 
                          src={teammate.avatar} 
                          alt={teammate.name}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-white">{teammate.name}</h3>
                          <p className="text-gray-400 text-sm">{teammate.experience}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {teammate.skills.map((skill) => (
                          <span key={skill} className="skill-chip px-2 py-1 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <Button 
                        // onClick={() => handleFeatureClick('connect-teammate')}
                        className="w-full glass-button"
                      >
                        Connect
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* AI Coach Tab */}
              <TabsContent value="ai-coach" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">AI Coach Insights</h2>
                  <Button 
                    onClick={() => navigate('/ai-coach')}
                    className="glass-button"
                  >
                    Open Chat
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="glass-card p-8 rounded-xl">
                  <div className="text-center">
                    <div className="p-4 rounded-full bg-gradient-to-r from-green-500/20 to-teal-600/20 w-fit mx-auto mb-4">
                      <Brain className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Ready to Get Coaching?</h3>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                      Get personalized advice on project ideas, team dynamics, and winning strategies from our AI coach.
                    </p>
                    <Button 
                      onClick={() => navigate('/ai-coach')}
                      className="glass-button"
                    >
                      Start Coaching Session
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;