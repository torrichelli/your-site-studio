import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { RegionProvider } from "@/contexts/RegionContext";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import TemplateDetail from "./pages/TemplateDetail";
import Blog from "./pages/Blog";
import Contacts from "./pages/Contacts";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CountryLanding from "./pages/CountryLanding";
import CityLanding from "./pages/CityLanding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <RegionProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/site/:slug" element={<TemplateDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              {/* SEO Landing pages for countries and cities */}
              <Route path="/:country" element={<CountryLanding />} />
              <Route path="/:country/:city" element={<CityLanding />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </RegionProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
