import { Boat3D, Cocktail3D, Bottle3D, SparkleParticles } from './3d-elements';

export const Background3DScene = () => {
  return (
    <>
      <SparkleParticles />
      <Boat3D position={[-6, 2, -5]} />
      <Boat3D position={[6, -1, -8]} />
      <Cocktail3D position={[-4, -2, 3]} color="#FF6B6B" />
      <Cocktail3D position={[5, 1, 2]} color="#4ECDC4" />
      <Bottle3D position={[0, 3, -6]} />
      <Bottle3D position={[-7, -3, 0]} />
    </>
  );
};
