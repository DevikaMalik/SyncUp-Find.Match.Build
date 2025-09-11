import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Search, Filter, Calendar, MapPin, Users, Trophy, Heart, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const HackathonExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [savedHackathons, setSavedHackathons] = useState(new Set());

  const hackathons = [
    {
      id: 1,
      name: 'AI Innovation Challenge 2024',
      date: '2024-03-15',
      endDate: '2024-03-17',
      location: 'San Francisco, CA',
      type: 'In-Person',
      theme: 'Artificial Intelligence',
      participants: 1200,
      prize: '$50,000',
      difficulty: 'Advanced',
      description: 'Build the next generation of AI applications that solve real-world problems.',
      organizer: 'TechCorp',
      tags: ['AI', 'Machine Learning', 'Innovation']
    },
    {
      id: 2,
      name: 'Green Tech Hackathon',
      date: '2024-03-22',
      endDate: '2024-03-24',
      location: 'Online',
      type: 'Virtual',
      theme: 'Sustainability',
      participants: 800,
      prize: '$25,000',
      difficulty: 'Intermediate',
      description: 'Create sustainable technology solutions for environmental challenges.',
      organizer: 'EcoTech Foundation',
      tags: ['Sustainability', 'Environment', 'Clean Tech']
    },
    {
      id: 3,
      name: 'FinTech Revolution',
      date: '2024-04-05',
      endDate: '2024-04-07',
      location: 'New York, NY',
      type: 'Hybrid',
      theme: 'Financial Technology',
      participants: 1500,
      prize: '$75,000',
      difficulty: 'Advanced',
      description: 'Revolutionize the financial industry with cutting-edge technology.',
      organizer: 'FinanceHub',
      tags: ['FinTech', 'Blockchain', 'Banking']
    },
    {
      id: 4,
      name: 'Healthcare Innovation Lab',
      date: '2024-04-12',
      endDate: '2024-04-14',
      location: 'Boston, MA',
      type: 'In-Person',
      theme: 'Healthcare',
      participants: 600,
      prize: '$40,000',
      difficulty: 'Intermediate',
      description: 'Develop innovative healthcare solutions using modern technology.',
      organizer: 'MedTech Alliance',
      tags: ['Healthcare', 'Medical', 'Innovation']
    },
    {
      id: 5,
      name: 'Gaming & VR Expo Hack',
      date: '2024-04-20',
      endDate: '2024-04-22',
      location: 'Los Angeles, CA',
      type: 'In-Person',
      theme: 'Gaming & VR',
      participants: 900,
      prize: '$35,000',
      difficulty: 'Beginner',
      description: 'Create immersive gaming and VR experiences for the future.',
      organizer: 'GameDev Studios',
      tags: ['Gaming', 'VR', 'Entertainment']
    },
    {
      id: 6,
      name: 'EdTech Future Summit',
      date: '2024-05-01',
      endDate: '2024-05-03',
      location: 'Online',
      type: 'Virtual',
      theme: 'Education Technology',
      participants: 700,
      prize: '$30,000',
      difficulty: 'Intermediate',
      description: 'Transform education through innovative technology solutions.',
      organizer: 'EduInnovate',
      tags: ['EdTech', 'Education', 'Learning']
    }
  ];

  const filters = [
    { id: 'all', label: 'All Hackathons' },
    { id: 'virtual', label: 'Virtual' },
    { id: 'in-person', label: 'In-Person' },
    { id: 'hybrid', label: 'Hybrid' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' }
  ];

  const filteredHackathons = hackathons.filter(hackathon => {
    const matchesSearch = hackathon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hackathon.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hackathon.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         hackathon.type.toLowerCase() === selectedFilter ||
                         hackathon.difficulty.toLowerCase() === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleSaveHackathon = (hackathonId) => {
    const newSaved = new Set(savedHackathons);
    if (newSaved.has(hackathonId)) {
      newSaved.delete(hackathonId);
      toast({
        title: "Removed from saved",
        description: "Hackathon removed from your saved list."
      });
    } else {
      newSaved.add(hackathonId);
      toast({
        title: "Saved successfully!",
        description: "Hackathon added to your saved list."
      });
    }
    setSavedHackathons(newSaved);
  };

  // const handleJoinHackathon = (hackathon) => {
  //   toast({
  //     title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
  //   });
  // };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'text-green-400 bg-green-500/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'virtual': return 'text-blue-400 bg-blue-500/20';
      case 'in-person': return 'text-purple-400 bg-purple-500/20';
      case 'hybrid': return 'text-teal-400 bg-teal-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <>
      <Helmet>
        <title>Hackathon Explorer - SyncUp</title>
        <meta name="description" content="Discover amazing hackathons tailored to your interests and skill level. Join competitions and build innovative projects." />
        <meta property="og:title" content="Hackathon Explorer - SyncUp" />
        <meta property="og:description" content="Discover amazing hackathons tailored to your interests and skill level. Join competitions and build innovative projects." />
      </Helmet>

      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Discover Amazing Hackathons</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Find the perfect hackathon that matches your skills, interests, and schedule. Join thousands of developers building the future.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-6 rounded-2xl mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search hackathons by name, theme, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedFilter === filter.id
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <p className="text-gray-400">
              Showing {filteredHackathons.length} of {hackathons.length} hackathons
            </p>
          </motion.div>

          {/* Hackathon Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {filteredHackathons.map((hackathon, index) => (
              <motion.div
                key={hackathon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="hackathon-card p-6 rounded-2xl"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20">
                      <Trophy className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{hackathon.name}</h3>
                      <p className="text-gray-400 text-sm">{hackathon.organizer}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSaveHackathon(hackathon.id)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Bookmark 
                      className={`h-5 w-5 ${
                        savedHackathons.has(hackathon.id) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </button>
                </div>

                {/* Tags */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(hackathon.difficulty)}`}>
                    {hackathon.difficulty}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(hackathon.type)}`}>
                    {hackathon.type}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium text-gray-400 bg-gray-500/20">
                    {hackathon.theme}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {hackathon.description}
                </p>

                {/* Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(hackathon.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })} - {new Date(hackathon.endDate).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    {hackathon.location}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-400">
                      <Users className="h-4 w-4 mr-2" />
                      {hackathon.participants} participants
                    </div>
                    <div className="text-green-400 font-semibold">
                      Prize: {hackathon.prize}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {hackathon.tags.map((tag) => (
                    <span key={tag} className="skill-chip px-3 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button 
                    // onClick={() => handleJoinHackathon(hackathon)}
                    className="flex-1 glass-button"
                  >
                    Join Hackathon
                  </Button>
                  <Button 
                    variant="outline" 
                    // onClick={() => handleJoinHackathon(hackathon)}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredHackathons.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <div className="glass-card p-8 rounded-2xl max-w-md mx-auto">
                <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No hackathons found</h3>
                <p className="text-gray-400">
                  Try adjusting your search terms or filters to find more hackathons.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default HackathonExplorer;