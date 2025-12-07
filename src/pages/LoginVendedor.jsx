import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ShopMatchLogo from "@/components/ui/ShopMatchLogo";
import { storeAuthToken } from "@/lib/auth";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://liveshop.com.co/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Credenciales inválidas");
      }

      // Guardar token en sessionStorage/localStorage
      if (data.token) {
        storeAuthToken(data.token);
      }
      
      // Guardar email
      if (formData.email) {
        localStorage.setItem("email", formData.email);
      }
      
      // Guardar username - extraer el string del objeto si es necesario
      let username = data.username || data.user || data.streamer || data.name;
      
      // Si username es un objeto, extraer la propiedad username del objeto
      if (username && typeof username === 'object') {
        username = username.username || username.name || username.user || '';
      }
      
      if (username && typeof username === 'string') {
        localStorage.setItem("username", username);
        console.log("Username saved:", username);
      }
      
      // Guardar sellerName
      let sellerName = data.name;
      if (sellerName && typeof sellerName === 'object') {
        sellerName = sellerName.name || sellerName.username || '';
      }
      if (sellerName && typeof sellerName === 'string') {
        localStorage.setItem("sellerName", sellerName);
      }
      
      // Guardar platform si viene en la respuesta
      if (data.platform) {
        localStorage.setItem("platform", data.platform);
      }

      toast({
        title: "¡Bienvenido!",
        description: "Inicio de sesión exitoso",
      });

      navigate("/profile");
    } catch (error) {
      toast({
        title: "Error de autenticación",
        description: error.message || "Credenciales inválidas. Intenta de nuevo.",
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
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Bienvenido !!</h1>
            <p className="text-white/60">Ingresa tus datos para acceder a tu cuenta de vendedor</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm text-white/80 font-medium">Correo electrónico</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@correo.com"
                className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/50 transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/80 font-medium">Contraseña</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40 pr-12 focus:border-primary focus:ring-primary/50 transition-all duration-300"
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

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox className="rounded border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                <span className="text-white/70">Recuérdame</span>
              </label>
              <a href="#" className="text-primary font-medium hover:text-primary/80 transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold mt-6" disabled={isLoading}>
              {isLoading ? "Iniciando..." : "Iniciar Sesión"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-4 text-white/50 backdrop-blur-xl">O continúa con</span>
            </div>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-12 rounded-xl border-white/10 bg-white/5 font-medium text-white hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl border-white/10 bg-white/5 font-medium text-white hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Apple
            </Button>
          </div>

          {/* Sign up link */}
          <p className="mt-8 text-center text-sm text-white/60">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-primary font-semibold hover:text-primary/80 transition-colors">
              ¡Regístrate ahora!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
