export interface HappyHourSlide {
  id: string;
  type: 'video' | 'image';
  media: string;
  title: string;
  description: string;
  price?: string;
  detailsUrl: string;
}

export interface HappyHourHeroProps {
  slides: HappyHourSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onSaibaMais?: (slide: HappyHourSlide) => void;
}
