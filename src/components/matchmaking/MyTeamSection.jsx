import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MyTeamSection = ({ connectedUsers, teammates, onMessage }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-16"
    >
      <h2 className="text-2xl font-bold text-white mb-6">My Team</h2>
      {connectedUsers.size > 0 ? (
        <div className="glass-card p-6 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teammates
              .filter(teammate => connectedUsers.has(teammate.id))
              .map((teammate) => (
                <div key={teammate.id} className="flex items-center p-4 bg-white/5 rounded-lg">
                  <img
                    src={teammate.avatar}
                    alt={teammate.name}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{teammate.name}</h4>
                    <p className="text-gray-400 text-sm">{teammate.title}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onMessage(teammate)}
                    className="text-gray-400 hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="glass-card p-8 rounded-2xl text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No team members yet</h3>
          <p className="text-gray-400">
            Start connecting with teammates to build your dream team!
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default MyTeamSection;