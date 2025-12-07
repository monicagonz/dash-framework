import { useState } from "react";
import ProfileLayout from "@/components/layout/ProfileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const clientsData = [
  { id: 1, name: "María González", username: "@maria_gonzalez" },
  { id: 2, name: "Carlos López", username: "@carlos.lopez" },
  { id: 3, name: "Michele Castano", username: "@michele_c" },
  { id: 4, name: "Larriola Ronahanez", username: "@larriola.r" },
  { id: 5, name: "Ana Martínez", username: "@ana.mtz" },
  { id: 6, name: "Pedro Sánchez", username: "@pedro_sanchez" },
];

const ProfileClientes = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = clientsData.filter((client) => {
    return client.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <ProfileLayout activeTab="clientes">
      <div className="space-y-4 animate-fade-in">
        <Card className="glass-card">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-card-foreground mb-4">
              Client List
            </h2>

            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar cliente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 pl-9 rounded-xl bg-muted/50 border-0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground font-medium mb-2 px-2">
              <span>Cliente</span>
              <span>Usuario</span>
            </div>

            {/* Client Rows */}
            <div className="space-y-2">
              {filteredClients.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No se encontraron clientes
                </div>
              ) : (
                filteredClients.map((client) => (
                  <div
                    key={client.id}
                    className="grid grid-cols-2 gap-2 items-center py-3 px-2 rounded-xl bg-muted/30 text-sm"
                  >
                    <span className="font-medium text-card-foreground truncate">
                      {client.name}
                    </span>
                    <span className="text-muted-foreground text-xs truncate">
                      {client.username}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Load More */}
        <Button className="w-full h-12 rounded-xl text-base font-semibold">
          Cargar Más Clientes
        </Button>
      </div>
    </ProfileLayout>
  );
};

export default ProfileClientes;
