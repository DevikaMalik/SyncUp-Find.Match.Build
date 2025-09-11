import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Users } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { teammatesData, filtersData } from '@/data/teamMatchmaking';
import TeammateCard from '@/components/matchmaking/TeammateCard';
import FilterControls from '@/components/matchmaking/FilterControls';
import MyTeamSection from '@/components/matchmaking/MyTeamSection';

const TeamMatchmaking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [connectedUsers, setConnectedUsers] = useState(new Set());

  const filteredTeammates = useMemo(() => {
    return teammatesData.filter(teammate => {
      const matchesSearch = teammate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teammate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teammate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilter = selectedFilter === 'all' ||
        (selectedFilter === 'available' && teammate.availability === 'Available') ||
        teammate.preferredRoles.some(role => role.toLowerCase().includes(selectedFilter.replace('-', ' ')));

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, selectedFilter]);

  const handleConnect = (teammateId) => {
    const newConnected = new Set(connectedUsers);
    if (newConnected.has(teammateId)) {
      newConnected.delete(teammateId);
      toast({
        title: "Connection removed",
        description: "You've disconnected from this teammate."
      });
    } else {
      newConnected.add(teammateId);
      toast({
        title: "Connection request sent!",
        description: "Your connection request has been sent successfully."
      });
    }
    setConnectedUsers(newConnected);
  };

  // const handleMessage = (teammate) => {
  //   toast({
  //     title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
  //   });
  // };

  return (
    <>
      <Helmet>
        <title>Team Matchmaking - SyncUp</title>
        <meta name="description" content="Find and connect with ideal hackathon teammates based on skills, experience, and project preferences." />
        <meta property="og:title" content="Team Matchmaking - SyncUp" />
        <meta property="og:description" content="Find and connect with ideal hackathon teammates based on skills, experience, and project preferences." />
      </Helmet>

      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Find Your Perfect Teammates</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect with talented developers, designers, and innovators who share your passion for building amazing projects.
            </p>
          </motion.div>

          <FilterControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            filters={filtersData}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <p className="text-gray-400">
              Showing {filteredTeammates.length} of {teammatesData.length} potential teammates
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTeammates.map((teammate, index) => (
              <TeammateCard
                key={teammate.id}
                teammate={teammate}
                isConnected={connectedUsers.has(teammate.id)}
                onConnect={handleConnect}
                // onMessage={handleMessage}
                index={index}
              />
            ))}
          </motion.div>

          {filteredTeammates.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <div className="glass-card p-8 rounded-2xl max-w-md mx-auto">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No teammates found</h3>
                <p className="text-gray-400">
                  Try adjusting your search terms or filters to find more potential teammates.
                </p>
              </div>
            </motion.div>
          )}

          <MyTeamSection
            connectedUsers={connectedUsers}
            teammates={teammatesData}
            // onMessage={handleMessage}
          />
        </div>
      </div>
    </>
  );
};

export default TeamMatchmaking;