import { useApp } from "@/state/AppContext";
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
  const { userRole, activeTab } = state;

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

  return (
    <div className="min-h-screen bg-black text-[#f9fafb] flex">
      <RoleSidebar />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${state.sidebarCollapsed ? "ml-16" : "ml-60"}`}
      >
        <TopNav />
        <main className="flex-1 overflow-auto pt-16">{renderContent()}</main>
      </div>
      {state.showNotifications && <NotificationPanel />}
      {state.showProfileEdit && <ProfileEditModal />}
    </div>
  );
}
