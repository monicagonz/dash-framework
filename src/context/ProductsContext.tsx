import { createContext, useContext, useState, ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  description?: string;
  sku?: string;
  price: number;
  stock: number;
  status: "Activo" | "Agotado" | "Bajo Stock";
  image?: string;
  images?: string[];
}

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "status">) => void;
  updateProduct: (id: number, product: Partial<Omit<Product, "id">>) => void;
  deleteProduct: (id: number) => void;
  getProduct: (id: number) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const initialProducts: Product[] = [
  { id: 1, name: "Cámara Vintage 35mm", price: 299.99, stock: 5, status: "Activo", sku: "CAM-001" },
  { id: 2, name: "Lente 50mm f/1.8", price: 149.99, stock: 12, status: "Activo", sku: "LEN-001" },
  { id: 3, name: "Trípode Profesional", price: 89.99, stock: 0, status: "Agotado", sku: "TRI-001" },
  { id: 4, name: "Flash Externo", price: 199.99, stock: 3, status: "Bajo Stock", sku: "FLA-001" },
];

const getStatus = (stock: number): Product["status"] => {
  if (stock === 0) return "Agotado";
  if (stock <= 5) return "Bajo Stock";
  return "Activo";
};

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Omit<Product, "id" | "status">) => {
    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    const newProduct: Product = {
      ...product,
      id: newId,
      status: getStatus(product.stock),
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: number, updates: Partial<Omit<Product, "id">>) => {
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

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const getProduct = (id: number) => {
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
