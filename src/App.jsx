import React from 'react';
import { Routes, Route } from 'react-router-dom'; // No need for BrowserRouter here
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Home from '@/pages/Home';
import Auth from '@/pages/Auth';
import HackathonExplorer from '@/pages/HackathonExplorer';
import Dashboard from '@/pages/Dashboard';
//import HackathonExplorer from '@/pages/HackathonExplorer';
import TeamMatchmaking from '@/pages/TeamMatchmaking';
import AICoach from '@/pages/AICoach';
import Profile from '@/pages/Profile';
import { AuthProvider } from '@/contexts/AuthContext';
import ChatWidget from '@/components/ai/ChatWidget';

function App() {
  return (
    <AuthProvider>
      {/* Remove <Router> from here */}
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explorer" element={<HackathonExplorer />} />
            <Route path="/matchmaking" element={<TeamMatchmaking />} />
            <Route path="/ai-coach" element={<AICoach />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget />
        <Toaster />
      </div>
      {/* Remove </Router> from here */}
    </AuthProvider>
  );
}

export default App;