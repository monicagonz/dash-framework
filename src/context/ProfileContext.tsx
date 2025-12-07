import { createContext, useContext, useState, ReactNode } from "react";

export interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  totalSales: number;
  activeListings: number;
  sellerRating: number;
  notifications: boolean;
}

interface ProfileContextType {
  profile: ProfileData;
  updateProfile: (updates: Partial<ProfileData>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const initialProfile: ProfileData = {
  fullName: "Carlos Mendoza",
  email: "carlos@example.com",
  phone: "+52 555 123 4567",
  address: "Ciudad de México, MX",
  totalSales: 15400,
  activeListings: 85,
  sellerRating: 4.8,
  notifications: true,
};

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);

  const updateProfile = (updates: Partial<ProfileData>) => {
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
