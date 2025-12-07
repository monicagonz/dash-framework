import ProfileSidebar from "./ProfileSidebar";

const ProfileLayout = ({ children, activeTab }) => {
  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-primary/3 rounded-full blur-2xl" />
      </div>

      {/* Sidebar */}
      <ProfileSidebar activeTab={activeTab} />

      {/* Main content area */}
      <main className="ml-64 min-h-screen p-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ProfileLayout;