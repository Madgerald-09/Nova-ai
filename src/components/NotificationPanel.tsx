import { useApp } from "@/state/AppContext";
import {
  X,
  CheckCircle,
  Zap,
  AlertCircle,
  MessageSquare,
  User,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMemo } from "react";

export function NotificationPanel() {
  const { state, dispatch } = useApp();

  // eslint-disable-next-line react-hooks/purity
  const now = useMemo(() => Date.now(), []);

  const getIcon = (type: string) => {
    switch (type) {
      case "match":
        return <CheckCircle className="w-4 h-4 text-[#10b981]" />;
      case "application":
        return <User className="w-4 h-4 text-[#8b5cf6]" />;
      case "message":
        return <MessageSquare className="w-4 h-4 text-[#22d3ee]" />;
      default:
        return <Zap className="w-4 h-4 text-[#f59e0b]" />;
    }
  };

  const formatTime = (timestamp: number, now: number) => {
    const diff = now - timestamp;
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  return (
    <div className="fixed right-0 top-16 bottom-0 w-80 bg-[#0a0f1c] border-l border-[#1f2937] z-50 flex flex-col animate-fade-in-up">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f2937]">
        <h3 className="font-['Space_Grotesk'] font-semibold text-sm">
          Notifications
        </h3>
        <button
          onClick={() => dispatch({ type: "TOGGLE_NOTIFICATIONS" })}
          className="p-1.5 rounded-md hover:bg-[#111827] transition-colors"
        >
          <X className="w-4 h-4 text-[#9ca3af]" />
        </button>
      </div>

      <ScrollArea className="flex-1">
        {state.notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-[#6b7280]">
            <AlertCircle className="w-8 h-8 mb-3 opacity-50" />
            <p className="text-sm">No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-[#1f2937]">
            {state.notifications.map((notif) => (
              <button
                key={notif.id}
                onClick={() =>
                  dispatch({
                    type: "MARK_NOTIFICATION_READ",
                    payload: notif.id,
                  })
                }
                className={`w-full flex items-start gap-3 px-4 py-3 hover:bg-[#111827] transition-colors text-left ${
                  !notif.read ? "bg-[#111827]/50" : ""
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm ${!notif.read ? "text-[#f9fafb] font-medium" : "text-[#9ca3af]"}`}
                  >
                    {notif.title}
                  </p>
                  <p className="text-xs text-[#6b7280] mt-0.5 line-clamp-2">
                    {notif.message}
                  </p>
                  <p className="text-[10px] text-[#4b5563] mt-1">
                    {formatTime(notif.createdAt, now)}
                  </p>
                </div>
                {!notif.read && (
                  <span className="w-2 h-2 bg-[#22d3ee] rounded-full flex-shrink-0 mt-1.5" />
                )}
              </button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
