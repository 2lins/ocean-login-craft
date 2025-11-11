import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Wine, Trophy, Users } from 'lucide-react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 75px;
  background: linear-gradient(180deg, hsl(20 35% 7% / 0.95) 0%, hsl(20 25% 12% / 0.98) 100%);
  backdrop-filter: blur(20px);
  border-top: 1px solid hsl(36 85% 62% / 0.2);
  box-shadow: 0 -10px 40px hsl(36 85% 62% / 0.1);
  z-index: 50;

  @media (min-width: 768px) {
    height: 85px;
  }
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 1rem;
  gap: 0.5rem;
`;

const NavItem = styled.button<{ $isActive: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  flex: 1;
  max-width: 120px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: ${props => props.$isActive ? 'hsl(36 85% 62%)' : 'hsl(36 30% 70%)'};

  &:hover {
    color: hsl(36 85% 62%);
    transform: translateY(-4px);
  }

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 50%;
    transform: translateX(-50%) scaleX(${props => props.$isActive ? '1' : '0'});
    width: 60%;
    height: 3px;
    background: linear-gradient(90deg, transparent, hsl(36 85% 62%), transparent);
    box-shadow: 0 0 12px hsl(36 85% 62% / 0.6);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::before {
    transform: translateX(-50%) scaleX(1);
  }

  @media (min-width: 768px) {
    padding: 1rem 1.25rem;
    gap: 0.5rem;
  }
`;

const IconWrapper = styled.div<{ $isActive: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  transform: ${props => props.$isActive ? 'scale(1.15)' : 'scale(1)'};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::after {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    background: radial-gradient(circle, hsl(36 85% 62% / 0.2), transparent 70%);
    opacity: ${props => props.$isActive ? '1' : '0'};
    transition: opacity 0.3s ease;
    animation: ${props => props.$isActive ? 'pulse 2s infinite' : 'none'};
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.2); opacity: 0; }
  }

  @media (min-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const NavLabel = styled.span<{ $isActive: boolean }>`
  font-family: 'Cinzel', serif;
  font-size: 0.7rem;
  font-weight: ${props => props.$isActive ? '600' : '400'};
  letter-spacing: 0.5px;
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    font-size: 0.8rem;
  }
`;

const BottomNavigation3D = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/menu', icon: Wine, label: 'Menu' },
    { path: '/ranking', icon: Trophy, label: 'Ranking' },
    { path: '/profile', icon: Users, label: 'Perfil' },
  ];

  // Don't show on app routes or index
  if (location.pathname.startsWith('/app') || location.pathname === '/') {
    return null;
  }

  return (
    <NavContainer>
      <NavContent>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <NavItem
              key={item.path}
              $isActive={isActive}
              onClick={() => navigate(item.path)}
              aria-label={item.label}
            >
              <IconWrapper $isActive={isActive}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </IconWrapper>
              <NavLabel $isActive={isActive}>{item.label}</NavLabel>
            </NavItem>
          );
        })}
      </NavContent>
    </NavContainer>
  );
};

export default BottomNavigation3D;
