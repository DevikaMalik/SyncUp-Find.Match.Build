import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Edit3, Save, X, Plus, Github, Linkedin, Globe, Award, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user || {});
  const [newSkill, setNewSkill] = useState('');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please log in to view your profile</h2>
          <Button onClick={() => window.location.href = '/auth'}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateUser(editedUser);
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your profile has been successfully updated."
    });
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !editedUser.skills?.includes(newSkill.trim())) {
      setEditedUser({
        ...editedUser,
        skills: [...(editedUser.skills || []), newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditedUser({
      ...editedUser,
      skills: editedUser.skills?.filter(skill => skill !== skillToRemove) || []
    });
  };

  const handleVerifyBadge = (platform) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const verificationBadges = [
    { id: 'github', name: 'GitHub', icon: Github, color: 'text-gray-400', verified: false },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-400', verified: false },
    { id: 'portfolio', name: 'Portfolio', icon: Globe, color: 'text-green-400', verified: false }
  ];

  const achievements = [
    { id: 1, title: 'First Hackathon', description: 'Completed your first hackathon', date: '2024-01-15', icon: Award },
    { id: 2, title: 'Team Player', description: 'Successfully collaborated with 5+ teammates', date: '2024-02-20', icon: Award },
    { id: 3, title: 'Innovation Award', description: 'Won most innovative project at TechHack 2024', date: '2024-03-01', icon: Award }
  ];

  return (
    <>
      <Helmet>
        <title>Profile - SyncUp</title>
        <meta name="description" content="Manage your SyncUp profile, skills, achievements, and verification badges." />
        <meta property="og:title" content="Profile - SyncUp" />
        <meta property="og:description" content="Manage your SyncUp profile, skills, achievements, and verification badges." />
      </Helmet>

      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Your Profile</span>
            </h1>
            <p className="text-xl text-gray-300">
              Manage your information, skills, and achievements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="glass-card p-6 rounded-2xl">
                <div className="text-center mb-6">
                  <img 
                    src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                    alt={user.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editedUser.name || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-center font-bold text-lg"
                      />
                      <input
                        type="email"
                        value={editedUser.email || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-center text-gray-400"
                      />
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-xl font-bold text-white">{user.name}</h2>
                      <p className="text-gray-400">{user.email}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Joined {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.location || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })}
                        placeholder="Add your location"
                        className="flex-1 px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm"
                      />
                    ) : (
                      <span>{user.location || 'Location not set'}</span>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} className="flex-1 glass-button">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancel} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} className="w-full glass-button">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Bio Section */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">About Me</h3>
                {isEditing ? (
                  <textarea
                    value={editedUser.bio || ''}
                    onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                    placeholder="Tell us about yourself, your interests, and what you're passionate about..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    rows="4"
                  />
                ) : (
                  <p className="text-gray-300 leading-relaxed">
                    {user.bio || "No bio added yet. Click edit to add information about yourself!"}
                  </p>
                )}
              </div>

              {/* Skills Section */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(isEditing ? editedUser.skills : user.skills)?.map((skill) => (
                    <div key={skill} className="skill-chip px-3 py-1 rounded-full text-sm flex items-center">
                      <span>{skill}</span>
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-2 text-red-400 hover:text-red-300"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                      placeholder="Add a new skill"
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <Button onClick={handleAddSkill} className="glass-button">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Verification Badges */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Verification Badges</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {verificationBadges.map((badge) => (
                    <div key={badge.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <badge.icon className={`h-5 w-5 ${badge.color}`} />
                          <span className="text-white font-medium">{badge.name}</span>
                        </div>
                        {badge.verified ? (
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        ) : (
                          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        )}
                      </div>
                      <Button
                        // onClick={() => handleVerifyBadge(badge.id)}
                        variant="outline"
                        size="sm"
                        className="w-full border-white/20 text-white hover:bg-white/10"
                      >
                        {badge.verified ? 'Verified' : 'Verify'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Achievements</h3>
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center p-4 bg-white/5 rounded-lg">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-600/20 mr-4">
                        <achievement.icon className="h-6 w-6 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{achievement.title}</h4>
                        <p className="text-gray-400 text-sm">{achievement.description}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          {new Date(achievement.date).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;