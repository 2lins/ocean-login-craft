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

export const IntelligentReservation: React.FC<IntelligentReservationProps> = ({ onReservationComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [animationPhase, setAnimationPhase] = useState('idle');
  const [userPoints, setUserPoints] = useState(0);

  const [reservationSteps, setReservationSteps] = useState<ReservationStep[]>([
    {
      id: 'timing',
      title: 'Horário Perfeito',
      description: 'Encontre o momento ideal para sua experiência',
      icon: '🕐',
      isCompleted: false,
      isActive: true,
      points: 25,
      bonus: 'Sunset Premium +10 pts'
    },
    {
      id: 'experience',
      title: 'Experiência Personalizada',
      description: 'Configure sua experiência única no Cais Nobre',
      icon: '🍸',
      isCompleted: false,
      isActive: false,
      points: 30,
      bonus: 'Cocktail exclusivo +15 pts'
    },
    {
      id: 'confirmation',
      title: 'Confirmação Épica',
      description: 'Finalize sua reserva e ganhe recompensas',
      icon: '🎯',
      isCompleted: false,
      isActive: false,
      points: 50,
      bonus: 'Reserva confirmada +20 pts'
    }
  ]);

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

  const experiences = [
    {
      id: 'sunset_cocktails',
      name: 'Sunset Premium',
      description: 'Cocktails exclusivos com vista para o pôr do sol',
      price: 45,
      points: 35,
      icon: '🌅'
    },
    {
      id: 'mixology_masterclass',
      name: 'Masterclass Mixologia',
      description: 'Aprenda com nossos mixologistas especialistas',
      price: 75,
      points: 60,
      icon: '🥃'
    },
    {
      id: 'dj_experience',
      name: 'DJ Experience',
      description: 'Noite especial com DJ e cocktails únicos',
      price: 35,
      points: 40,
      icon: '🎧'
    }
  ];

  const timeSlots = [
    { time: '17:00', label: 'Golden Hour', multiplier: 1.2, available: 8 },
    { time: '18:30', label: 'Sunset Premium', multiplier: 1.5, available: 5 },
    { time: '20:00', label: 'Night Vibes', multiplier: 1.0, available: 12 },
    { time: '21:30', label: 'Late Night', multiplier: 1.1, available: 15 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-16">
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
            {reservationSteps.map((step, index) => (
              <div key={step.id} className="relative flex-1">
                {/* Connection Line */}
                {index < reservationSteps.length - 1 && (
                  <div className="absolute top-1/2 left-full w-full h-1 bg-gray-700 transform -translate-y-1/2 z-0">
                    <div 
                      className={`h-full bg-gradient-to-r from-orange-500 to-pink-600 transition-all duration-1000 ${
                        step.isCompleted ? 'w-full' : 'w-0'
                      }`}
                    ></div>
                  </div>
                )}
                
                {/* Step Circle */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center text-2xl font-bold transition-all duration-500 ${
                    step.isCompleted 
                      ? 'bg-gradient-to-br from-green-400 to-green-600 border-green-400 text-white scale-110' 
                      : step.isActive
                        ? 'bg-gradient-to-br from-orange-500 to-pink-600 border-orange-400 text-white animate-pulse scale-105'
                        : 'bg-gray-800 border-gray-600 text-gray-400'
                  }`}>
                    {step.isCompleted ? '✓' : step.icon}
                  </div>
                  
                  <h3 className={`mt-4 font-bold text-lg transition-colors duration-300 ${
                    step.isActive || step.isCompleted ? 'text-white' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </h3>
                  
                  <p className={`text-sm text-center max-w-xs transition-colors duration-300 ${
                    step.isActive || step.isCompleted ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {step.description}
                  </p>

                  {/* Points Badge */}
                  <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                    step.isCompleted
                      ? 'bg-green-500 text-white'
                      : step.isActive
                        ? 'bg-orange-500 text-white animate-bounce'
                        : 'bg-gray-700 text-gray-400'
                  }`}>
                    +{step.points} pts
                  </div>
                  
                  {step.bonus && step.isActive && (
                    <div className="mt-1 text-xs text-orange-300 animate-pulse">
                      🎁 {step.bonus}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
          {/* Step 1: Timing */}
          {currentStep === 0 && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white mb-6">🕐 Escolha o Horário Perfeito</h3>
              
              {/* Date Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-3">Data da Experiência</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:border-orange-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-3">Número de Pessoas</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-orange-400 focus:outline-none"
                  >
                    {Array.from({length: 8}, (_, i) => (
                      <option key={i+1} value={i+1} className="bg-gray-900">
                        {i+1} {i+1 === 1 ? 'pessoa' : 'pessoas'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-white font-medium mb-4">Horário (Multiplique seus pontos!)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => setFormData({...formData, time: slot.time})}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        formData.time === slot.time
                          ? 'border-orange-400 bg-orange-500/20'
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <div className="text-white font-bold text-lg">{slot.time}</div>
                      <div className="text-sm text-orange-300 font-medium">{slot.label}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {slot.available} lugares
                      </div>
                      <div className="text-xs text-green-400 font-bold mt-1">
                        x{slot.multiplier} pontos
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {formData.date && formData.time && (
                <button
                  onClick={() => completeStep(0)}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                >
                  Confirmar Horário (+{reservationSteps[0].points} pontos)
                </button>
              )}
            </div>
          )}

          {/* Step 2: Experience */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white mb-6">🍸 Personalize Sua Experiência</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {experiences.map((exp) => (
                  <button
                    key={exp.id}
                    onClick={() => setFormData({...formData, experience: exp.id})}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      formData.experience === exp.id
                        ? 'border-orange-400 bg-orange-500/20'
                        : 'border-white/20 bg-white/5 hover:border-white/40'
                    }`}
                  >
                    <div className="text-3xl mb-3">{exp.icon}</div>
                    <h4 className="text-white font-bold text-lg mb-2">{exp.name}</h4>
                    <p className="text-gray-300 text-sm mb-4">{exp.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-orange-400 font-bold">€{exp.price}</span>
                      <span className="text-green-400 text-sm font-bold">+{exp.points} pts</span>
                    </div>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-white font-medium mb-3">Pedidos Especiais (Opcional)</label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                  placeholder="Celebração especial, preferências alimentares, cocktails favoritos..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:border-orange-400 focus:outline-none h-24 resize-none"
                />
              </div>

              <button
                onClick={() => completeStep(1)}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
              >
                Personalizar Experiência (+{reservationSteps[1].points} pontos)
              </button>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white mb-6">🎯 Finalize Sua Reserva</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-3">Nome Completo</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Seu nome"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:border-orange-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-3">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="seu@email.com"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:border-orange-400 focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-white font-medium mb-3">Telefone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+351 ..."
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:border-orange-400 focus:outline-none"
                  />
                </div>
              </div>

              {formData.name && formData.email && formData.phone && (
                <button
                  onClick={() => {
                    completeStep(2);
                    onReservationComplete(formData);
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                >
                  Confirmar Reserva (+{reservationSteps[2].points} pontos)
                </button>
              )}
            </div>
          )}

          {/* Completion Message */}
          {currentStep === 3 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-6 animate-bounce">🎉</div>
              <h3 className="text-3xl font-bold text-white mb-4">Reserva Confirmada!</h3>
              <p className="text-xl text-gray-300 mb-6">
                Parabéns! Você conquistou {userPoints} pontos!
              </p>
              <div className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-2xl p-6 max-w-md mx-auto">
                <p className="text-white font-bold text-lg">
                  Aguarde a confirmação por email
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
