import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ClientData from "@/components/profile/ClientData";
import ClientsList from "@/components/profile/ClientsList";
import ProductsList from "@/components/profile/ProductsList";
import { User, Users, Package } from "lucide-react";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
          <p className="text-muted-foreground">
            Gestiona tu información, clientes y productos
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="datos" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="datos" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Mis Datos</span>
            </TabsTrigger>
            <TabsTrigger value="clientes" className="gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Clientes</span>
            </TabsTrigger>
            <TabsTrigger value="productos" className="gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Productos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="datos">
            <ClientData />
          </TabsContent>

          <TabsContent value="clientes">
            <ClientsList />
          </TabsContent>

          <TabsContent value="productos">
            <ProductsList />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
