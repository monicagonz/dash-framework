import { useState } from "react";
import ProfileLayout from "@/components/layout/ProfileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useProfile } from "@/context/ProfileContext";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { profile, updateProfile } = useProfile();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      updateProfile(formData);
      setIsLoading(false);
      toast({
        title: "Perfil actualizado",
        description: "Tus datos se han guardado correctamente.",
      });
    }, 800);
  };

  const handleNotificationsChange = (checked) => {
    updateProfile({ notifications: checked });
  };

  return (
    <ProfileLayout activeTab="datos">
      <div className="space-y-6 animate-fade-in">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Mis Datos</h1>
          <p className="text-white/50">Administra tu información personal</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Details */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-white mb-5">Detalles del Perfil</h2>
              <div className="space-y-4">
                <Input
                  placeholder="Nombre Completo"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="h-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/50"
                />
                <Input
                  placeholder="Correo Electrónico"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/50"
                />
                <Input
                  placeholder="Teléfono de Contacto"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="h-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/50"
                />
                <Input
                  placeholder="Dirección del Negocio"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="h-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-white mb-5">Configuración de Cuenta</h2>
              <div className="space-y-5">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white">Notificaciones</span>
                  <Switch
                    checked={profile.notifications}
                    onCheckedChange={handleNotificationsChange}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
                <button className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-left">
                  Cambiar Contraseña
                </button>
                <button className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-left">
                  Métodos de Pago
                </button>
                <button className="w-full p-4 rounded-xl bg-destructive/20 border border-destructive/30 text-destructive hover:bg-destructive/30 transition-all text-left">
                  Desactivar Cuenta
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-white mb-5">Resumen de Rendimiento</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-sm text-white/50 mb-2">Ventas Totales</p>
                <p className="text-3xl font-bold text-primary">${profile.totalSales.toLocaleString()}</p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-sm text-white/50 mb-2">Listados Activos</p>
                <p className="text-3xl font-bold text-white">{profile.activeListings}</p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-sm text-white/50 mb-2">Calificación</p>
                <p className="text-3xl font-bold text-white">{profile.sellerRating}/5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button
          className="w-full h-14 rounded-xl text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>
    </ProfileLayout>
  );
};

export default Profile;
