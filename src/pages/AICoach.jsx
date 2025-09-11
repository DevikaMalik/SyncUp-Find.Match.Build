import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Send, Bot, User, Lightbulb, Target, Users, Code, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AICoach = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI hackathon coach. I'm here to help you with project ideas, team strategies, technical guidance, and winning tips. What would you like to work on today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const aiResponses = [
    "That's a great question! For hackathon success, I'd recommend focusing on solving a real problem that affects many people. Start by identifying pain points in your daily life or community.",
    "Excellent project idea! To make it stand out, consider adding a unique twist or combining multiple technologies. What specific technologies are you planning to use?",
    "Team dynamics are crucial for hackathon success. Make sure to establish clear roles early, set up regular check-ins, and use collaborative tools like GitHub and Slack for coordination.",
    "For technical implementation, I suggest starting with an MVP (Minimum Viable Product) approach. Focus on core functionality first, then add features if time permits.",
    "Great thinking! To improve your pitch, structure it as: Problem → Solution → Demo → Market Potential → Team. Keep it under 3 minutes and practice beforehand.",
    "Time management is key in hackathons. I recommend the 40-30-20-10 rule: 40% planning and research, 30% development, 20% testing and refinement, 10% presentation prep.",
    "That's an innovative approach! Consider how your solution scales and what the long-term impact could be. Judges love projects with real-world applications.",
    "For team formation, look for complementary skills: frontend/backend developers, designers, and someone with domain expertise. Diversity in perspectives leads to better solutions."
  ];

  const quickTips = [
    {
      icon: Lightbulb,
      title: "Project Ideas",
      description: "Get innovative project suggestions based on current trends and your skills."
    },
    {
      icon: Target,
      title: "Strategy Planning",
      description: "Learn winning strategies for time management and project execution."
    },
    {
      icon: Users,
      title: "Team Dynamics",
      description: "Tips for effective collaboration and role distribution in your team."
    },
    {
      icon: Code,
      title: "Technical Guidance",
      description: "Get advice on technology choices and implementation approaches."
    }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // const handleQuickTip = (tip) => {
  //   toast({
  //     title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
  //   });
  // };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Coach - SyncUp</title>
        <meta name="description" content="Get personalized AI coaching for hackathon success. Receive guidance on project ideas, team strategies, and winning approaches." />
        <meta property="og:title" content="AI Coach - SyncUp" />
        <meta property="og:description" content="Get personalized AI coaching for hackathon success. Receive guidance on project ideas, team strategies, and winning approaches." />
      </Helmet>

      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">AI Hackathon Coach</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get personalized guidance, strategic advice, and winning tips from your AI coaching assistant.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Tips Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="glass-card p-6 rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-yellow-400" />
                  Quick Tips
                </h2>
                <div className="space-y-4">
                  {quickTips.map((tip, index) => (
                    <motion.button
                      key={tip.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      // onClick={() => handleQuickTip(tip)}
                      className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-left group"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all">
                          <tip.icon className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium text-sm">{tip.title}</h3>
                          <p className="text-gray-400 text-xs mt-1 leading-relaxed">{tip.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Chat Interface */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="glass-card rounded-2xl overflow-hidden h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-gradient-to-r from-green-500/20 to-teal-600/20">
                      <Bot className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">AI Coach</h3>
                      <p className="text-gray-400 text-sm">Online • Ready to help</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20' : 'bg-gradient-to-r from-green-500/20 to-teal-600/20'}`}>
                          {message.type === 'user' ? (
                            <User className="h-4 w-4 text-blue-400" />
                          ) : (
                            <Bot className="h-4 w-4 text-green-400" />
                          )}
                        </div>
                        <div className={`p-4 rounded-2xl ${message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
                          <p className="text-white text-sm leading-relaxed">{message.content}</p>
                          <p className="text-gray-400 text-xs mt-2">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-3 max-w-[80%]">
                        <div className="p-2 rounded-full bg-gradient-to-r from-green-500/20 to-teal-600/20">
                          <Bot className="h-4 w-4 text-green-400" />
                        </div>
                        <div className="chat-bubble-ai p-4 rounded-2xl">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-6 border-t border-white/10">
                  <div className="flex space-x-3">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about hackathons, project ideas, team strategies..."
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      rows="2"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="glass-button px-4 py-3"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AICoach;