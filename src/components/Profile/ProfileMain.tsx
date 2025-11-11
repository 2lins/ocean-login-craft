import React, { useState, useEffect, useRef } from 'react';
import { UserProfile } from '../../types/profile.types';
import { NavigatorProgressBar } from './NavigatorProgressBar';
import { BadgeShowcase } from './BadgeShowcase';
import { VisitHistory } from './VisitHistory';
import { AchievementGrid } from './AchievementGrid';

interface ProfileMainProps {
  profile: UserProfile;
}

export const ProfileMain: React.FC<ProfileMainProps> = ({ profile }) => {
  const [scrollY, setScrollY] = useState(0);
  const [showFixedProgress, setShowFixedProgress] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = containerRef.current.scrollTop;
      setScrollY(scrollTop);
      
      // Show fixed progress bar when original is out of view
      if (progressRef.current) {
        const progressRect = progressRef.current.getBoundingClientRect();
        setShowFixedProgress(progressRect.bottom < 0);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-orange-50"
    >
      {/* Fixed Progress Bar */}
      {showFixedProgress && (
        <NavigatorProgressBar profile={profile} isFixed={true} />
      )}

      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-600 overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/10 animate-pulse"></div>
          <div className="absolute top-20 right-20 w-24 h-24 rounded-full bg-white/10 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-40 h-40 rounded-full bg-white/10 animate-pulse delay-500"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
          <div className="flex items-end gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl border-4 border-white/30 shadow-xl">
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-white font-bold">
                    {profile.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-xs">⚓</span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">{profile.name}</h1>
              <p className="text-lg opacity-90 mb-2">
                {profile.currentLevel.name} • {profile.totalPoints} pontos
              </p>
              <p className="text-sm opacity-70">
                Navegador desde {profile.memberSince.toLocaleDateString('pt-PT', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>

            {/* Stats */}
            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-2xl font-bold">{profile.visitHistory.length}</p>
                <p className="text-sm opacity-80">Visitas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="p-6 space-y-8">
        {/* Progress Section */}
        <div ref={progressRef}>
          <NavigatorProgressBar profile={profile} />
        </div>

        {/* Badges Section */}
        <section 
          className="transform transition-all duration-700"
          style={{ 
            transform: `translateY(${Math.max(0, scrollY * 0.1 - 50)}px)`,
            opacity: Math.max(0, 1 - scrollY * 0.002)
          }}
        >
          <BadgeShowcase badges={profile.badges} />
        </section>

        {/* Achievements Section */}
        <section 
          className="transform transition-all duration-700"
          style={{ 
            transform: `translateY(${Math.max(0, scrollY * 0.15 - 100)}px)`,
            opacity: Math.max(0, 1 - scrollY * 0.001)
          }}
        >
          <AchievementGrid achievements={profile.achievements} />
        </section>

        {/* Visit History Section */}
        <section 
          className="transform transition-all duration-700"
          style={{ 
            transform: `translateY(${Math.max(0, scrollY * 0.2 - 150)}px)`,
            opacity: Math.max(0, 1 - scrollY * 0.0005)
          }}
        >
          <VisitHistory visits={profile.visitHistory.slice(0, 10)} />
        </section>

        {/* Settings Quick Access */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Configurações Rápidas</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <span className="text-xl">🔔</span>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Notificações</p>
                <p className="text-sm text-gray-600">Alertas de sunset e eventos</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <span className="text-xl">🍸</span>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Preferências</p>
                <p className="text-sm text-gray-600">Cocktails e sabores favoritos</p>
              </div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
