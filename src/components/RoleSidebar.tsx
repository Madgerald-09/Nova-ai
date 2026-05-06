import { useApp } from "@/state/AppContext";
import type { UserRole, TabId } from "@/types";
import {
  LayoutDashboard,
  Briefcase,
  Compass,
  Users,
  UserCircle,
  FolderPlus,
  ClipboardList,
  GitMerge,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

interface NavItem {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

const builderNav: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "portfolio", label: "Portfolio", icon: Briefcase },
  { id: "analytics", label: "Analytics", icon: Compass },
  { id: "reputation", label: "Reputation", icon: UserCircle },
  { id: "network", label: "Network", icon: Users },
  { id: "team-chat", label: "Team Chat", icon: MessageCircle },
  { id: "profile", label: "Profile Settings", icon: UserCircle },
];

const companyNav: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "post-project", label: "Post Project", icon: FolderPlus },
  { id: "projects", label: "My Projects", icon: Briefcase },
  { id: "applicants", label: "Applicants", icon: ClipboardList },
  { id: "profile", label: "Profile", icon: UserCircle },
];

const adminNav: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "matching", label: "Matching", icon: GitMerge },
  { id: "profile", label: "Profile", icon: UserCircle },
];

const navMap: Record<UserRole, NavItem[]> = {
  builder: builderNav,
  company: companyNav,
  admin: adminNav,
};

export function RoleSidebar() {
  const { state, dispatch } = useApp();
  const collapsed = state.sidebarCollapsed;
  const navItems = navMap[state.userRole];

  return (
    <aside
      className={`fixed left-0 top-0 z-50 h-full bg-[#0a0a0a] border-r border-white/5 flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-white/5 gap-2">
        <div
          className={`flex items-center justify-center rounded-lg overflow-hidden bg-[#0a0a0a] p-0.5 ${collapsed ? "w-8 h-8 mx-auto" : "w-8 h-8"}`}
        >
          <img
            src="/Picsart_26-04-10_14-37-41-214.png"
            alt="NOVA Logo"
            className="w-full h-full object-contain"
          />
        </div>
        {!collapsed && (
          <span className="font-['Space_Grotesk'] font-bold text-xl text-[#22d3ee] tracking-tight">
            NOVA
          </span>
        )}
      </div>

      {/* Role indicator */}
      {!collapsed && (
        <div className="px-4 py-2 border-b border-white/5">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-[#22d3ee] border border-white/10 uppercase tracking-wider">
            {state.userRole}
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = state.activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => dispatch({ type: "SET_TAB", payload: item.id })}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white/10 text-[#22d3ee] border border-white/10"
                  : "text-[#9ca3af] hover:text-[#f9fafb] hover:bg-white/5"
              } ${collapsed ? "justify-center" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className="w-[18px] h-[18px] flex-shrink-0"
                strokeWidth={1.5}
              />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-2 border-t border-white/5">
        <button
          onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
          className="w-full flex items-center justify-center p-2 rounded-md text-[#9ca3af] hover:text-[#f9fafb] hover:bg-white/5 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  );
}
