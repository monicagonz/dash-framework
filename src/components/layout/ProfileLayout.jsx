import ProfileHeader from "./ProfileHeader";

const ProfileLayout = ({ children, activeTab }) => {
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