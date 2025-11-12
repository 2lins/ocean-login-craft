import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import Ranking from "./pages/Ranking";
import HappyHours from "./pages/HappyHours";
import Cocktails from "./pages/Cocktails";
import Cocktails3D from "./pages/Cocktails3D";
import CocktailsHero from "./pages/CocktailsHero";
import NotFound from "./pages/NotFound";
import { AppGuard } from "./components/app/AppGuard";
import AppInicio from "./pages/app/AppInicio";
import AppCardapio from "./pages/app/AppCardapio";
import AppCheckout from "./pages/app/AppCheckout";
import AppStatus from "./pages/app/AppStatus";
import AppPedidos from "./pages/app/AppPedidos";
import AppConta from "./pages/app/AppConta";
import AppScan from "./pages/app/AppScan";
import BottomNavigation3D from "./components/navigation/BottomNavigation3D";
const queryClient = new QueryClient();
const App = () => <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cocktails" element={<Cocktails3D />} />
          <Route path="/cocktails-hero" element={<CocktailsHero />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ranking" element={<Ranking />} />
          
          
          {/* App routes (authenticated) */}
          <Route path="/app" element={<AppGuard><AppInicio /></AppGuard>} />
          <Route path="/app/cardapio" element={<AppGuard><AppCardapio /></AppGuard>} />
          <Route path="/app/checkout" element={<AppGuard><AppCheckout /></AppGuard>} />
          <Route path="/app/status/:orderId" element={<AppGuard><AppStatus /></AppGuard>} />
          <Route path="/app/pedidos" element={<AppGuard><AppPedidos /></AppGuard>} />
          <Route path="/app/conta" element={<AppGuard><AppConta /></AppGuard>} />
          <Route path="/app/scan" element={<AppGuard><AppScan /></AppGuard>} />
          <Route path="/happy-hours" element={<HappyHours />} />
          
          {/* Legacy redirects from /login/* to /app/* for compatibility */}
          <Route path="/login/pedidos" element={<Navigate to="/app/pedidos" replace />} />
          <Route path="/login/checkout" element={<Navigate to="/app/checkout" replace />} />
          <Route path="/login/status/:orderId" element={<Navigate to="/app/status/:orderId" replace />} />
          <Route path="/login/cardapio" element={<Navigate to="/app/cardapio" replace />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNavigation3D />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>;
export default App;