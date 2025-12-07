import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Image, X, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/context/ProductsContext";

const EditarProducto = () => {
  const { id } = useParams<{ id: string }>();
  const { getProduct, updateProduct } = useProducts();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sku: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (id) {
      const product = getProduct(parseInt(id));
      if (product) {
        setFormData({
          name: product.name,
          description: product.description || "",
          sku: product.sku || "",
          price: product.price.toString(),
          stock: product.stock.toString(),
        });
        setImagePreview(product.image || null);
      } else {
        toast({
          title: "Producto no encontrado",
          variant: "destructive",
        });
        navigate("/profile/productos");
      }
    }
  }, [id, getProduct, navigate, toast]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa el nombre y precio del producto.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (id) {
        updateProduct(parseInt(id), {
          name: formData.name,
          description: formData.description,
          sku: formData.sku,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock) || 0,
          image: imagePreview || undefined,
        });
      }
      setIsLoading(false);
      toast({
        title: "Producto actualizado",
        description: "Los cambios se han guardado correctamente.",
      });
      navigate("/profile/productos");
    }, 800);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <Card className="glass-card w-full max-w-md animate-slide-up">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-card-foreground">
              Editar Producto
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Image Upload */}
            <div
              className={`relative rounded-2xl border-2 border-dashed transition-colors ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/20"
              } ${imagePreview ? "p-2" : "p-8"}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 h-8 w-8 bg-card rounded-full flex items-center justify-center shadow-lg hover:bg-muted"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  <div className="mx-auto h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-3">
                    <Image className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Arrastra tu foto
                  </p>
                </div>
              )}
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Nombre del Producto</Label>
              <Input
                placeholder="Ej. Cámara Vintage 35mm"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-12 rounded-xl bg-muted/50 border-0"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Descripción</Label>
              <Textarea
                placeholder="Describe los atributos, estado y características de tu producto..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="min-h-[100px] rounded-xl bg-muted/50 border-0 resize-none"
              />
            </div>

            {/* SKU & Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">SKU</Label>
                <Input
                  placeholder="Ej. CAM-001"
                  value={formData.sku}
                  onChange={(e) => handleInputChange("sku", e.target.value)}
                  className="h-12 rounded-xl bg-muted/50 border-0"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Precio ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className="h-12 rounded-xl bg-muted/50 border-0"
                  required
                />
              </div>
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Unidades Disponibles</Label>
              <Input
                type="number"
                placeholder="0"
                value={formData.stock}
                onChange={(e) => handleInputChange("stock", e.target.value)}
                className="h-12 rounded-xl bg-muted/50 border-0"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-3">
              <Button
                type="submit"
                className="w-full h-12 rounded-xl text-base font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "GUARDANDO..." : "GUARDAR CAMBIOS"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditarProducto;
