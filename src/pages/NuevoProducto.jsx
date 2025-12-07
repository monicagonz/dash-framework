import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Image, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/context/ProductsContext";
import ShopMatchLogo from "@/components/ui/ShopMatchLogo";

const NuevoProducto = () => {
  const [dragActive, setDragActive] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sku: "",
    price: "",
    stock: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addProduct } = useProducts();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files) => {
    files.forEach((file) => {
      setImageFiles((prev) => [...prev, file]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
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

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("streamer", localStorage.getItem("sellerName") || "");
      formDataToSend.append("sku", formData.sku);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("user_description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("stock", formData.stock || "0");

      imageFiles.forEach((file) => {
        formDataToSend.append("files", file);
      });

      const response = await fetch("'https://liveshop.com.co/ecommerce/products/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al publicar el producto");
      }

      toast({
        title: "Producto publicado",
        description: "Tu producto se ha publicado correctamente.",
      });
      navigate("/profile/productos");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "No se pudo publicar el producto. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center gradient-bg relative overflow-hidden py-8">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-lg px-6">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <ShopMatchLogo size="lg" variant="light" />
        </div>

        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Nuevo Producto</h1>
            <p className="text-white/60">Completa los datos para publicar tu producto</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Image Upload */}
            <div className="space-y-3">
              <Label className="text-sm text-white/80 font-medium">Fotos del Producto</Label>

              {/* Image Grid */}
              <div className="grid grid-cols-3 gap-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-xl border border-white/10"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 h-6 w-6 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <X className="h-3 w-3 text-white" />
                    </button>
                  </div>
                ))}

                {/* Add More Button */}
                <div
                  className={`relative aspect-square rounded-xl border-2 border-dashed transition-colors flex items-center justify-center cursor-pointer ${
                    dragActive ? "border-primary bg-primary/10" : "border-white/20 hover:border-white/40 bg-white/5"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  <div className="text-center p-2">
                    {imagePreviews.length === 0 ? (
                      <>
                        <Image className="h-6 w-6 text-white/40 mx-auto mb-1" />
                        <p className="text-xs text-white/40">Arrastra fotos</p>
                      </>
                    ) : (
                      <>
                        <Plus className="h-6 w-6 text-white/40 mx-auto" />
                        <p className="text-xs text-white/40">Añadir</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label className="text-sm text-white/80 font-medium">Nombre del Producto</Label>
              <Input
                placeholder="Ej. Cámara Vintage 35mm"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/50 transition-all duration-300"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-sm text-white/80 font-medium">Descripción</Label>
              <Textarea
                placeholder="Describe los atributos, estado y características de tu producto..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="min-h-[100px] rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/50 resize-none transition-all duration-300"
              />
            </div>

            {/* SKU & Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-white/80 font-medium">SKU</Label>
                <Input
                  placeholder="Ej. CAM-001"
                  value={formData.sku}
                  onChange={(e) => handleInputChange("sku", e.target.value)}
                  className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/50 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-white/80 font-medium">Precio ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/50 transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <Label className="text-sm text-white/80 font-medium">Unidades Disponibles</Label>
              <Input
                type="number"
                placeholder="0"
                value={formData.stock}
                onChange={(e) => handleInputChange("stock", e.target.value)}
                className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/50 transition-all duration-300"
              />
            </div>

            {/* Actions */}
            <div className="pt-4 space-y-3">
              <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold" disabled={isLoading}>
                {isLoading ? "PUBLICANDO..." : "PUBLICAR"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white transition-all duration-300"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
