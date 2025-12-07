import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Phone, Mail } from "lucide-react";
import ShopMatchLogo from "@/components/ui/ShopMatchLogo";
import { useToast } from "@/hooks/use-toast";

const NuevoCliente = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "¡Cliente registrado!",
        description: "El cliente ha sido agregado exitosamente.",
      });
      navigate("/profile/clientes");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center gradient-bg p-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile/clientes")}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <ShopMatchLogo size="sm" variant="light" />
          <div className="w-10" />
        </div>

        {/* Card */}
        <Card className="glass-card animate-slide-up overflow-hidden">
          <CardContent className="p-6">
            {/* Header */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-1">Registro</p>
              <h1 className="text-2xl font-bold text-card-foreground">
                ¡Hola! Regístrate
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                Ingresa tus datos para crear tu cuenta
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Mi nombre completo"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="h-12 pl-10 rounded-xl bg-muted/50 border-0 placeholder:text-muted-foreground/60"
                  required
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Mi celular"
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-12 pl-10 rounded-xl bg-muted/50 border-0 placeholder:text-muted-foreground/60"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Mi correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-12 pl-10 rounded-xl bg-muted/50 border-0 placeholder:text-muted-foreground/60"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-12 rounded-xl border-border bg-muted/30 font-medium text-card-foreground hover:bg-muted/50"
                  onClick={() => navigate("/profile/clientes")}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12 rounded-xl text-base font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? "Registrando..." : "Registrarme"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NuevoCliente;
