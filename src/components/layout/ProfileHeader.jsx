import { Link, useLocation } from "react-router-dom";
import LullabayLogo from "@/components/ui/LullabayLogo";
import { cn } from "@/lib/utils";

const tabs = [
  { name: "Mis Datos", href: "/profile", id: "datos" },
  { name: "Mis Clientes", href: "/profile/clientes", id: "clientes" },
  { name: "Mis Productos", href: "/profile/productos", id: "productos" },
];

const ProfileHeader = ({ activeTab }) => {
  const location = useLocation();

  const getActiveTab = () => {
    if (activeTab) return activeTab;
    if (location.pathname.includes("clientes")) return "clientes";
    if (location.pathname.includes("productos")) return "productos";
    return "datos";
  };

  const currentTab = getActiveTab();

  return (
    <header className="bg-header rounded-b-3xl px-5 pt-4 pb-5">
      {/* Logo */}
      <div className="mb-5">
        <LullabayLogo variant="light" />
      </div>

      {/* Tabs */}
      <nav className="flex bg-header-tabs rounded-xl p-1">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={tab.href}
            className={cn(
              "flex-1 text-center py-2.5 text-sm font-medium transition-all rounded-lg",
              currentTab === tab.id
                ? "bg-card text-card-foreground shadow-sm"
                : "text-foreground/70 hover:text-foreground"
            )}
          >
            {tab.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default ProfileHeader;