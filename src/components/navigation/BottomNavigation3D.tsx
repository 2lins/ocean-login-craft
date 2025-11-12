import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';

// Animações 3D
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotateX(0deg); }
  50% { transform: translateY(-3px) rotateX(5deg); }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.3); }
  50% { box-shadow: 0 0 30px rgba(255, 215, 0, 0.6); }
`;

const slideUp = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Container principal
const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 85px;
  background: linear-gradient(135deg, 
    rgba(20, 20, 30, 0.95) 0%,
    rgba(30, 30, 45, 0.98) 50%,
    rgba(15, 15, 25, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 215, 0, 0.2);
  z-index: 9999;
  animation: ${slideUp} 0.6s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%,
      rgba(255, 215, 0, 0.5) 50%,
      transparent 100%
    );
  }

  @media (max-width: 768px) {
    height: 75px;
  }
`;

// Container dos itens
const NavContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  max-width: 500px;
  margin: 0 auto;
  perspective: 1000px;
`;

// Item individual
const NavItem = styled.button<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  position: relative;
  min-width: 60px;
  
  ${props => props.$isActive && css`
    animation: ${floatAnimation} 2s ease-in-out infinite;
    background: linear-gradient(135deg, 
      rgba(255, 215, 0, 0.1) 0%,
      rgba(255, 215, 0, 0.05) 100%
    );
    border: 1px solid rgba(255, 215, 0, 0.3);
    animation: ${glowPulse} 2s ease-in-out infinite;
  `}
  
  &:hover {
    transform: translateY(-5px) rotateX(10deg) scale(1.05);
    background: linear-gradient(135deg, 
      rgba(255, 215, 0, 0.15) 0%,
      rgba(255, 215, 0, 0.08) 100%
    );
  }
  
  &:active {
    transform: translateY(-2px) scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 6px 8px;
    min-width: 50px;
  }
`;

// Ícone 3D
const IconContainer = styled.div<{ $isActive: boolean }>`
  width: 28px;
  height: 28px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
  transition: all 0.3s ease;
  
  svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    transition: all 0.3s ease;
    color: ${props => props.$isActive ? '#FFD700' : '#FFFFFF'};
  }
  
  ${props => props.$isActive && css`
    svg {
      filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6));
    }
  `}

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
  }
`;

// Texto do item
const NavLabel = styled.span<{ $isActive: boolean }>`
  font-size: 10px;
  font-weight: 600;
  color: ${props => props.$isActive ? '#FFD700' : '#FFFFFF'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  text-shadow: ${props => props.$isActive ? '0 0 8px rgba(255, 215, 0, 0.5)' : 'none'};
  font-family: 'Cinzel', serif;

  @media (max-width: 768px) {
    font-size: 9px;
  }
`;

// Indicador ativo
const ActiveIndicator = styled.div<{ $isActive: boolean }>`
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: ${props => props.$isActive ? '30px' : '0px'};
  height: 2px;
  background: linear-gradient(90deg, #FFD700, #FFA500);
  border-radius: 2px;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`;

// Ícones SVG customizados
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const WineIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.5 7L5.5 5H18.5L16.5 7M12 2L10 4H14L12 2M11 9V20H13V9M9 9V11H15V9M7 13H17V15H7V13Z"/>
  </svg>
);

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 4V2H8V4H5V6H19V4H16M12 7L10 12H14L12 7M5 8V22H19V8H5M7 10H17V20H7V10Z"/>
  </svg>
);

const ProfileIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
  </svg>
);

const BottomNavigation3D = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: '/happy-hours', icon: HomeIcon, label: 'happy hours' },
    { path: '/cocktails-hero', icon: WineIcon, label: 'cocktais' },
    { path: '/profile', icon: TrophyIcon, label: 'conta' },
    { path: '/menu', icon: ProfileIcon, label: 'menu' },
  ];

  // Don't show on app routes or index
  if (location.pathname.startsWith('/app') || location.pathname === '/') {
    return null;
  }

  return (
    <NavContainer>
      <NavContent>
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <NavItem
              key={item.path}
              $isActive={isActive}
              onClick={() => navigate(item.path)}
              aria-label={item.label}
            >
              <IconContainer $isActive={isActive}>
                <IconComponent />
              </IconContainer>
              <NavLabel $isActive={isActive}>
                {item.label}
              </NavLabel>
              <ActiveIndicator $isActive={isActive} />
            </NavItem>
          );
        })}
      </NavContent>
    </NavContainer>
  );
};

export default BottomNavigation3D;
