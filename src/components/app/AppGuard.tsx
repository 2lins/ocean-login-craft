import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AppGuardProps {
  children: ReactNode;
}

export const AppGuard = ({ children }: AppGuardProps) => {
  const hasSession = localStorage.getItem('session') !== null;
  
  if (!hasSession) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};
