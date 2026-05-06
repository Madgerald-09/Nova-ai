import { useApp } from "@/state/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Bell, Zap, RefreshCw, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TopNav() {
  const { state, dispatch, unreadCount, runMatching } = useApp();
  const isMobile = useIsMobile();

  return (
    <header
      className="fixed top-0 right-0 left-0 z-40 h-16 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 lg:px-6 transition-all duration-300"
      style={
        isMobile
          ? { marginLeft: "0" }
          : { marginLeft: state.sidebarCollapsed ? "64px" : "240px" }
      }
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
          className="md:hidden p-2 rounded-md hover:bg-white/5 transition-colors"
        >
          <Menu className="w-5 h-5 text-[#9ca3af]" />
        </button>
        <div className="flex items-center gap-2 lg:hidden">
          <img
            src="/Picsart_26-04-10_14-37-41-214.png"
            alt="NOVA Logo"
            className="w-6 h-6 object-contain bg-[#0a0a0a] rounded-md p-0.5"
          />
          <span className="font-['Space_Grotesk'] font-bold text-xl text-[#22d3ee] tracking-tight">
            NOVA
          </span>
        </div>
        <span className="hidden lg:block text-sm text-[#6b7280] capitalize">
          {state.activeTab.replace("-", " ")}
        </span>
      </div>
      <div className="flex-1"></div>{" "}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={runMatching}
          disabled={state.engineStatus === "processing"}
          className="hidden sm:flex items-center gap-2 bg-transparent border-[#22d3ee]/30 text-[#22d3ee] hover:bg-[#22d3ee]/10 hover:border-[#22d3ee]/50 rounded-full text-xs font-medium"
        >
          {state.engineStatus === "processing" ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Zap className="w-3.5 h-3.5" />
          )}
          {state.engineStatus === "processing"
            ? "Processing..."
            : "Run Matching"}
        </Button>

        <button
          onClick={() => dispatch({ type: "TOGGLE_NOTIFICATIONS" })}
          className="relative p-2 rounded-md hover:bg-white/5 transition-colors"
        >
          <Bell className="w-5 h-5 text-[#9ca3af]" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#f59e0b] rounded-full flex items-center justify-center text-[10px] font-bold text-[#030712]">
              {unreadCount}
            </span>
          )}
        </button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.location.reload()}
          className="ml-2 hidden sm:flex items-center gap-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full text-xs font-medium"
        >
          <LogOut className="w-3.5 h-3.5" />
          Logout
        </Button>
      </div>
    </header>
  );
}
