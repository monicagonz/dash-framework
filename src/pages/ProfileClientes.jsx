import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileLayout from "@/components/layout/ProfileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Users } from "lucide-react";

// Mock Data - Datos de prueba estáticos
const clientsData = [
  { id: 1, name: "María González", email: "maria.gonzalez@email.com", phone: "+52 55 1234 5678", location: "CDMX, México", totalPurchases: 2450.00 },
  { id: 2, name: "Carlos Rodríguez", email: "carlos.rod@email.com", phone: "+52 33 9876 5432", location: "Guadalajara, México", totalPurchases: 1850.50 },
  { id: 3, name: "Ana Martínez", email: "ana.martinez@email.com", phone: "+52 81 5555 1234", location: "Monterrey, México", totalPurchases: 3200.00 },
  { id: 4, name: "Luis Hernández", email: "luis.hdz@email.com", phone: "+52 55 4321 8765", location: "CDMX, México", totalPurchases: 890.75 },
  { id: 5, name: "Sofía López", email: "sofia.lopez@email.com", phone: "+52 33 1111 2222", location: "Guadalajara, México", totalPurchases: 4100.00 },
  { id: 6, name: "Diego Sánchez", email: "diego.sanchez@email.com", phone: "+52 81 3333 4444", location: "Monterrey, México", totalPurchases: 1575.25 },
];

const ProfileClientes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Filtrar clientes por nombre (búsqueda local)
  const filteredClients = clientsData.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                placeholder="Buscar cliente por nombre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/50"
              />
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 text-sm text-white/50 font-medium mb-4 px-4 pb-3 border-b border-white/10">
              <span>Cliente</span>
              <span>Contacto</span>
              <span className="text-right">Total Comprado</span>
            </div>

            {/* Client Rows */}
            <div className="space-y-2">
              {filteredClients.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/50">No se encontraron clientes</p>
                </div>
              ) : (
                filteredClients.map((client) => (
                  <div
                    key={client.id}
                    className="grid grid-cols-3 gap-4 items-center py-4 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div>
                      <span className="font-medium text-white block">
                        {client.name}
                      </span>
                      <span className="text-white/40 text-sm">
                        {client.location}
                      </span>
                    </div>
                    <span className="text-white/60 text-sm truncate">
                      {client.email}
                    </span>
                    <div className="text-right">
                      <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
                        ${client.totalPurchases.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                      </Badge>
                    </div>
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
