import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Package, Search, Plus, Edit, Trash2 } from "lucide-react";

// Datos de ejemplo
const productsData = [
  { id: 1, name: "Producto Premium", category: "Electrónica", price: 299.99, stock: 45, status: "disponible" },
  { id: 2, name: "Servicio Básico", category: "Servicios", price: 49.99, stock: null, status: "disponible" },
  { id: 3, name: "Pack Especial", category: "Bundles", price: 149.99, stock: 12, status: "bajo stock" },
  { id: 4, name: "Accesorio Pro", category: "Accesorios", price: 29.99, stock: 0, status: "agotado" },
];

const ProductsList = () => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "disponible":
        return "default";
      case "bajo stock":
        return "secondary";
      case "agotado":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Mis Productos
              </CardTitle>
              <CardDescription>
                Gestiona tu catálogo de productos
              </CardDescription>
            </div>
            <Button className="gap-2" asChild>
              <a href="/upload-products">
                <Plus className="h-4 w-4" />
                Nuevo Producto
              </a>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="mb-6 flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar producto..." className="pl-9" />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {productsData.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <Package className="h-12 w-12 text-muted-foreground/30" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <Badge variant={getStatusVariant(product.status)}>
                      {product.status}
                    </Badge>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-semibold">{product.price.toFixed(2)} €</span>
                    {product.stock !== null && (
                      <span className="text-sm text-muted-foreground">
                        Stock: {product.stock}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <Edit className="h-3 w-3" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty state */}
          {productsData.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Package className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">No tienes productos aún</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Sube tu primer producto para empezar a vender
              </p>
              <Button className="mt-4 gap-2" asChild>
                <a href="/upload-products">
                  <Plus className="h-4 w-4" />
                  Subir Producto
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsList;
