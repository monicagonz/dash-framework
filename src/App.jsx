import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductsProvider } from "@/context/ProductsContext";
import { ProfileProvider } from "@/context/ProfileContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProfileClientes from "./pages/ProfileClientes";
import ProfileProductos from "./pages/ProfileProductos";
import NuevoProducto from "./pages/NuevoProducto";
import EditarProducto from "./pages/EditarProducto";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ProfileProvider>
        <ProductsProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/clientes" element={<ProfileClientes />} />
              <Route path="/profile/productos" element={<ProfileProductos />} />
              <Route path="/nuevo-producto" element={<NuevoProducto />} />
              <Route path="/editar-producto/:id" element={<EditarProducto />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ProductsProvider>
      </ProfileProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;