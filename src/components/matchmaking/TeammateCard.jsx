import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle, UserPlus, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const getAvailabilityColor = (availability) => {
  return availability === 'Available'
    ? 'text-green-400 bg-green-500/20'
    : 'text-yellow-400 bg-yellow-500/20';
};

const TeammateCard = ({ teammate, isConnected, onConnect, onMessage, index }) => {
  return (
    <motion.div
      key={teammate.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      className="teammate-card p-6 rounded-2xl"
    >
      <div className="flex items-center mb-4">
        <img
          src={teammate.avatar}
          alt={teammate.name}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">{teammate.name}</h3>
          <p className="text-gray-400 text-sm">{teammate.title}</p>
          <div className="flex items-center mt-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm text-gray-300">{teammate.rating}</span>
            <span className="text-gray-500 text-sm ml-2">({teammate.completedProjects} projects)</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(teammate.availability)}`}>
          {teammate.availability}
        </span>
        <span className="text-gray-400 text-sm">{teammate.location}</span>
      </div>

      <p className="text-gray-300 text-sm mb-4 leading-relaxed h-16 overflow-hidden">
        {teammate.bio}
      </p>

      <div className="flex justify-between text-sm text-gray-400 mb-4">
        <span>{teammate.experience} experience</span>
        <span>{teammate.hackathonsWon} hackathons won</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 h-10 overflow-hidden">
        {teammate.skills.slice(0, 4).map((skill) => (
          <span key={skill} className="skill-chip px-2 py-1 rounded-full text-xs">
            {skill}
          </span>
        ))}
        {teammate.skills.length > 4 && (
          <span className="text-gray-400 text-xs px-2 py-1">
            +{teammate.skills.length - 4} more
          </span>
        )}
      </div>

      <div className="mb-6">
        <p className="text-gray-400 text-xs mb-2">Preferred Roles:</p>
        <div className="flex flex-wrap gap-1">
          {teammate.preferredRoles.map((role) => (
            <span key={role} className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-300">
              {role}
            </span>
          ))}
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          onClick={() => onConnect(teammate.id)}
          className={`flex-1 ${
            isConnected
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'glass-button'
          }`}
          variant={isConnected ? 'outline' : 'default'}
        >
          {isConnected ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Connected
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4 mr-2" />
              Connect
            </>
          )}
        </Button>
        <Button
          variant="outline"
          onClick={() => onMessage(teammate)}
          className="border-white/20 text-white hover:bg-white/10"
        >
          <MessageCircle className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default TeammateCard;