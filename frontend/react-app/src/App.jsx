import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScamShieldModal from './components/ScamShieldModal';

// Route Pages
import HomePage from './pages/HomePage';
import WealthPilotPage from './pages/WealthPilotPage';
import SentinelPage from './pages/SentinelPage';
import ArchitecturePage from './pages/ArchitecturePage';
import PersonasPage from './pages/PersonasPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [isScamModalOpen, setIsScamModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-100 bg-[#070B12]">
      {/* Auto scroll to top on route change */}
      <ScrollToTop />

      {/* Global Navigation */}
      <Navbar />

      {/* Dynamic Viewport Container via React Router */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={<HomePage onOpenScamModal={() => setIsScamModalOpen(true)} />}
          />
          <Route
            path="/wealthpilot"
            element={<WealthPilotPage />}
          />
          <Route
            path="/sentinel"
            element={<SentinelPage onOpenScamModal={() => setIsScamModalOpen(true)} />}
          />
          <Route
            path="/architecture"
            element={<ArchitecturePage />}
          />
          <Route
            path="/personas"
            element={<PersonasPage />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Global Scam Shield Modal */}
      <ScamShieldModal
        isOpen={isScamModalOpen}
        onClose={() => setIsScamModalOpen(false)}
      />
    </div>
  );
}
