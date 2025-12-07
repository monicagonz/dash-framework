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
    <header className="bg-header rounded-b-3xl px-6 py-4">
      {/* Logo */}
      <div className="mb-6">
        <LullabayLogo variant="light" />
      </div>

      {/* Tabs */}
      <nav className="flex gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={tab.href}
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg",
              currentTab === tab.id
                ? "text-foreground"
                : "text-foreground/60 hover:text-foreground/80"
            )}
          >
            {tab.name}
            {currentTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default ProfileHeader;