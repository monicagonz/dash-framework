import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Mail, UserPlus, Eye, EyeOff, Lock, Phone } from "lucide-react";
import ShopMatchLogo from "@/components/ui/ShopMatchLogo";
import { useToast } from "@/hooks/use-toast";

const NuevoCliente = () => {
  const { referrerId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    referredBy: referrerId || "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://72.61.76.44:8083/clients/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al guardar los datos");
      }

      toast({
        title: "¡Datos guardados!",
        description: "El cliente ha sido registrado correctamente.",
      });
      navigate("/profile/clientes");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "No se pudieron guardar los datos. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center gradient-bg relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-lg px-6">
        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <ShopMatchLogo size="lg" variant="light" />
        </div>

        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-10 shadow-2xl">
          {/* Referral Badge */}
          {referrerId && (
            <div className="mb-6 flex justify-center">
              <Badge className="bg-primary/20 text-primary border border-primary/30 px-4 py-2 text-sm font-medium flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                {referrerId}
              </Badge>
            </div>
          )}

          {/* Header */}
          <div className="mb-8 text-center">
            <p className="text-sm text-primary font-medium mb-2">Registro</p>
            <h1 className="text-3xl font-bold text-white mb-2">¡Hola! Regístrate</h1>
            <p className="text-white/60">Ingresa tus datos para crear tu cuenta</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm text-white/80 font-medium">Nombre completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Mi nombre completo"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="h-12 pl-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/50 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/80 font-medium">Celular</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Mi celular"
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-12 pl-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/50 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/80 font-medium">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Mi correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-12 pl-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/50 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/80 font-medium">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Mi contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-12 pl-12 pr-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/50 transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white transition-all duration-300"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 h-12 rounded-xl text-base font-semibold" disabled={isLoading}>
                {isLoading ? "Registrando..." : "Registrarme"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NuevoCliente;
