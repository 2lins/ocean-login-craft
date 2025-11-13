import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import Ranking from "./pages/Ranking";
import HappyHours from "./pages/HappyHours";
import CocktailsHero from "./pages/CocktailsHero";
import CocktailsSelect from "./pages/CocktailsSelect";
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
        <Route path="/menu" element={<Menu />} />
        <Route path="/cocktails" element={<CocktailsSelect />} />
          
          <Route path="/cocktails-hero" element={<CocktailsHero />} />
          <Route path="/cocktails-mensais" element={<Navigate to="/cocktails-hero" replace />} />
          <Route path="/cocktails-gastronomicos" element={<Navigate to="/cocktails-hero" replace />} />
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
          
          
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNavigation3D />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>;
export default App;
