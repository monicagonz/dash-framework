import { useState, useEffect, useMemo } from "react";
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

const getProductStock = (product) => {
  const rawStock = product?.stock ?? product?.quantity ?? product?.inventory ?? product?.available ?? 0;
  const parsed = Number(rawStock);
  return Number.isFinite(parsed) ? parsed : 0;
};

const getProductStatus = (product) => {
  if (product?.status) return product.status;
  const stock = getProductStock(product);
  if (stock === 0) return "Agotado";
  if (stock <= 5) return "Bajo Stock";
  return "Activo";
};

const statusBadgeStyles = {
  Activo: "bg-primary/20 text-primary border border-primary/30",
  "Bajo Stock": "bg-warning/20 text-warning border border-warning/30",
  Agotado: "bg-destructive/20 text-destructive border border-destructive/30",
};

const formatCurrency = (value, currency = "COP") => {
  const amount = Number(typeof value === "string" ? value.replace(/,/g, ".") : value);
  if (!Number.isFinite(amount)) return "$0";
  return amount.toLocaleString("es-CO", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

const parseImageUrls = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed;
  } catch (err) {
    console.warn("Unable to parse image urls", err);
  }
  return [];
};

const ProductSkeleton = () => (
  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.06] border border-white/[0.08] animate-pulse">
    <div className="h-16 w-16 rounded-xl bg-white/10" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-white/10 rounded w-2/3" />
      <div className="h-3 bg-white/10 rounded w-1/3" />
      <div className="h-3 bg-white/10 rounded w-1/2" />
    </div>
    <div className="h-10 w-10 rounded-xl bg-white/10" />
  </div>
);

const ProfileProductos = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Cargar productos reales desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const username = localStorage.getItem("username") || "";
        console.log("Fetching products for username:", username);

        if (!username) {
          console.log("No username found in localStorage");
          setProducts([]);
          setIsLoading(false);
          return;
        }

        const url = `https://liveshop.com.co/ecommerce/products/view/${username}`;
        console.log("API URL:", url);

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error("Error al cargar productos");
        }

        const data = await response.json();
        console.log("Products received:", data);
        const normalizedProducts = Array.isArray(data) ? data : Array.isArray(data?.products) ? data.products : [];
        setProducts(normalizedProducts);
        setTotalProducts(Number(data?.total) || normalizedProducts.length);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setTotalProducts(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [products, searchQuery]);

  const stats = useMemo(() => {
    const totalStock = products.reduce((acc, product) => acc + getProductStock(product), 0);
    const outOfStock = products.filter((product) => getProductStatus(product) === "Agotado").length;
    const avgPrice =
      products.length === 0 ? 0 : products.reduce((acc, product) => acc + Number(product.price || 0), 0) / products.length;

    return [
      {
        label: "Productos totales",
        value: totalProducts.toString(),
        helper: products.length ? "en catálogo" : "sin registros",
      },
      { label: "Stock total", value: totalStock.toLocaleString("es-CO"), helper: "unidades disponibles" },
      {
        label: "Precio promedio",
        value: formatCurrency(avgPrice || 0),
        helper: "ref. catálogo",
      },
      { label: "Sin existencias", value: outOfStock.toString(), helper: "requieren reposición" },
    ];
  }, [products, totalProducts]);

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

        {!!products.length && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <Card
                key={item.label}
                className="glass-card border border-white/10 bg-gradient-to-b from-white/10 to-white/5"
              >
                <CardContent className="p-4">
                  <p className="text-sm text-white/60">{item.label}</p>
                  <p className="text-3xl font-semibold text-white mt-2">{item.value}</p>
                  <p className="text-xs text-white/40">{item.helper}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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
              {isLoading ? (
                Array.from({ length: 4 }).map((_, index) => <ProductSkeleton key={index} />)
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/50">No se encontraron productos</p>
                  <p className="text-white/30 text-sm mt-2">Intenta con otro término de búsqueda</p>
                </div>
              ) : (
                filteredProducts.map((product, index) => {
                  const stock = getProductStock(product);
                  const status = getProductStatus(product);
                  const currency = product.currency ?? "COP";
                  const price = formatCurrency(product.price, currency);
                  const images = parseImageUrls(product.image_urls);
                  const image =
                    images?.[0]?.url ||
                    product.image ||
                    product.cover ||
                    product.thumbnail ||
                    product.images?.[0] ||
                    product.photo ||
                    "";
                  const key = product.sku || product.id || product._id || `${product.name}-${index}`;
                  const createdAt = product.created_at ? new Date(product.created_at) : null;

                  return (
                    <div
                      key={key}
                      className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-white/10 transition-all"
                    >
                      <div className="h-20 w-20 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden border border-white/10">
                        {image ? (
                          <img src={image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
                        ) : (
                          <Package className="h-7 w-7 text-white/40" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-white text-lg truncate flex-1">{product.name}</h3>
                          <Badge
                            variant="secondary"
                            className={`text-xs px-3 py-1 ${statusBadgeStyles[status] || "bg-white/10 text-white/70 border border-white/20"}`}
                          >
                            {status}
                          </Badge>
                        </div>
                        {product.description && (
                          <p className="text-sm text-white/60 line-clamp-2">{product.description}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
                          <span className="text-xl font-bold text-primary">{price}</span>
                          {product.category && (
                            <Badge className="text-xs px-2 py-1 bg-white/10 text-white/70 border border-white/20">
                              {product.category}
                            </Badge>
                          )}
                          {(product.sku || product.reference) && (
                            <span className="text-xs font-medium tracking-wide uppercase text-white/50">
                              SKU: {product.sku || product.reference}
                            </span>
                          )}
                          <span className="text-xs text-white/50">
                            Stock: <span className="font-semibold text-white">{stock}</span>
                          </span>
                          {createdAt && (
                            <span className="text-xs text-white/40">
                              Creado: {createdAt.toLocaleDateString("es-CO", { year: "numeric", month: "short", day: "numeric" })}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 justify-end">
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
                  );
                })
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
