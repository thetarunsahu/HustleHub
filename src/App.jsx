import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import ImpactCTA from './components/ImpactCTA';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import TaskBoard from './components/TaskBoard';

function AppContent() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div className="app">
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />

      {isAuthenticated ? (
        <TaskBoard />
      ) : (
        <>
          <Hero />
          <ProblemSolution />
          <HowItWorks />
          <Features />
          <ImpactCTA />
        </>
      )}

      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
