import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { Background3DScene } from './Background3DScene';

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
    <section className="relative w-full py-16 overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Background3DScene />
            <Environment preset="sunset" />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              enableRotate={false} 
            />
          </Suspense>
        </Canvas>
      </div>

      {/* News Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <h2 className="font-cinzel text-4xl font-bold text-center mb-12 text-primary">
          Novidades
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div
              key={item.id}
              className={`bg-card/90 backdrop-blur-sm rounded-lg p-6 border transition-all duration-300 hover:scale-105 ${
                item.isHighlight 
                  ? 'border-primary shadow-lg shadow-primary/20' 
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
      </div>
    </section>
  );
};
