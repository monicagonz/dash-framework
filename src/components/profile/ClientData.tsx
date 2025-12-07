import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, Building } from "lucide-react";

const ClientData = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Información Personal
          </CardTitle>
          <CardDescription>
            Gestiona tus datos personales y de contacto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" placeholder="Tu nombre" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellidos">Apellidos</Label>
              <Input id="apellidos" placeholder="Tus apellidos" />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email
              </Label>
              <Input id="email" type="email" placeholder="tu@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                Teléfono
              </Label>
              <Input id="telefono" type="tel" placeholder="+34 600 000 000" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="empresa" className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              Empresa
            </Label>
            <Input id="empresa" placeholder="Nombre de tu empresa" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="direccion" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              Dirección
            </Label>
            <Input id="direccion" placeholder="Tu dirección completa" />
          </div>

          <div className="flex justify-end pt-4">
            <Button>Guardar cambios</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientData;
