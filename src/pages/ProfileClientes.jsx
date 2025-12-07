import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileLayout from "@/components/layout/ProfileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Users, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfileClientes = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Cargar clientes desde la API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("https://api.tu-proyecto.com/seller/clients", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Error al cargar clientes");
        }

        const data = await response.json();
        setClients(data);
      } catch (error) {
        toast({
          title: "Error",
          description: error.message || "No se pudieron cargar los clientes",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, [toast]);

  const filteredClients = clients.filter((client) => {
    return client.fullName?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <ProfileLayout activeTab="clientes">
      <div className="space-y-6 animate-fade-in">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Mis Clientes</h1>
            <p className="text-white/50">Administra tu cartera de clientes</p>
          </div>
          <Button 
            size="lg" 
            className="rounded-xl gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
            onClick={() => navigate("/nuevo-cliente")}
          >
            <Plus className="h-5 w-5" />
            Nuevo Cliente
          </Button>
        </div>

        <Card className="glass-card">
          <CardContent className="p-6">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <Input
                placeholder="Buscar cliente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/50"
              />
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-2 gap-4 text-sm text-white/50 font-medium mb-4 px-4 pb-3 border-b border-white/10">
              <span>Cliente</span>
              <span>Contacto</span>
            </div>

            {/* Client Rows */}
            <div className="space-y-2">
              {isLoading ? (
                <div className="flex items-center justify-center py-12 text-white/50">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  Cargando clientes...
                </div>
              ) : filteredClients.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/50">No se encontraron clientes</p>
                </div>
              ) : (
                filteredClients.map((client) => (
                  <div
                    key={client.id}
                    className="grid grid-cols-2 gap-4 items-center py-4 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <span className="font-medium text-white truncate">
                      {client.fullName}
                    </span>
                    <span className="text-white/60 text-sm truncate">
                      {client.email || client.phone || "-"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Add Client Button */}
        <Button 
          className="w-full h-14 rounded-xl text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
          onClick={() => navigate("/nuevo-cliente")}
        >
          <Plus className="h-5 w-5 mr-2" />
          Agregar Cliente
        </Button>
      </div>
    </ProfileLayout>
  );
};

export default ProfileClientes;
