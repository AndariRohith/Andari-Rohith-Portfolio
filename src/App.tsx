import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useData } from './context/DataContext';
import { StartGate } from './components/gate/StartGate';
import { LoadingScreen } from './components/common/LoadingScreen';
import { CustomCursor } from './components/common/CustomCursor';
import { ScrollProgress } from './components/common/ScrollProgress';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast, type ToastMessage } from './components/common/Toast';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { EducationSection } from './components/sections/EducationSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { ContactSection } from './components/sections/ContactSection';
import { AdminToolbar } from './components/admin/AdminToolbar';
import { AdminModal } from './components/admin/AdminModal';

export const App: React.FC = () => {
  const { mode, isAdmin } = useAuth();
  const { settings, isLoading } = useData();
  const [showIntroLoading, setShowIntroLoading] = useState(true);
  const [adminModalState, setAdminModalState] = useState<{ isOpen: boolean; tab: string; item?: any }>({
    isOpen: false,
    tab: 'projects',
    item: undefined
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, text, type }]);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleOpenAdminModal = (tab = 'projects', item?: any) => {
    setAdminModalState({ isOpen: true, tab, item });
  };

  if (showIntroLoading) {
    return <LoadingScreen onComplete={() => setShowIntroLoading(false)} />;
  }

  // START GATE SCREEN
  if (mode === 'gate') {
    return <StartGate />;
  }

  const sections = settings?.sections || {
    about: true,
    skills: true,
    projects: true,
    experience: true,
    education: true,
    certifications: true,
    contact: true
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#F8FAFC] to-[#EFF6FF] dark:from-[#0A0D14] dark:via-[#111827] dark:to-[#0A1120] text-[#0F172A] dark:text-[#F8FAFC] selection:bg-indigo-500 selection:text-white transition-colors duration-500 overflow-x-hidden">
      {/* Global Background Ambient 3D Glow Orbs */}
      <div className="fixed top-20 left-10 w-[500px] h-[500px] bg-indigo-500/15 dark:bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulseGlow" />
      <div className="fixed bottom-20 right-10 w-[500px] h-[500px] bg-cyan-400/15 dark:bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulseGlow" style={{ animationDelay: '3s' }} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Scroll indicator bar */}
      <ScrollProgress />

      {/* Desktop magnetic custom cursor */}
      <CustomCursor />

      {/* Sticky navigation bar */}
      <Navbar onOpenAdminModal={handleOpenAdminModal} />

      {/* Main portfolio content */}
      <main className="relative">
        <HeroSection onOpenAdminModal={handleOpenAdminModal} />
        {sections.about && <AboutSection onOpenAdminModal={handleOpenAdminModal} />}
        {sections.skills && <SkillsSection onOpenAdminModal={handleOpenAdminModal} />}
        {sections.projects && <ProjectsSection onOpenAdminModal={handleOpenAdminModal} />}
        {sections.experience && <ExperienceSection onOpenAdminModal={handleOpenAdminModal} />}
        {sections.education && <EducationSection onOpenAdminModal={handleOpenAdminModal} />}
        {sections.certifications && <CertificationsSection onOpenAdminModal={handleOpenAdminModal} />}
        {sections.contact && <ContactSection onShowToast={showToast} />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Admin Floating Control Dock */}
      {isAdmin && <AdminToolbar onOpenModal={handleOpenAdminModal} />}

      {/* Admin Management Modal */}
      <AdminModal
        isOpen={adminModalState.isOpen}
        initialTab={adminModalState.tab}
        initialItem={adminModalState.item}
        onClose={() => setAdminModalState(prev => ({ ...prev, isOpen: false }))}
        onShowToast={showToast}
      />

      {/* Toast notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};

export default App;
