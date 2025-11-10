import { Wine, UtensilsCrossed, Cake } from "lucide-react";

export const CAROUSEL_CARDS = [{
  id: 1,
  title: "Sunset 2024",
  description: "onde o por do sol prestigiou milhoes de sorrisos neste verao",
  videoUrl: "/videos/sunset-2024.mp4"
}, {
  id: 2,
  title: "Noite dos Navegadores",
  description: "Evento exclusivo para membros",
  imageUrl: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=300&fit=crop"
}, {
  id: 3,
  title: "Nova Carta de Drinks",
  description: "Descubra nossos coquetéis artesanais",
  imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop"
}, {
  id: 4,
  title: "Missão Semanal",
  description: "Complete e ganhe pontos em dobro",
  imageUrl: "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=400&h=300&fit=crop"
}, {
  id: 5,
  title: "NOBLE EXPERIENCE",
  description: "Mixologia moderna em sua essência",
  videoUrl: "/videos/noble-experience.mp4",
  isLegendary: true
}];

export const NEWS_ITEMS = [
  {
    id: 1,
    title: "Happy Hour Premium",
    description: "De segunda a quinta, das 17h às 20h. Drinks selecionados com 30% de desconto.",
    category: 'promocao' as const,
    isHighlight: true
  },
  {
    id: 2,
    title: "Noite de Jazz",
    description: "Toda sexta-feira a partir das 21h. Música ao vivo com os melhores artistas.",
    category: 'evento' as const,
    isHighlight: true
  },
  {
    id: 3,
    title: "Novos Coquetéis de Autor",
    description: "Conheça nossa nova linha de drinks exclusivos criados pelo nosso mixologista.",
    category: 'cardapio' as const,
    isHighlight: false
  },
  {
    id: 4,
    title: "DJ Especial",
    description: "Sábados com música eletrônica e house music.",
    category: 'musica' as const,
    isHighlight: false
  },
  {
    id: 5,
    title: "Menu Executivo",
    description: "Almoço com entrada, prato principal e sobremesa.",
    category: 'cardapio' as const,
    isHighlight: false
  },
  {
    id: 6,
    title: "Festa Temática",
    description: "Último sábado do mês com tema especial e open bar.",
    category: 'evento' as const,
    isHighlight: false
  }
];

export const MENU_CATEGORIES = [
  {
    title: "Drinks",
    icon: Wine,
    description: "Coquetéis autorais e clássicos"
  },
  {
    title: "Pratos",
    icon: UtensilsCrossed,
    description: "Gastronomia contemporânea"
  },
  {
    title: "Sobremesas",
    icon: Cake,
    description: "Doces experiências"
  },
  {
    title: "Vinhos",
    icon: Wine,
    description: "Carta premium selecionada"
  }
];
