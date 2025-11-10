interface NewsItem {
  id: number;
  title: string;
  description: string;
  category: 'promocao' | 'evento' | 'cardapio' | 'musica';
  isHighlight: boolean;
}

interface NewsSection3DProps {
  news: NewsItem[];
}

export const NewsSection3D = ({ news }: NewsSection3DProps) => {
  const categoryLabels = {
    promocao: 'Promoção',
    evento: 'Evento',
    cardapio: 'Cardápio',
    musica: 'Música'
  };

  const categoryColors = {
    promocao: 'bg-primary',
    evento: 'bg-red-500',
    cardapio: 'bg-cyan-500',
    musica: 'bg-purple-500'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item) => (
        <div
          key={item.id}
          className={`bg-card/95 rounded-lg p-6 border transition-transform duration-300 hover:translate-y-[-4px] ${
            item.isHighlight 
              ? 'border-primary shadow-[0_0_10px_rgba(242,228,200,0.15)]' 
              : 'border-border'
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs px-3 py-1 rounded-full text-white ${categoryColors[item.category]}`}>
              {categoryLabels[item.category]}
            </span>
            {item.isHighlight && (
              <span className="text-xs px-3 py-1 rounded-full bg-primary text-primary-foreground">
                Destaque
              </span>
            )}
          </div>
          <h3 className="font-cinzel text-xl font-bold mb-2 text-foreground">
            {item.title}
          </h3>
          <p className="text-muted-foreground text-sm">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};
