import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Image, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NuevoProducto = () => {
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Producto publicado",
        description: "Tu producto se ha publicado correctamente.",
      });
      navigate("/profile/productos");
    }, 1500);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <Card className="glass-card w-full max-w-md animate-slide-up">
        <CardContent className="p-6">
          <h1 className="text-xl font-bold text-card-foreground text-center mb-6">
            Nuevo Producto
          </h1>

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
                className="h-12 rounded-xl bg-muted/50 border-0"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Descripción</Label>
              <Textarea
                placeholder="Describe los atributos, estado y características de tu producto..."
                className="min-h-[100px] rounded-xl bg-muted/50 border-0 resize-none"
              />
            </div>

            {/* SKU & Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">SKU</Label>
                <Input
                  placeholder="Ej. CAM-001"
                  className="h-12 rounded-xl bg-muted/50 border-0"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Precio ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
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
                {isLoading ? "PUBLICANDO..." : "PUBLICAR"}
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

export default NuevoProducto;
