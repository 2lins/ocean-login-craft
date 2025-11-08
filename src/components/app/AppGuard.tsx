import { ReactNode, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

interface AppGuardProps {
  children: ReactNode;
}

export const AppGuard = ({ children }: AppGuardProps) => {
  const hasSession = localStorage.getItem('session') !== null;
  const location = useLocation();
  const navigate = useNavigate();
  
  // Redirecionar usuários logados que tentam acessar /login
  useEffect(() => {
    if (hasSession && location.pathname === '/') {
      navigate('/app', { replace: true });
    }
  }, [hasSession, location, navigate]);
  
  if (!hasSession) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};
