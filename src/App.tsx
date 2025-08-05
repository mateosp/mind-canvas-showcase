import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Artists from "./pages/sections/Artists";
import Museums from "./pages/sections/Museums";
import Events from "./pages/sections/Events";
import Opinion from "./pages/sections/Opinion";
import LoginNatalia02025 from "./pages/LoginNatalia02025";
import Dashboard from "./pages/Dashboard";
import Suscripciones from "./pages/Suscripciones";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginNatalia02025 />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/suscripciones" 
            element={
              <ProtectedRoute>
                <Suscripciones />
              </ProtectedRoute>
            } 
          />
          <Route path="/sections/artists" element={<Artists />} />
          <Route path="/sections/museums" element={<Museums />} />
          <Route path="/sections/events" element={<Events />} />
          <Route path="/sections/opinion" element={<Opinion />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
