import ProfileLayout from "@/components/layout/ProfileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Profile = () => {
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
                className="h-12 rounded-xl bg-muted/50 border-0"
              />
              <Input
                placeholder="Correo Electrónico"
                type="email"
                className="h-12 rounded-xl bg-muted/50 border-0"
              />
              <Input
                placeholder="Teléfono de Contacto"
                type="tel"
                className="h-12 rounded-xl bg-muted/50 border-0"
              />
              <Input
                placeholder="Dirección del Negocio"
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
                <p className="text-xl font-bold text-primary">$15,400</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Listados Activos</p>
                <p className="text-xl font-bold text-card-foreground">85</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Calificación del Vendedor</p>
                <p className="text-xl font-bold text-card-foreground">4.8/5</p>
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
                  <Switch className="data-[state=checked]:bg-primary" />
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
        <Button className="w-full h-12 rounded-xl text-base font-semibold">
          Guardar Cambios
        </Button>
      </div>
    </ProfileLayout>
  );
};

export default Profile;
