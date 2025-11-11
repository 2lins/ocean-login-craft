import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
interface VideoHeroProps {
  videoSrc: string;
  events: Array<{
    title: string;
    date: string;
    highlight: string;
  }>;
}
export const VideoHero: React.FC<VideoHeroProps> = ({
  videoSrc,
  events
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex(prev => (prev + 1) % events.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [events.length]);
  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    setTimeout(() => setShowOverlay(false), 2000);
  };
  const navigateToCalendar = () => {
    navigate('/calendario');
  };
  return <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline onLoadedData={handleVideoLoad}>
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Video Loading Overlay */}
      {!isVideoLoaded && <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-orange-900 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-medium">Preparando experiência...</p>
          </div>
        </div>}

      {/* Dynamic Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-1000 ${showOverlay ? 'opacity-100' : 'opacity-70'}`}></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({
        length: 20
      }, (_, i) => <div key={i} className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${3 + Math.random() * 2}s`
      }}></div>)}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Top Navigation Info */}
        <div className="flex-1 flex flex-col justify-center items-center text-white px-6">
          <div className="text-center max-w-4xl mt-16 md:mt-20">
            {/* Brand Animation */}
            <div className="mb-8 transform animate-fade-in-up">
              <div className="inline-block bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20">
                
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 transform animate-fade-in-up delay-300">
              <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                HAPPY
              </span>
              <br />
              <span className="text-white">HOURS</span>
            </h1>

            {/* Dynamic Event Info */}
            <div className="relative h-24 mb-8 overflow-hidden">
              {events.map((event, index) => <div key={index} className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${index === currentEventIndex ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
                  <p className="text-2xl md:text-3xl font-semibold mb-2">{event.title}</p>
                  <p className="text-lg text-orange-300">{event.date} • {event.highlight}</p>
                </div>)}
            </div>

            {/* Event Indicators */}
            <div className="flex justify-center space-x-2 mb-12">
              {events.map((_, index) => <button key={index} onClick={() => setCurrentEventIndex(index)} className={`w-3 h-3 rounded-full transition-all duration-500 ${index === currentEventIndex ? 'bg-orange-400 scale-150' : 'bg-white/30 hover:bg-white/50'}`}></button>)}
            </div>
          </div>
        </div>

        {/* Bottom Calendar Button */}
        <div className="flex-shrink-0 pb-20 px-6">
          <div className="flex justify-center">
            <button onClick={navigateToCalendar} className="group relative bg-white/10 backdrop-blur-lg border-2 border-white/30 rounded-xl px-5 py-2.5 md:px-6 md:py-3 text-white font-bold text-sm md:text-base transition-all duration-500 hover:bg-white/20 hover:border-white/50 hover:scale-110">
              {/* Button Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Button Content */}
              <div className="relative flex items-center space-x-2 md:space-x-3">
                <div className="w-6 h-6 md:w-7 md:h-7 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-base md:text-lg">📅</span>
                </div>
                <span>Ver Calendário</span>
                <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-current rounded-full flex items-center justify-center transform group-hover:rotate-180 transition-transform duration-500">
                  <span className="text-xs md:text-sm">→</span>
                </div>
              </div>

              {/* Pulse Effect */}
              <div className="absolute inset-0 rounded-xl animate-ping bg-white/20 group-hover:animate-none"></div>
            </button>
          </div>
        </div>
      </div>

    </div>;
};