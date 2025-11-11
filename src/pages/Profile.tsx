import React from 'react';
import { ProfileMain } from '../components/Profile/ProfileMain';
import { UserProfile } from '../types/profile.types';

const Profile = () => {
  // Mock profile data
  const mockProfile: UserProfile = {
    id: '1',
    name: 'Capitão Henrique',
    email: 'henrique@navegador.pt',
    phone: '+351 912 345 678',
    memberSince: new Date('2024-01-15'),
    totalPoints: 2850,
    currentLevel: {
      id: 'capitao',
      name: 'Capitão',
      icon: '🚢',
      minPoints: 2000,
      maxPoints: 5000,
      color: 'green',
      benefits: ['10% desconto em cocktails', 'Acesso prioritário a eventos', 'Mesa reservada nos sunsets'],
      exclusiveEvents: ['Mixology Masterclass', 'Sunset VIP Sessions']
    },
    nextLevel: {
      id: 'almirante',
      name: 'Almirante',
      icon: '👑',
      minPoints: 5000,
      maxPoints: 10000,
      color: 'purple',
      benefits: ['20% desconto', 'Eventos exclusivos', 'Cocktails personalizados'],
      exclusiveEvents: ['Almirante Gala', 'Private Tasting Events']
    },
    badges: [
      {
        id: 'first_visit',
        name: 'Primeira Navegação',
        description: 'Completou sua primeira visita ao Cais Nobre',
        icon: '⚓',
        earnedAt: new Date('2024-01-15'),
        category: 'visits',
        rarity: 'common'
      },
      {
        id: 'sunset_lover',
        name: 'Amante do Sunset',
        description: 'Assistiu a 10 sunsets no Cais Nobre',
        icon: '🌅',
        earnedAt: new Date('2024-03-20'),
        category: 'events',
        rarity: 'rare'
      },
      {
        id: 'cocktail_master',
        name: 'Mestre dos Cocktails',
        description: 'Experimentou 25 cocktails diferentes',
        icon: '🍸',
        earnedAt: new Date('2024-05-10'),
        category: 'cocktails',
        rarity: 'epic'
      },
      {
        id: 'social_butterfly',
        name: 'Navegador Social',
        description: 'Trouxe 5 amigos novos',
        icon: '👥',
        earnedAt: new Date('2024-06-15'),
        category: 'social',
        rarity: 'rare'
      }
    ],
    visitHistory: [
      {
        id: 'v1',
        date: new Date('2024-11-08'),
        pointsEarned: 150,
        cocktailsOrdered: ['Nau dos Descobrimentos', 'Porto Sunset', 'Caravela Dourada'],
        eventAttended: 'DJ Sunset Session',
        duration: 180,
        rating: 5,
        notes: 'Excelente experiência!'
      },
      {
        id: 'v2',
        date: new Date('2024-11-01'),
        pointsEarned: 120,
        cocktailsOrdered: ['Magellan\'s Journey', 'Infante Henrique'],
        duration: 150,
        rating: 5
      },
      {
        id: 'v3',
        date: new Date('2024-10-25'),
        pointsEarned: 200,
        cocktailsOrdered: ['Porto Tonic', 'Descobrimento Especial', 'Nau dos Descobrimentos'],
        eventAttended: 'Mixology Experience',
        duration: 240,
        rating: 5
      }
    ],
    favoriteSpots: ['Mesa do Sunset', 'Bar Principal', 'Terraço VIP'],
    preferences: {
      favoriteSpirits: ['Gin', 'Vodka', 'Rum'],
      flavorProfile: ['Cítrico', 'Aromático', 'Refrescante'],
      preferredTimes: ['Sunset', 'Noite'],
      communicationSettings: {
        emailNotifications: true,
        pushNotifications: true,
        sunsetAlerts: true,
        eventInvitations: true
      }
    },
    achievements: [
      {
        id: 'a1',
        title: 'Navegador Frequente',
        description: 'Visite o Cais Nobre 20 vezes',
        icon: '🚢',
        progress: 15,
        target: 20,
        reward: '500 pontos + Badge especial',
        isCompleted: false
      },
      {
        id: 'a2',
        title: 'Explorador de Sabores',
        description: 'Experimente todos os cocktails da carta',
        icon: '🗺️',
        progress: 42,
        target: 50,
        reward: 'Cocktail personalizado grátis',
        isCompleted: false
      },
      {
        id: 'a3',
        title: 'Colecionador de Sunsets',
        description: 'Assista a 25 sunsets',
        icon: '🌅',
        progress: 25,
        target: 25,
        reward: 'Acesso VIP permanente aos sunsets',
        isCompleted: true,
        unlockedAt: new Date('2024-10-20')
      }
    ]
  };

  return <ProfileMain profile={mockProfile} />;
};

export default Profile;
