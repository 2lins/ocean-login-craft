import React, { useState } from 'react';
interface ReservationStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  isCompleted: boolean;
  isActive: boolean;
  points: number;
  bonus?: string;
}
interface IntelligentReservationProps {
  onReservationComplete: (data: any) => void;
}
export const IntelligentReservation: React.FC<IntelligentReservationProps> = ({
  onReservationComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [animationPhase, setAnimationPhase] = useState('idle');
  const [userPoints, setUserPoints] = useState(0);
  const [reservationSteps, setReservationSteps] = useState<ReservationStep[]>([{
    id: 'timing',
    title: 'Horário Perfeito',
    description: 'Encontre o momento ideal para sua experiência',
    icon: '🕐',
    isCompleted: false,
    isActive: true,
    points: 25,
    bonus: 'Sunset Premium +10 pts'
  }, {
    id: 'experience',
    title: 'Experiência Personalizada',
    description: 'Configure sua experiência única no Cais Nobre',
    icon: '🍸',
    isCompleted: false,
    isActive: false,
    points: 30,
    bonus: 'Cocktail exclusivo +15 pts'
  }, {
    id: 'confirmation',
    title: 'Confirmação Épica',
    description: 'Finalize sua reserva e ganhe recompensas',
    icon: '🎯',
    isCompleted: false,
    isActive: false,
    points: 50,
    bonus: 'Reserva confirmada +20 pts'
  }]);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    experience: 'sunset_cocktails',
    specialRequests: '',
    name: '',
    email: '',
    phone: ''
  });
  const completeStep = (stepIndex: number) => {
    setAnimationPhase('completing');
    setTimeout(() => {
      setReservationSteps(prev => prev.map((step, index) => ({
        ...step,
        isCompleted: index === stepIndex,
        isActive: index === stepIndex + 1
      })));
      setUserPoints(prev => prev + reservationSteps[stepIndex].points);
      setCurrentStep(stepIndex + 1);
      setAnimationPhase('completed');
    }, 1000);
    setTimeout(() => {
      setAnimationPhase('idle');
    }, 2000);
  };
  const experiences = [{
    id: 'sunset_cocktails',
    name: 'Sunset Premium',
    description: 'Cocktails exclusivos com vista para o pôr do sol',
    price: 45,
    points: 35,
    icon: '🌅'
  }, {
    id: 'mixology_masterclass',
    name: 'Masterclass Mixologia',
    description: 'Aprenda com nossos mixologistas especialistas',
    price: 75,
    points: 60,
    icon: '🥃'
  }, {
    id: 'dj_experience',
    name: 'DJ Experience',
    description: 'Noite especial com DJ e cocktails únicos',
    price: 35,
    points: 40,
    icon: '🎧'
  }];
  const timeSlots = [{
    time: '17:00',
    label: 'Golden Hour',
    multiplier: 1.2,
    available: 8
  }, {
    time: '18:30',
    label: 'Sunset Premium',
    multiplier: 1.5,
    available: 5
  }, {
    time: '20:00',
    label: 'Night Vibes',
    multiplier: 1.0,
    available: 12
  }, {
    time: '21:30',
    label: 'Late Night',
    multiplier: 1.1,
    available: 15
  }];
  return <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Reserva <span className="bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">Inteligente</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Sistema gamificado que adapta sua experiência e recompensa cada etapa
          </p>
          
          {/* Points Display */}
          <div className="inline-block bg-gradient-to-r from-orange-500 to-pink-600 rounded-full px-6 py-3">
            <span className="text-white font-bold text-lg">
              ⭐ {userPoints} Pontos Conquistados
            </span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="relative mb-16">
          <div className="flex justify-between items-center">
            {reservationSteps.map((step, index) => <div key={step.id} className="relative flex-1">
                {/* Connection Line */}
                {index < reservationSteps.length - 1 && <div className="absolute top-1/2 left-full w-full h-1 bg-gray-700 transform -translate-y-1/2 z-0">
                    <div className={`h-full bg-gradient-to-r from-orange-500 to-pink-600 transition-all duration-1000 ${step.isCompleted ? 'w-full' : 'w-0'}`}></div>
                  </div>}
                
                {/* Step Circle */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center text-2xl font-bold transition-all duration-500 ${step.isCompleted ? 'bg-gradient-to-br from-green-400 to-green-600 border-green-400 text-white scale-110' : step.isActive ? 'bg-gradient-to-br from-orange-500 to-pink-600 border-orange-400 text-white animate-pulse scale-105' : 'bg-gray-800 border-gray-600 text-gray-400'}`}>
                    {step.isCompleted ? '✓' : step.icon}
                  </div>
                  
                  <h3 className={`mt-4 font-bold text-lg transition-colors duration-300 ${step.isActive || step.isCompleted ? 'text-white' : 'text-gray-500'}`}>
                    {step.title}
                  </h3>
                  
                  <p className={`text-sm text-center max-w-xs transition-colors duration-300 ${step.isActive || step.isCompleted ? 'text-gray-300' : 'text-gray-600'}`}>
                    {step.description}
                  </p>

                  {/* Points Badge */}
                  <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${step.isCompleted ? 'bg-green-500 text-white' : step.isActive ? 'bg-orange-500 text-white animate-bounce' : 'bg-gray-700 text-gray-400'}`}>
                    +{step.points} pts
                  </div>
                  
                  {step.bonus && step.isActive && <div className="mt-1 text-xs text-orange-300 animate-pulse">
                      🎁 {step.bonus}
                    </div>}
                </div>
              </div>)}
          </div>
        </div>

        {/* Step Content */}
        
      </div>
    </div>;
};