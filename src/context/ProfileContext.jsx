import { createContext, useContext, useState } from "react";

const ProfileContext = createContext(undefined);

const initialProfile = {
  fullName: "Carlos Mendoza",
  email: "carlos@example.com",
  phone: "+52 555 123 4567",
  address: "Ciudad de México, MX",
  totalSales: 15400,
  activeListings: 85,
  sellerRating: 4.8,
  notifications: true,
};

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(initialProfile);

  const updateProfile = (updates) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};