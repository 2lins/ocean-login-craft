export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  memberSince: Date;
  totalPoints: number;
  currentLevel: NavigatorLevel;
  nextLevel: NavigatorLevel;
  badges: Badge[];
  visitHistory: Visit[];
  favoriteSpots: string[];
  preferences: UserPreferences;
  achievements: Achievement[];
}

export interface NavigatorLevel {
  id: string;
  name: 'Marinheiro' | 'Capitão' | 'Almirante' | 'Grande Navegador';
  icon: string;
  minPoints: number;
  maxPoints: number;
  color: string;
  benefits: string[];
  exclusiveEvents: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  category: 'visits' | 'cocktails' | 'events' | 'social' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Visit {
  id: string;
  date: Date;
  pointsEarned: number;
  cocktailsOrdered: string[];
  eventAttended?: string;
  duration: number;
  rating?: number;
  notes?: string;
}

export interface UserPreferences {
  favoriteSpirits: string[];
  flavorProfile: string[];
  preferredTimes: string[];
  communicationSettings: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    sunsetAlerts: boolean;
    eventInvitations: boolean;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  target: number;
  reward: string;
  isCompleted: boolean;
  unlockedAt?: Date;
}
