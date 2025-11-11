export interface SunsetData {
  id: string;
  date: Date;
  sunsetTime: string;
  sunriseTime: string;
  quality: 'spectacular' | 'premium' | 'good' | 'average';
  weatherCondition: string;
  temperature: number;
  visibility: number;
  cloudCover: number;
  recommendation: string;
}

export interface HappyHourEvent {
  id: string;
  title: string;
  subtitle: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: 'sunset_session' | 'dj_night' | 'mixology_experience' | 'live_music';
  capacity: number;
  currentBookings: number;
  price: number;
  discountPercentage?: number;
  description: string;
  videoUrl: string;
  thumbnail: string;
  specialOffer: string;
  cocktailPairing: string[];
  djName?: string;
  weatherDependent: boolean;
}
