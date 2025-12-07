import ProfileLayout from "@/components/layout/ProfileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

const clientsData = [
  { id: 1, name: "María González", purchase: "$120.00 - 2 items", status: "Nuevo" },
  { id: 2, name: "Carlos López", purchase: "$85.50 - 1 item", status: "Recurrente" },
  { id: 3, name: "Michele Castano", purchase: "$85.50 - 1 item", status: "Nuevo" },
  { id: 4, name: "Larriola Ronahanez", purchase: "$23.00 - 2 items", status: "Nuevo" },
  { id: 5, name: "María González", purchase: "$20.00 - 1 item", status: "Nuevo" },
  { id: 6, name: "Carlos López", purchase: "$85.50 - 1 item", status: "Recurrente" },
];

const ProfileClientes = () => {
  return (
    <ProfileLayout activeTab="clientes">
      <div className="space-y-4 animate-fade-in">
        <Card className="glass-card">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-card-foreground mb-4">
              Client List
            </h2>

            {/* Search */}
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar cliente..."
                  className="h-10 pl-9 rounded-xl bg-muted/50 border-0"
                />
              </div>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-muted">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground font-medium mb-2 px-2">
              <span>Cliente</span>
              <span>Compra Reciente</span>
              <span>Estado</span>
              <span>Acciones</span>
            </div>

            {/* Client Rows */}
            <div className="space-y-2">
              {clientsData.map((client) => (
                <div
                  key={client.id}
                  className="grid grid-cols-4 gap-2 items-center py-3 px-2 rounded-xl bg-muted/30 text-sm"
                >
                  <span className="font-medium text-card-foreground truncate">
                    {client.name}
                  </span>
                  <span className="text-muted-foreground text-xs truncate">
                    {client.purchase}
                  </span>
                  <Badge
                    variant={client.status === "Nuevo" ? "default" : "secondary"}
                    className={`text-xs w-fit ${
                      client.status === "Nuevo"
                        ? "bg-primary/20 text-primary hover:bg-primary/30"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    • {client.status}
                  </Badge>
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 text-xs rounded-lg border-muted px-2"
                    >
                      Ver Perfil
                    </Button>
                    <Button
                      size="sm"
                      className="h-6 text-xs rounded-lg px-2"
                    >
                      Iniciar Chat
                    </Button>
                  </div>
                </div>
              ))}
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
