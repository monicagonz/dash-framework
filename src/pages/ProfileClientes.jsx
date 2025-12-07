import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileLayout from "@/components/layout/ProfileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Users, RefreshCw, CheckCircle, UserCheck, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getStoredAuthToken } from "@/lib/auth";

const statusFilters = [
  { label: "Todos", value: "all" },
  { label: "Pendientes", value: "pending" },
  { label: "Contactados", value: "contacted" },
  { label: "Vendidos", value: "sold" },
];

const statusBadgeMap = {
  pending: "bg-warning/20 text-warning border border-warning/40",
  contacted: "bg-primary/20 text-primary border border-primary/40",
  sold: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
};

const ProfileClientes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [buyers, setBuyers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState("all");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;

    const fetchBuyers = async () => {
      setIsLoading(true);
      try {
        const username = localStorage.getItem("username");
        const token = getStoredAuthToken();

        if (!username || !token) {
          throw new Error("Debes iniciar sesión nuevamente para ver tus compradores.");
        }

        const params = new URLSearchParams();
        if (activeStatus !== "all") {
          params.append("status", activeStatus);
        }

        const url =
          `https://liveshop.com.co/chat/buyers/${encodeURIComponent(username)}` +
          (params.toString() ? `?${params.toString()}` : "");

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("No se pudo cargar la lista de compradores.");
        }

        const data = await response.json();
        if (isMounted) {
          setBuyers(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error fetching buyers:", error);
        if (isMounted) {
          setBuyers([]);
          toast({
            title: "Error al cargar compradores",
            description: error.message || "Intenta de nuevo más tarde.",
            variant: "destructive",
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchBuyers();
    return () => {
      isMounted = false;
    };
  }, [activeStatus, toast]);

  const filteredClients = useMemo(() => {
    return buyers.filter((client) =>
      client?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [buyers, searchQuery]);

  const handleStatusUpdate = async (buyer, status) => {
    if (!buyer?.id || buyer.status === status) return;
    const token = getStoredAuthToken();
    const username = localStorage.getItem("username");

    if (!token || !username) {
      toast({
        title: "Sesión expirada",
        description: "Inicia sesión nuevamente para actualizar el estado.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingStatus(buyer.id);
    try {
      const url = `https://liveshop.com.co/chat/buyers/${username}/status?status=${status}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("No se pudo actualizar el estado");
      }

      setBuyers((prev) =>
        prev.map((item) => (item.id === buyer.id ? { ...item, status } : item)),
      );

      toast({
        title: "Estado actualizado",
        description: `${buyer.name} ahora está marcado como ${status}.`,
      });
    } catch (error) {
      console.error("Error updating buyer status:", error);
      toast({
        title: "Error",
        description: error.message || "No se pudo actualizar el estado.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  const statusTotals = useMemo(() => {
    return statusFilters.reduce((acc, filter) => {
      if (filter.value === "all") {
        acc[filter.value] = buyers.length;
      } else {
        acc[filter.value] = buyers.filter((buyer) => buyer.status === filter.value).length;
      }
      return acc;
    }, {});
  }, [buyers]);

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

        <Card className="glass-card border border-white/10">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {statusFilters.map((filter) => (
                  <Button
                    key={filter.value}
                    variant={activeStatus === filter.value ? "default" : "ghost"}
                    className={`rounded-full px-4 ${activeStatus === filter.value ? "bg-primary text-white" : "text-white/70"}`}
                    onClick={() => setActiveStatus(filter.value)}
                  >
                    {filter.label}
                    <Badge className="ml-2 bg-white/10 text-xs text-white/70 border border-white/10">
                      {statusTotals[filter.value] ?? 0}
                    </Badge>
                  </Button>
                ))}
              </div>
              <Button variant="ghost" size="icon" className="text-white/60 hover:text-white" onClick={() => setActiveStatus("all")}>
                <RefreshCw className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

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
            <div className="space-y-2 min-h-[200px]">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-3 gap-4 items-center py-4 px-4 rounded-xl bg-white/5 border border-white/10 animate-pulse"
                  >
                    <div>
                      <div className="h-4 bg-white/20 rounded w-32 mb-2" />
                      <div className="h-3 bg-white/10 rounded w-24" />
                    </div>
                    <div className="h-4 bg-white/10 rounded w-40" />
                    <div className="flex justify-end gap-3">
                      <div className="h-8 w-20 bg-white/10 rounded" />
                      <div className="h-8 w-20 bg-white/10 rounded" />
                    </div>
                  </div>
                ))
              ) : filteredClients.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/50">No se encontraron clientes</p>
                  <p className="text-white/30 text-sm mt-2">
                    Cambia los filtros o intenta nuevamente más tarde.
                  </p>
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
                        {client.city || client.phone || "Sin detalles"}
                      </span>
                    </div>
                    <div className="text-white/60 text-sm space-y-1">
                      {client.phone && <p>{client.phone}</p>}
                      {client.email && <p className="truncate">{client.email}</p>}
                      {client.status && (
                        <Badge className={`mt-1 ${statusBadgeMap[client.status] || "bg-white/10 text-white/60 border-white/10"}`}>
                          {client.status}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        className="rounded-xl border border-white/10 text-white/80 hover:text-white"
                        onClick={() => handleStatusUpdate(client, "contacted")}
                        disabled={isUpdatingStatus === client.id || client.status === "contacted"}
                      >
                        {isUpdatingStatus === client.id && client.status !== "contacted" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <UserCheck className="h-4 w-4 mr-1" />
                        )}
                        Contactado
                      </Button>
                      <Button
                        className="rounded-xl bg-emerald-500/80 text-white hover:bg-emerald-500"
                        onClick={() => handleStatusUpdate(client, "sold")}
                        disabled={isUpdatingStatus === client.id || client.status === "sold"}
                      >
                        {isUpdatingStatus === client.id && client.status !== "sold" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle className="h-4 w-4 mr-1" />
                        )}
                        Vendido
                      </Button>
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
