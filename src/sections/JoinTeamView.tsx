import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "@/state/AppContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function JoinTeamView() {
  const { state, dispatch, getCurrentProfile } = useApp();
  const currentUser = getCurrentProfile();
  const currentUserId = currentUser?.userId || "";
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code")?.trim().toUpperCase();

    if (!code || !currentUserId) {
      return;
    }

    const targetRoom = state.teamRooms.find((room) => room.inviteCode === code);

    if (!targetRoom || targetRoom.memberIds.includes(currentUserId)) {
      return;
    }

    dispatch({
      type: "JOIN_TEAM_ROOM",
      payload: { roomId: targetRoom.id, userId: currentUserId },
    });
  }, [currentUserId, dispatch, location.search, state.teamRooms]);

  const query = new URLSearchParams(location.search);
  const code = query.get("code")?.trim().toUpperCase();

  let roomName: string | null = null;
  let status = "";

  if (!code) {
    status = "No invite code found in the URL.";
  } else if (!currentUserId) {
    status = "Please sign in to join the team room.";
  } else {
    const targetRoom = state.teamRooms.find((room) => room.inviteCode === code);

    if (!targetRoom) {
      status = "That invite code is not valid.";
    } else if (targetRoom.memberIds.includes(currentUserId)) {
      roomName = targetRoom.name;
      status = `Already a member of ${targetRoom.name}.`;
    } else {
      roomName = targetRoom.name;
      status = `You’ve joined ${targetRoom.name} successfully.`;
    }
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-[#0c1224]/90 p-8 shadow-2xl shadow-cyan-500/10">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="w-7 h-7 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-semibold">Team Invite</h1>
            <p className="text-sm text-slate-400">
              Join the developer chat room that was shared with you.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827]/80 p-6 space-y-4">
          <p className="text-sm text-slate-300">{status}</p>
          {roomName && (
            <div className="rounded-3xl bg-slate-950/90 p-4 border border-cyan-500/10">
              <p className="text-xs text-slate-500 uppercase tracking-[0.2em]">
                Team room
              </p>
              <p className="mt-2 text-white font-semibold">{roomName}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button onClick={() => navigate("/")} size="lg">
            Go to Dashboard
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/", { replace: true })}
          >
            <ArrowRight className="w-4 h-4" /> Open Overview
          </Button>
        </div>
      </div>
    </div>
  );
}
