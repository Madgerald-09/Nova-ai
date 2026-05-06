import { useMemo, useState } from "react";
import { useApp } from "@/state/AppContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Link2,
  MessageCircle,
  Pin,
  Users,
  ShieldCheck,
  Trash2,
  Plus,
} from "lucide-react";

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

function buildInviteCode() {
  return `DEV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function TeamChatView() {
  const { state, dispatch, getBuilder, getCurrentProfile } = useApp();
  const currentUser = getCurrentProfile();
  const currentUserId = currentUser?.userId || "";

  const leaderRoom = state.teamRooms.find(
    (room) => room.leaderId === currentUserId,
  );
  const memberRoom = state.teamRooms.find((room) =>
    room.memberIds.includes(currentUserId),
  );
  const room = leaderRoom || memberRoom;
  const isLeader = room?.leaderId === currentUserId;

  const [roomName, setRoomName] = useState("Developer Team");
  const [roomDescription, setRoomDescription] = useState(
    "A private channel for developer discussions, code review, and progress updates.",
  );
  const [joinCode, setJoinCode] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const roomMessages = useMemo(() => {
    return room
      ? state.teamMessages
          .filter((msg) => msg.roomId === room.id)
          .sort((a, b) => a.createdAt - b.createdAt)
      : [];
  }, [room, state.teamMessages]);

  const pinnedMessages = useMemo(
    () => roomMessages.filter((message) => message.pinned),
    [roomMessages],
  );

  const members = useMemo(() => {
    if (!room) return [];
    return room.memberIds
      .map(
        (id) =>
          getBuilder(id) ||
          state.companies.find((company) => company.userId === id),
      )
      .filter((member): member is NonNullable<typeof member> => Boolean(member));
  }, [room, getBuilder, state.companies]);

  const inviteLink = room
    ? `${window.location.origin}/join?code=${encodeURIComponent(room.inviteCode)}`
    : "";
  const qrSrc = room
    ? `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(inviteLink)}`
    : "";

  const handleCreateRoom = () => {
    if (!currentUserId) {
      setStatusMessage("You must be signed in to create a team room.");
      return;
    }

    const inviteCode = buildInviteCode();
    const newRoom = {
      id: makeId(),
      name: roomName.trim() || "Developer Team",
      description:
        roomDescription.trim() ||
        "Shared team room for your development group.",
      leaderId: currentUserId,
      inviteCode,
      memberIds: [currentUserId],
      createdAt: Date.now(),
    };

    dispatch({ type: "CREATE_TEAM_ROOM", payload: newRoom });
    setStatusMessage("Team room created — share the QR invite with your team.");
  };

  const handleJoinRoom = () => {
    if (!currentUserId) {
      setStatusMessage("You must be signed in to join a team.");
      return;
    }
    if (!joinCode.trim()) {
      setStatusMessage("Enter a valid invite code first.");
      return;
    }

    const normalized = joinCode.trim().toUpperCase();
    const targetRoom = state.teamRooms.find(
      (room) => room.inviteCode === normalized,
    );

    if (!targetRoom) {
      setStatusMessage("Invite code not found. Check the code and try again.");
      return;
    }
    if (targetRoom.memberIds.includes(currentUserId)) {
      setStatusMessage("You are already a member of this team.");
      return;
    }

    dispatch({
      type: "JOIN_TEAM_ROOM",
      payload: { roomId: targetRoom.id, userId: currentUserId },
    });
    setStatusMessage(
      `Joined ${targetRoom.name}. Open Team Chat to start messaging.`,
    );
    setJoinCode("");
  };

  const handleSendMessage = () => {
    if (!room) {
      setStatusMessage("Join or create a room to send messages.");
      return;
    }
    if (!chatInput.trim()) {
      return;
    }

    if (!room.memberIds.includes(currentUserId)) {
      setStatusMessage("Only room members can send messages.");
      return;
    }

    const message = {
      id: makeId(),
      roomId: room.id,
      authorId: currentUserId,
      authorName: currentUser?.fullName || currentUser?.username || "Guest",
      content: chatInput.trim(),
      createdAt: Date.now(),
      pinned: false,
    };

    dispatch({ type: "SEND_TEAM_MESSAGE", payload: message });
    setChatInput("");
  };

  const handleCopyInvite = async () => {
    if (!inviteLink) return;
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopyStatus("Copied!");
      window.setTimeout(() => setCopyStatus(""), 2000);
    } catch {
      setCopyStatus("Unable to copy.");
    }
  };

  const handleTogglePin = (messageId: string) => {
    dispatch({ type: "TOGGLE_PIN_TEAM_MESSAGE", payload: messageId });
  };

  const handleRemoveMember = (memberId: string) => {
    if (!room) return;
    dispatch({
      type: "REMOVE_TEAM_MEMBER",
      payload: { roomId: room.id, userId: memberId },
    });
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-semibold text-white mb-2">
            Team Chat & QR Invites
          </h1>
          <p className="text-[#849495] text-sm md:text-base">
            Create a developer chat room, generate a QR invite code, and add
            teammates to collaborate on code, progress updates, and pinned
            notes.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" size="lg" onClick={handleCreateRoom}>
            <Plus className="w-4 h-4" /> Create Room
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="glass-card rounded-3xl p-6 bg-[#0f172a]/90 border border-white/10">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Team Room</h2>
              <p className="text-sm text-slate-400">
                Create a room and invite members with a QR code or invite code.
              </p>
            </div>
            <MessageCircle className="w-6 h-6 text-cyan-400" />
          </div>
          {room ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-slate-500 uppercase tracking-[0.2em]">
                  Room name
                </h3>
                <p className="mt-2 text-white font-semibold">{room.name}</p>
              </div>
              <div>
                <h3 className="text-sm text-slate-500 uppercase tracking-[0.2em]">
                  Description
                </h3>
                <p className="mt-2 text-slate-200 text-sm">
                  {room.description}
                </p>
              </div>
              <div className="rounded-3xl bg-slate-950/70 border border-white/10 p-4">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-[0.2em]">
                      Invite code
                    </p>
                    <p className="mt-2 text-white font-semibold">
                      {room.inviteCode}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyInvite}
                  >
                    <Copy className="w-4 h-4" /> {copyStatus || "Copy Link"}
                  </Button>
                </div>
                <div className="text-xs text-slate-400 break-all">
                  {inviteLink}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[auto_1fr] items-center">
                <img
                  src={qrSrc}
                  alt="Team invite QR code"
                  className="w-full max-w-[260px] rounded-3xl border border-white/10 bg-white/5"
                />
                <div className="space-y-2">
                  <p className="text-sm text-slate-400">
                    Scan this code or share the invite link to let your
                    teammates join automatically.
                  </p>
                  <p className="text-xs text-slate-500">
                    Only the team creator can remove members and pin messages.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-400 block">
                  Room Name
                </label>
                <Input
                  value={roomName}
                  onChange={(event) => setRoomName(event.target.value)}
                  className="bg-[#0A0C10] border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400 block">
                  Room Description
                </label>
                <Textarea
                  rows={3}
                  value={roomDescription}
                  onChange={(event) => setRoomDescription(event.target.value)}
                  className="bg-[#0A0C10] border-white/10 text-white"
                />
              </div>
              <Button onClick={handleCreateRoom} size="lg">
                Create Developer Room
              </Button>
            </div>
          )}
        </div>

        <div className="glass-card rounded-3xl p-6 bg-[#0f172a]/90 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Team Members</h2>
              <p className="text-sm text-slate-400">
                Active members with access to this room.
              </p>
            </div>
            <Users className="w-6 h-6 text-cyan-400" />
          </div>
          {room ? (
            <div className="space-y-3">
              {members.length ? (
                members.map((member) => (
                  <div
                    key={member.userId}
                    className="flex items-center justify-between gap-3 rounded-3xl bg-slate-950/80 border border-white/10 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center text-slate-400">
                        <img
                          src={
                            member.avatarUrl ||
                            "/Picsart_26-04-10_14-37-41-214.png"
                          }
                          alt={member.fullName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {member.fullName}
                        </p>
                        <p className="text-xs text-slate-500">
                          @{member.username}
                        </p>
                      </div>
                    </div>
                    {isLeader && member.userId !== currentUserId ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveMember(member.userId)}
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </Button>
                    ) : (
                      <span className="text-xs text-slate-500">
                        {member.userId === currentUserId ? "Leader" : "Member"}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400">
                  No members yet. Share your room invite with teammates.
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-400">
              Create a team room first to manage members and share the invite.
            </p>
          )}
        </div>

        <div className="glass-card rounded-3xl p-6 bg-[#0f172a]/90 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Join with Code
              </h2>
              <p className="text-sm text-slate-400">
                Enter an invite code to join a developer room.
              </p>
            </div>
            <Link2 className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="space-y-4">
            <Input
              value={joinCode}
              onChange={(event) => setJoinCode(event.target.value)}
              placeholder="Enter invite code"
              className="bg-[#0A0C10] border-white/10 text-white"
            />
            <Button onClick={handleJoinRoom} size="lg">
              Join Room
            </Button>
            {statusMessage && (
              <p className="text-sm text-slate-400">{statusMessage}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="glass-card rounded-3xl p-6 bg-[#0f172a]/90 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Team Chat</h2>
              <p className="text-sm text-slate-400">
                Send updates, share progress, and pin important messages.
              </p>
            </div>
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
          </div>

          {room ? (
            <>
              <div className="space-y-3 mb-6">
                {pinnedMessages.length ? (
                  <div className="rounded-3xl bg-slate-950/80 border border-cyan-500/10 p-4">
                    <div className="flex items-center gap-2 text-cyan-300 text-xs uppercase tracking-[0.15em] mb-3">
                      <Pin className="w-4 h-4" /> Pinned messages
                    </div>
                    {pinnedMessages.map((message) => (
                      <div
                        key={message.id}
                        className="space-y-1 border-b border-white/5 pb-3 last:border-0 last:pb-0"
                      >
                        <p className="text-sm text-white">{message.content}</p>
                        <p className="text-xs text-slate-500">
                          {message.authorName}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-3xl bg-slate-950/80 border border-white/10 p-4 text-sm text-slate-400">
                    No pinned messages yet. Pin important updates from the
                    message list.
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {roomMessages.length ? (
                  roomMessages.map((message) => {
                    return (
                      <div
                        key={message.id}
                        className="rounded-3xl bg-slate-950/80 border border-white/10 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm text-white">
                              {message.content}
                            </p>
                            <p className="mt-2 text-xs text-slate-500">
                              {message.authorName}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {isLeader && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleTogglePin(message.id)}
                              >
                                <Pin className="w-4 h-4" />{" "}
                                {message.pinned ? "Unpin" : "Pin"}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="rounded-3xl bg-slate-950/80 border border-white/10 p-6 text-sm text-slate-400">
                    Start the conversation by sending the first message.
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-4">
                <Textarea
                  rows={3}
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  placeholder="Write a message to your team..."
                  className="bg-[#0A0C10] border-white/10 text-white"
                />
                <Button onClick={handleSendMessage} size="lg">
                  Send Message
                </Button>
              </div>
            </>
          ) : (
            <div className="rounded-3xl bg-slate-950/80 border border-white/10 p-6 text-sm text-slate-400">
              Create or join a room to start chatting with your team.
            </div>
          )}
        </div>

        <div className="glass-card rounded-3xl p-6 bg-[#0f172a]/90 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Team Status</h2>
              <p className="text-sm text-slate-400">
                Admin actions and member controls.
              </p>
            </div>
            <Users className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-950/80 border border-white/10 p-4">
              <p className="text-sm text-slate-400">Leader</p>
              <p className="mt-2 text-white font-semibold">
                {room?.leaderId === currentUserId
                  ? "You"
                  : currentUser?.fullName}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 border border-white/10 p-4">
              <p className="text-sm text-slate-400">Room members</p>
              <p className="mt-2 text-white font-semibold">{members.length}</p>
            </div>
            {room && isLeader && (
              <div className="rounded-3xl bg-slate-950/80 border border-white/10 p-4">
                <p className="text-sm text-slate-400">Admin</p>
                <p className="mt-2 text-white">
                  As leader, you can pin messages and remove members.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
