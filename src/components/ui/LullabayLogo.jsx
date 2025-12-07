import { Leaf } from "lucide-react";

const LullabayLogo = ({ className = "", size = "md", variant = "light" }) => {
  const sizes = {
    sm: { icon: 16, text: "text-lg" },
    md: { icon: 20, text: "text-xl" },
    lg: { icon: 28, text: "text-2xl" },
  };

  const textColor = variant === "light" ? "text-foreground" : "text-card-foreground";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <Leaf className="text-primary-foreground" size={sizes[size].icon} />
      </div>
      <span className={`font-bold ${sizes[size].text} ${textColor}`}>
        Lullaby
      </span>
    </div>
  );
};

export default LullabayLogo;