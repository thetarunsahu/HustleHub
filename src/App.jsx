import React, { useState, useEffect } from 'react';
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
import CursorFollower from './components/CursorFollower';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Loading from './components/Loading';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Portfolio from './components/Portfolio';
import Payments from './components/Payments';
import FindTalent from './components/FindTalent';
import Learning from './components/Learning';
import Network from './components/Network';
import MyTasks from './components/MyTasks';
import PostTask from './components/PostTask';


// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  if (authLoading) return <Loading />;
  return user ? children : <Navigate to="/" />;
};

function AppContent() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      setIsAuthOpen(false);
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="app">
        <CursorFollower />
        <Navbar onOpenAuth={() => setIsAuthOpen(true)} />

        <Routes>
          <Route path="/" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : (
              <>
                <Hero />
                <ProblemSolution />
                <HowItWorks />
                <Features />
                <ImpactCTA />
              </>
            )
          } />

          <Route path="/tasks" element={
            <ProtectedRoute>
              <MyTasks />
            </ProtectedRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/find-work" element={
            <ProtectedRoute>
              <TaskBoard />
            </ProtectedRoute>
          } />

          <Route path="/portfolio" element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          } />

          <Route path="/payments" element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          } />

          <Route path="/find-talent" element={
            <ProtectedRoute>
              <FindTalent />
            </ProtectedRoute>
          } />

          <Route path="/learn" element={
            <ProtectedRoute>
              <Learning />
            </ProtectedRoute>
          } />

          <Route path="/network" element={
            <ProtectedRoute>
              <Network />
            </ProtectedRoute>
          } />

          <Route path="/post-task" element={
            <ProtectedRoute>
              <PostTask />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>

        <Footer />
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </div>
    </Router>
  );
}

import { TasksProvider } from './context/TasksContext';

function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <AppContent />
      </TasksProvider>
    </AuthProvider>
  );
}

export default App;
