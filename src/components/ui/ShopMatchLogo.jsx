import { Leaf } from "lucide-react";

const ShopMatchLogo = ({ className = "", size = "md", variant = "light" }) => {
  const sizes = {
    sm: { icon: 14, text: "text-base", box: "h-6 w-6" },
    md: { icon: 16, text: "text-lg", box: "h-7 w-7" },
    lg: { icon: 20, text: "text-xl", box: "h-8 w-8" },
  };

  const textColor = variant === "light" ? "text-foreground" : "text-card-foreground";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`flex ${sizes[size].box} items-center justify-center rounded-lg bg-primary`}>
        <Leaf className="text-primary-foreground" size={sizes[size].icon} />
      </div>
      <span className={`font-bold ${sizes[size].text} ${textColor}`}>
        Shop Match
      </span>
    </div>
  );
};

export default ShopMatchLogo;