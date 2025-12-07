import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileLayout from "@/components/layout/ProfileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Package, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ProfileProductos = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrar productos por búsqueda
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Cargar productos reales desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const username = localStorage.getItem("username") || "";

        if (!username) {
          setProducts([]);
          setIsLoading(false);
          return;
        }

        const response = await fetch(`https://liveshop.com.co/products/streamer/${username}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al cargar productos");
        }

        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Borrado simulado (sin endpoint DELETE)
  const handleDelete = (sku, name) => {
    setProducts((prev) => prev.filter((product) => product.sku !== sku));
    toast({
      title: "Producto eliminado (Simulación)",
      description: `"${name}" se ha eliminado de la vista.`,
    });
  };

  const handleEdit = (id) => {
    navigate(`/editar-producto/${id}`);
  };

  return (
    <ProfileLayout activeTab="productos">
      <div className="space-y-6 animate-fade-in">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Mis Productos</h1>
            <p className="text-white/50">Administra tu inventario de productos</p>
          </div>
          <Button
            size="lg"
            className="rounded-xl gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
            asChild
          >
            <Link to="/nuevo-producto">
              <Plus className="h-5 w-5" />
              Nuevo Producto
            </Link>
          </Button>
        </div>

        <Card className="glass-card">
          <CardContent className="p-6">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <Input
                placeholder="Buscar producto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/50"
              />
            </div>

            {/* Products List */}
            <div className="space-y-3">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/50">No se encontraron productos</p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.sku}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="h-14 w-14 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                      ) : (
                        <Package className="h-7 w-7 text-white/40" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white text-base truncate">{product.name}</h3>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="text-primary font-bold text-lg">${product.price.toFixed(2)}</span>
                        {product.category && (
                          <Badge
                            variant="secondary"
                            className="text-xs px-2 py-1 bg-white/10 text-white/70 border border-white/20"
                          >
                            {product.category}
                          </Badge>
                        )}
                        <Badge
                          variant="secondary"
                          className={`text-xs px-2 py-1 ${
                            product.status === "Activo"
                              ? "bg-primary/20 text-primary border border-primary/30"
                              : product.status === "Agotado"
                                ? "bg-destructive/20 text-destructive border border-destructive/30"
                                : "bg-warning/20 text-warning border border-warning/30"
                          }`}
                        >
                          {product.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10"
                        onClick={() => handleEdit(product.sku)}
                      >
                        <Edit className="h-4 w-4 text-white/70" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-xl bg-destructive/10 hover:bg-destructive/20 border border-destructive/20"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="glass-card border border-white/10">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">¿Eliminar producto?</AlertDialogTitle>
                            <AlertDialogDescription className="text-white/60">
                              Esta acción no se puede deshacer. El producto "{product.name}" será eliminado
                              permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-xl bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">
                              Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="rounded-xl bg-destructive hover:bg-destructive/90 text-white"
                              onClick={() => handleDelete(product.sku, product.name)}
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Add Product Button */}
        <Button
          className="w-full h-14 rounded-xl text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
          asChild
        >
          <Link to="/nuevo-producto">
            <Plus className="mr-2 h-5 w-5" />
            Agregar Nuevo Producto
          </Link>
        </Button>
      </div>
    </ProfileLayout>
  );
};

export default ProfileProductos;
