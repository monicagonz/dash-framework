import { ReactNode } from "react";
import ProfileHeader from "./ProfileHeader";

interface ProfileLayoutProps {
  children: ReactNode;
  activeTab?: string;
}

const ProfileLayout = ({ children, activeTab }: ProfileLayoutProps) => {
  return (
    <div className="min-h-screen gradient-bg">
      <div className="mx-auto max-w-lg">
        <ProfileHeader activeTab={activeTab} />
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
