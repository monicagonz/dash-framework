import { Link, useLocation } from "react-router-dom";
import ShopMatchLogo from "@/components/ui/ShopMatchLogo";
import { User, Users, Package, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Mis Datos", href: "/profile", id: "datos", icon: User },
  { name: "Mis Clientes", href: "/profile/clientes", id: "clientes", icon: Users },
  { name: "Mis Productos", href: "/profile/productos", id: "productos", icon: Package },
];

const ProfileSidebar = ({ activeTab }) => {
  const location = useLocation();

  const getActiveTab = () => {
    if (activeTab) return activeTab;
    if (location.pathname.includes("clientes")) return "clientes";
    if (location.pathname.includes("productos")) return "productos";
    return "datos";
  };

  const currentTab = getActiveTab();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass-sidebar flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <ShopMatchLogo variant="light" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          
          return (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-white/50")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span>Cerrar Sesión</span>
        </Link>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
