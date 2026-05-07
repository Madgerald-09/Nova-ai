import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/state/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { TopNav } from "@/components/TopNav";
import { RoleSidebar } from "@/components/RoleSidebar";
import { NotificationPanel } from "@/components/NotificationPanel";
import { ProfileEditModal } from "@/components/ProfileEditModal";
import { BuilderOverview } from "@/sections/BuilderOverview";
import { CompanyOverview } from "@/sections/CompanyOverview";
import { AdminOverview } from "@/sections/AdminOverview";
import { ProjectsView } from "@/sections/ProjectsView";
import { OpportunitiesView } from "@/sections/OpportunitiesView";
import { ApplicantsView } from "@/sections/ApplicantsView";
import { ProfileView } from "@/sections/ProfileView";
import { AdminUsersView } from "@/sections/AdminUsersView";
import { AdminMatchingView } from "@/sections/AdminMatchingView";
import { PostProjectView } from "@/sections/PostProjectView";
import { BuilderProfileView } from "@/sections/BuilderProfileView";
import { PortfolioView } from "@/sections/PortfolioView";
import { ReputationOverviewView } from "@/sections/ReputationOverviewView";
import { ReputationDeepDiveView } from "@/sections/ReputationDeepDiveView";
import { TeamChatView } from "@/sections/TeamChatView";

export default function Overview() {
  const { state } = useApp();
  const isMobile = useIsMobile();
  const { userRole, activeTab } = state;

  // Calculate margin based on mobile and sidebar state
  const getMarginLeft = () => {
    if (isMobile) return "ml-0";
    return state.sidebarCollapsed ? "ml-16" : "ml-60";
  };

  const renderContent = () => {
    // Builder routes
    if (userRole === "builder") {
      switch (activeTab) {
        case "overview":
          return <BuilderOverview />;
        case "portfolio":
          return <PortfolioView />;
        case "analytics":
          return <ReputationDeepDiveView />;
        case "reputation":
          return <ReputationOverviewView />;
        case "profile":
          return <BuilderProfileView />;
        case "network":
          return <BuilderOverview />;
        case "team-chat":
          return <TeamChatView />;
        case "projects":
          return <ProjectsView />;
        case "opportunities":
          return <OpportunitiesView />;
        default:
          return <BuilderOverview />;
      }
    }

    // Company routes
    if (userRole === "company") {
      switch (activeTab) {
        case "overview":
          return <CompanyOverview />;
        case "projects":
          return <ProjectsView />;
        case "applicants":
          return <ApplicantsView />;
        case "post-project":
          return <PostProjectView />;
        case "profile":
          return <ProfileView />;
        default:
          return <CompanyOverview />;
      }
    }

    // Admin routes
    if (userRole === "admin") {
      switch (activeTab) {
        case "overview":
          return <AdminOverview />;
        case "users":
          return <AdminUsersView />;
        case "projects":
          return <ProjectsView />;
        case "matching":
          return <AdminMatchingView />;
        case "profile":
          return <ProfileView />;
        default:
          return <AdminOverview />;
      }
    }

    return <BuilderOverview />;
  };

  const contentKey = `${state.userRole}-${activeTab}`;

  return (
    <div className="min-h-screen bg-black text-[#f9fafb] flex">
      <RoleSidebar />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-out ${getMarginLeft()}`}
      >
        <TopNav />
        <main className="flex-1 overflow-auto pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={contentKey}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      {state.showNotifications && <NotificationPanel />}
      {state.showProfileEdit && <ProfileEditModal />}
    </div>
  );
}
