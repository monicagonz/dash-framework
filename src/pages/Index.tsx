import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir al login por defecto
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Index;
