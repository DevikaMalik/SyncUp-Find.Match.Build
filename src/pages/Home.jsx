import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowRight, Users, Brain, Trophy, Shield, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  const features = [
    {
      icon: Users,
      title: "Smart Team Matching",
      description: "AI-powered algorithm matches you with ideal teammates based on skills, experience, and goals."
    },
    {
      icon: Brain,
      title: "AI Coach",
      description: "Get personalized guidance, project ideas, and strategic advice from our intelligent coaching system."
    },
    {
      icon: Trophy,
      title: "Hackathon Discovery",
      description: "Discover exciting hackathons tailored to your interests and skill level."
    },
    {
      icon: Shield,
      title: "Verified Skills",
      description: "Build trust with verified achievements and skill badges from GitHub, LinkedIn, and more."
    }
  ];

  return (
    <>
      <Helmet>
        <title>SyncUp - Find Your Perfect Hackathon Team & AI Coach</title>
        <meta name="description" content="Discover hackathons, get matched with ideal teammates, and receive AI coaching for project success. Join the future of collaborative innovation." />
        <meta property="og:title" content="SyncUp - Find Your Perfect Hackathon Team & AI Coach" />
        <meta property="og:description" content="Discover hackathons, get matched with ideal teammates, and receive AI coaching for project success. Join the future of collaborative innovation." />
      </Helmet>

      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="hero-bg relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
          
          <div className="relative max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Floating Icons */}
              {/* <div className="absolute -top-20 -left-20 floating-animation">
                <div className="p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm">
                  <Zap className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <div className="absolute -top-10 -right-32 floating-animation" style={{ animationDelay: '2s' }}>
                <div className="p-4 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-600/20 backdrop-blur-sm">
                  <Sparkles className="h-8 w-8 text-purple-400" />
                </div>
              </div> */}

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="gradient-text">SyncUp</span>
                <br />
                <span className="text-white">Find Your Perfect</span>
                <br />
                <span className="gradient-text">Hackathon Team</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover amazing hackathons, get matched with ideal teammates, and receive AI-powered coaching to turn your ideas into winning projects.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <Link to="/auth">
                  <Button size="lg" className="glass-button text-white font-semibold px-8 py-4 text-lg">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/explorer">
                  <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg">
                    Explore Hackathons
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Hero Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-16"
            >
              <img  
                className="mx-auto max-w-4xl w-full rounded-2xl shadow-2xl pulse-glow" 
                alt="Team collaboration and AI coaching illustration"
               src="https://images.unsplash.com/photo-1565841327798-694bc2074762" />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Why Choose SyncUp?</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We're revolutionizing how developers connect, collaborate, and succeed in hackathons.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-2xl hover:scale-105 transition-transform duration-300"
                >
                  <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-card p-12 rounded-3xl"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Ready to Build Something Amazing?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of developers who are already using SyncUp to find their perfect hackathon teams and win competitions.
              </p>
              <Link to="/auth">
                <Button size="lg" className="glass-button text-white font-semibold px-12 py-4 text-lg">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;