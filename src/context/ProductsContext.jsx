import { createContext, useContext, useState } from "react";

const ProductsContext = createContext(undefined);

const initialProducts = [
  { id: 1, name: "Cámara Vintage 35mm", price: 299.99, stock: 5, status: "Activo", sku: "CAM-001", category: "Cámaras" },
  { id: 2, name: "Lente 50mm f/1.8", price: 149.99, stock: 12, status: "Activo", sku: "LEN-001", category: "Lentes" },
  { id: 3, name: "Trípode Profesional", price: 89.99, stock: 0, status: "Agotado", sku: "TRI-001", category: "Accesorios" },
  { id: 4, name: "Flash Externo", price: 199.99, stock: 3, status: "Bajo Stock", sku: "FLA-001", category: "Iluminación" },
];

const getStatus = (stock) => {
  if (stock === 0) return "Agotado";
  if (stock <= 5) return "Bajo Stock";
  return "Activo";
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);

  const addProduct = (product) => {
    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    const newProduct = {
      ...product,
      id: newId,
      status: getStatus(product.stock),
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id, updates) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updates };
          if (updates.stock !== undefined) {
            updated.status = getStatus(updates.stock);
          }
          return updated;
        }
        return p;
      })
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const getProduct = (id) => {
    return products.find((p) => p.id === id);
  };

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, getProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};