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
      <div className="space-y-4 animate-fade-in">
        {/* Profile Details */}
        <Card className="glass-card">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-card-foreground mb-4">
              Profile Details
            </h2>
            <div className="space-y-3">
              <Input
                placeholder="Nombre Completo"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="h-12 rounded-xl bg-muted/50 border-0"
              />
              <Input
                placeholder="Correo Electrónico"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="h-12 rounded-xl bg-muted/50 border-0"
              />
              <Input
                placeholder="Teléfono de Contacto"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="h-12 rounded-xl bg-muted/50 border-0"
              />
              <Input
                placeholder="Dirección del Negocio"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="h-12 rounded-xl bg-muted/50 border-0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card className="glass-card">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-card-foreground mb-4">
              Performance Overview
            </h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Ventas Totales</p>
                <p className="text-xl font-bold text-primary">
                  ${profile.totalSales.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Listados Activos</p>
                <p className="text-xl font-bold text-card-foreground">
                  {profile.activeListings}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Calificación del Vendedor</p>
                <p className="text-xl font-bold text-card-foreground">
                  {profile.sellerRating}/5
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="glass-card">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-card-foreground mb-4">
              Account Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Cambiar Contraseña</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Notificaciones</span>
                  <Switch
                    checked={profile.notifications}
                    onCheckedChange={handleNotificationsChange}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Métodos de Pago</span>
                <button className="text-sm text-destructive font-medium hover:underline">
                  Desactivar Cuenta
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button
          className="w-full h-12 rounded-xl text-base font-semibold"
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