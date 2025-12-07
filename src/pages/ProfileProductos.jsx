import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileLayout from "@/components/layout/ProfileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Package, Edit, Trash2 } from "lucide-react";
import { useProducts } from "@/context/ProductsContext";
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
  const { products, deleteProduct } = useProducts();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id, name) => {
    deleteProduct(id);
    toast({
      title: "Producto eliminado",
      description: `"${name}" se ha eliminado correctamente.`,
    });
  };

  const handleEdit = (id) => {
    navigate(`/editar-producto/${id}`);
  };

  return (
    <ProfileLayout activeTab="productos">
      <div className="space-y-4 animate-fade-in">
        <Card className="glass-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-card-foreground">
                Mis Productos
              </h2>
              <Button size="sm" className="rounded-xl gap-1" asChild>
                <Link to="/nuevo-producto">
                  <Plus className="h-4 w-4" />
                  Nuevo
                </Link>
              </Button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar producto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 pl-9 rounded-xl bg-muted/50 border-0"
              />
            </div>

            {/* Products List */}
            <div className="space-y-3">
              {filteredProducts.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No se encontraron productos
                </p>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/30"
                  >
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Package className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-card-foreground text-sm truncate">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-primary font-semibold text-sm">
                          ${product.price.toFixed(2)}
                        </span>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            product.status === "Activo"
                              ? "bg-primary/20 text-primary"
                              : product.status === "Agotado"
                              ? "bg-destructive/20 text-destructive"
                              : "bg-warning/20 text-warning"
                          }`}
                        >
                          {product.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(product.id)}
                      >
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="glass-card">
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. El producto "{product.name}" será eliminado permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              className="rounded-xl bg-destructive hover:bg-destructive/90"
                              onClick={() => handleDelete(product.id, product.name)}
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
        <Button className="w-full h-12 rounded-xl text-base font-semibold" asChild>
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