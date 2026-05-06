import { useState, useRef, type ChangeEvent } from "react";
import { useApp } from "@/state/AppContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { BuilderProfile } from "@/types";

export function BuilderProfileView() {
  const { state, dispatch } = useApp();
  const builder =
    state.builders.find((b) => b.userId === state.currentUser?.userId) ||
    state.builders[0];

  const [builderForm, setBuilderForm] = useState<Partial<BuilderProfile>>(
    builder || {},
  );
  const [copyStatus, setCopyStatus] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Remove the useEffect that was causing cascading renders

  const profileUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/profile/${builder?.userId ?? ""}`
      : `/profile/${builder?.userId ?? ""}`;

  const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setBuilderForm({ ...builderForm, avatarUrl: result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!builder) return;
    const updated: BuilderProfile = {
      ...builder,
      ...builderForm,
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: "UPDATE_BUILDER", payload: updated });
    setCopyStatus("Saved");
    window.setTimeout(() => setCopyStatus(""), 2000);
  };

  const handleCancel = () => {
    setBuilderForm(builder || {});
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopyStatus("Link copied");
    } catch {
      setCopyStatus("Unable to copy");
    }
    window.setTimeout(() => setCopyStatus(""), 2000);
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto animate-fade-in-up">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-semibold text-white mb-2 break-words">
            Builder Profile Settings
          </h1>
          <p className="text-[#849495] font-['Inter'] text-sm md:text-base break-words">
            Manage your public presence, upload your profile photo, and share a
            link investors can use.
          </p>
        </div>
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 md:px-6 py-2 rounded-lg border border-white/10 text-slate-300 font-['Space_Grotesk'] text-sm md:text-base hover:bg-white/5 transition-all whitespace-nowrap"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 md:px-8 py-2 rounded-lg bg-cyan-400 text-black font-bold font-['Space_Grotesk'] text-sm md:text-base hover:bg-cyan-300 transition-all active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.2)] whitespace-nowrap"
          >
            Save
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
        <div className="col-span-1 lg:col-span-2 glass-card rounded-xl p-4 md:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h2 className="text-base md:text-lg font-semibold text-white font-['Space_Grotesk'] break-words">
                  Shareable Profile Link
                </h2>
                <p className="text-xs md:text-sm text-slate-500 break-words">
                  Copy this URL and send it directly to investors, founders, or
                  collaborators.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3 md:px-4 py-2 rounded-lg bg-white/10 text-slate-200 border border-white/10 hover:bg-white/15 transition-all text-xs md:text-sm whitespace-nowrap flex-shrink-0"
              >
                Copy
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
              <Input
                readOnly
                value={profileUrl}
                className="bg-[#0A0C10] border-white/10 text-white"
              />
              {copyStatus && (
                <div className="px-3 md:px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-300 text-xs md:text-sm font-medium break-words">
                  {copyStatus}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Basic Info Card */}
        <div className="col-span-12 lg:col-span-8 glass-card rounded-xl p-4 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            <div className="relative group flex-shrink-0">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-cyan-400/50 transition-all">
                <img
                  alt=""
                  className="w-full h-full object-cover"
                  src={
                    builderForm.avatarUrl ||
                    builder?.avatarUrl ||
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuDpE6PacmgfLbK6Ic_r7BPwzfkqY-fWQnlenCa1lpB44S6cbFSmihVqo4DbYuzwPjN-Yyla4ToNe3nZFLwsnxnyjwIbIUxzSOF11puV4XDkm59cjQ2U2KFL1SlOqCzZn-DoH03rsmSadMVr2HBEmR7W-mBf_RHJWLYPBJK5zYndb8UQo9NJPMN2fxJv_2L68egNaXbtR7gwdBdiC41jhNpjxyxnS5PNx-FMbkwyaUOIBQc5qCIvgdVbhEGv-ADHN4R0oAQlVP2qwk4"
                  }
                />
              </div>
              <button
                type="button"
                aria-label="Upload profile photo"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 bg-cyan-400 text-black p-2 rounded-lg shadow-lg hover:bg-cyan-300 transition-all"
              >
                <span className="material-symbols-outlined text-sm">click</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                aria-label="Upload profile photo"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>
            <div className="flex-1 space-y-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-['Space_Grotesk'] text-xs font-bold tracking-widest text-cyan-400/80 uppercase">
                    Full Name
                  </label>
                  <Input
                    value={builderForm.fullName || builder?.fullName || ""}
                    onChange={(e) =>
                      setBuilderForm({
                        ...builderForm,
                        fullName: e.target.value,
                      })
                    }
                    className="bg-[#0A0C10] border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-['Space_Grotesk'] text-xs font-bold tracking-widest text-cyan-400/80 uppercase">
                    Username
                  </label>
                  <Input
                    value={builderForm.username || builder?.username || ""}
                    onChange={(e) =>
                      setBuilderForm({
                        ...builderForm,
                        username: e.target.value,
                      })
                    }
                    className="bg-[#0A0C10] border-white/10 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-['Space_Grotesk'] text-xs font-bold tracking-widest text-cyan-400/80 uppercase">
                  Bio
                </label>
                <Textarea
                  rows={3}
                  value={builderForm.bio || builder?.bio || ""}
                  onChange={(e) =>
                    setBuilderForm({ ...builderForm, bio: e.target.value })
                  }
                  className="bg-[#0A0C10] border-white/10 text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Status & Availability */}
        <div className="col-span-12 lg:col-span-4 glass-card rounded-xl p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-['Space_Grotesk'] font-medium text-xl text-white">
                  Availability
                </h3>
                <p className="text-slate-400 text-sm mt-2">
                  When active, your profile is prioritized for investors and
                  project matches.
                </p>
              </div>
              <button
                type="button"
                aria-label="Toggle availability"
                onClick={() =>
                  setBuilderForm({
                    ...builderForm,
                    availabilityStatus:
                      builderForm.availabilityStatus === "available"
                        ? "busy"
                        : "available",
                  })
                }
                className={`w-14 h-7 rounded-full transition-all ${
                  builderForm.availabilityStatus === "available"
                    ? "bg-cyan-500"
                    : "bg-white/10"
                }`}
              >
                <span
                  className={`block w-6 h-6 rounded-full bg-white shadow ${builderForm.availabilityStatus === "available" ? "translate-x-7" : "translate-x-1"} transition-transform`}
                />
              </button>
            </div>
            <div className="p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
              <div className="flex items-center gap-3 text-cyan-400 mb-2">
                <span className="material-symbols-outlined text-sm">bolt</span>
                <span className="font-['Space_Grotesk'] text-xs font-bold tracking-widest uppercase">
                  Status:{" "}
                  {builderForm.availabilityStatus ||
                    builder?.availabilityStatus}
                </span>
              </div>
              <p className="text-slate-300 text-xs">
                {builderForm.availabilityStatus === "busy" ||
                builder?.availabilityStatus === "busy"
                  ? "You are currently not accepting new matches."
                  : "Your profile is open to investor introductions and new projects."}
              </p>
            </div>
          </div>
          <div className="pt-6">
            <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
              <span>Hours Per Week</span>
              <span className="text-white">
                {(builderForm.hoursPerWeek ?? builder?.hoursPerWeek) || 0}h
              </span>
            </div>
            <Input
              type="number"
              min={0}
              max={80}
              value={(builderForm.hoursPerWeek ?? builder?.hoursPerWeek) || 0}
              onChange={(e) =>
                setBuilderForm({
                  ...builderForm,
                  hoursPerWeek: parseInt(e.target.value, 10) || 0,
                })
              }
              className="bg-[#0A0C10] border-white/10 text-white w-full md:w-24"
            />
          </div>
        </div>

        {/* Skill Engine Card */}
        <div className="col-span-12 lg:col-span-7 glass-card rounded-xl p-4 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-['Space_Grotesk'] font-medium text-xl text-white flex items-center gap-3">
              Skill Engine
              <span className="material-symbols-outlined text-cyan-400 text-lg">
                psychology
              </span>
            </h3>
          </div>
          <div className="space-y-6">
            <div className="relative">
              <input
                className="w-full bg-[#0A0C10] border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-all"
                placeholder="Add a skill (e.g. Rust, Solidity, UI Design)..."
                type="text"
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                search
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Solidity", "React", "TypeScript", "Go", "DeFi Protocols"].map(
                (skill) => (
                  <div
                    key={skill}
                    className="px-3 py-1.5 rounded-md bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-sm flex items-center gap-2"
                  >
                    {skill}{" "}
                    <span className="material-symbols-outlined text-xs cursor-pointer hover:text-white">
                      close
                    </span>
                  </div>
                ),
              )}
            </div>
            <div className="pt-6 border-t border-white/5">
              <p className="font-['Space_Grotesk'] text-xs font-bold tracking-widest text-slate-500 mb-4 uppercase">
                AI Suggestions Based On Your Reputation
              </p>
              <div className="flex flex-wrap gap-2">
                {["Zero Knowledge", "Rust", "Hardhat", "Foundry"].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      className="px-3 py-1.5 rounded-md border border-white/10 text-slate-400 text-sm hover:border-cyan-400/50 hover:text-white transition-all"
                    >
                      + {suggestion}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Experience Level */}
        <div className="col-span-12 lg:col-span-5 glass-card rounded-xl p-8">
          <h3 className="font-['Space_Grotesk'] font-medium text-xl text-white mb-8">
            Experience Level
          </h3>
          <div className="space-y-4">
            {[
              {
                id: "novice",
                label: "Novice",
                desc: "1-2 years experience. Still learning core protocols.",
                active: false,
              },
              {
                id: "adept",
                label: "Adept",
                desc: "2-5 years experience. Confident shipping production code.",
                active: false,
              },
              {
                id: "expert",
                label: "Expert",
                desc: "5-8 years experience. Lead developer on major projects.",
                active: true,
              },
              {
                id: "master",
                label: "Master",
                desc: "8+ years experience. Ecosystem visionary and architect.",
                active: false,
              },
            ].map((lvl) => (
              <label
                key={lvl.id}
                className={`flex items-center p-4 rounded-xl border ${lvl.active ? "border-cyan-400/50 bg-cyan-400/5" : "border-white/10 hover:border-cyan-400/30 bg-white/5"} cursor-pointer group transition-all`}
              >
                <input
                  type="radio"
                  name="exp"
                  className="hidden"
                  defaultChecked={lvl.active}
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 ${lvl.active ? "border-cyan-400" : "border-slate-600 group-hover:border-cyan-400"} flex items-center justify-center mr-4`}
                >
                  <div
                    className={`w-2.5 h-2.5 bg-cyan-400 rounded-full transition-transform ${lvl.active ? "scale-100" : "scale-0"}`}
                  ></div>
                </div>
                <div className="flex-1">
                  <div
                    className={`font-bold font-['Space_Grotesk'] ${lvl.active ? "text-cyan-400" : "text-white"}`}
                  >
                    {lvl.label}
                  </div>
                  <div
                    className={`text-xs ${lvl.active ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {lvl.desc}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Connect Accounts Section */}
        <div className="col-span-12 glass-card rounded-xl p-8 mb-20">
          <h3 className="font-['Space_Grotesk'] font-medium text-xl text-white mb-8">
            Connected Identities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#0A0C10] border border-white/10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined opacity-80 text-white text-2xl">
                    code
                  </span>
                  <span className="font-bold text-white font-['Space_Grotesk']">
                    GitHub
                  </span>
                </div>
                <span className="px-2 py-1 bg-[#5efb6a]/10 text-[#5efb6a] text-[10px] font-black rounded uppercase tracking-wider">
                  Synced
                </span>
              </div>
              <p className="text-slate-500 text-sm">@arivera-dev</p>
              <button className="w-full py-2 rounded-lg border border-white/10 text-slate-300 text-sm hover:bg-white/5 transition-all">
                Manage Sync
              </button>
            </div>
            <div className="p-6 rounded-xl bg-[#0A0C10] border border-white/10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined opacity-80 text-white text-2xl">
                    design_services
                  </span>
                  <span className="font-bold text-white font-['Space_Grotesk']">
                    Figma
                  </span>
                </div>
                <span className="px-2 py-1 bg-slate-800 text-slate-400 text-[10px] font-black rounded uppercase tracking-wider">
                  Disconnected
                </span>
              </div>
              <p className="text-slate-500 text-sm">
                Showcase design contributions
              </p>
              <button className="w-full py-2 rounded-lg bg-white/5 text-white text-sm hover:bg-white/10 transition-all font-bold">
                Connect Figma
              </button>
            </div>
            <div className="p-6 rounded-xl bg-[#0A0C10] border border-white/10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined opacity-80 text-white text-2xl">
                    work
                  </span>
                  <span className="font-bold text-white font-['Space_Grotesk']">
                    LinkedIn
                  </span>
                </div>
                <span className="px-2 py-1 bg-[#5efb6a]/10 text-[#5efb6a] text-[10px] font-black rounded uppercase tracking-wider">
                  Synced
                </span>
              </div>
              <p className="text-slate-500 text-sm">alex-rivera-architect</p>
              <button className="w-full py-2 rounded-lg border border-white/10 text-slate-300 text-sm hover:bg-white/5 transition-all">
                Manage Sync
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Global Floating Action Button */}
      <div className="fixed bottom-10 right-10">
        <button className="w-16 h-16 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-110 transition-transform active:scale-95">
          <span className="material-symbols-outlined text-3xl font-bold">
            {/* auto_awesome */}
          </span>
        </button>
      </div>
    </div>
  );
}
