import { useApp } from "@/state/AppContext";

export function ReputationOverviewView() {
  const { state } = useApp();
  const builder =
    state.builders.find((b) => b.userId === state.currentUser?.userId) ||
    state.builders[0];

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in-up">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-8">
        <div>
          <h1 className="font-['Space_Grotesk'] text-5xl font-bold text-white mb-2">
            Identity Hub
          </h1>
          <p className="text-slate-400 font-['Inter'] text-lg max-w-xl">
            Tracking your architectural influence and construction velocity in
            the ecosystem.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="glass-card px-6 py-4 rounded-xl text-center">
            <div className="text-cyan-400 font-['Space_Grotesk'] text-xs font-bold tracking-widest uppercase mb-1">
              Streak
            </div>
            <div className="text-white font-['Space_Grotesk'] text-2xl font-medium">
              14 Days
            </div>
          </div>
          <div className="glass-card px-6 py-4 rounded-xl text-center border-cyan-400/30">
            <div className="text-cyan-400 font-['Space_Grotesk'] text-xs font-bold tracking-widest uppercase mb-1">
              Rank
            </div>
            <div className="text-white font-['Space_Grotesk'] text-2xl font-medium">
              #42
            </div>
          </div>
        </div>
      </div>

      {/* Bento Layout */}
      <div className="grid grid-cols-12 gap-6 pb-20">
        {/* Left: Identity Snapshot */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="glass-card p-8 rounded-2xl neon-glow">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <img
                  alt="User Profile"
                  className="w-20 h-20 rounded-full border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,245,255,0.4)] object-cover"
                  src={builder?.avatarUrl || ""}
                />
                <div className="absolute -bottom-1 -right-1 bg-cyan-400 text-black rounded-full p-1 border-2 border-[#0A0C10]">
                  <span className="material-symbols-outlined text-xs font-bold">
                    verified
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-white font-['Space_Grotesk'] text-lg lg:text-2xl font-medium mb-1 break-words">
                  {builder?.fullName || "Builder"}
                </h2>
                <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 px-2 py-1 rounded-full text-[10px] font-['Space_Grotesk'] font-bold tracking-widest uppercase inline-block">
                  {builder?.experienceLevel || "Developer"}
                </span>
              </div>
            </div>
            <p className="text-slate-400 font-['Inter'] mb-8 line-clamp-3 break-words text-sm">
              {builder?.bio || "Builder in the ecosystem."}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="text-slate-500 font-['Space_Grotesk'] text-[10px] font-bold tracking-widest uppercase mb-1">
                  Reputation Score
                </div>
                <div className="text-white font-['Space_Grotesk'] text-2xl font-medium">
                  {builder?.reputationScore || 0}
                </div>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="text-slate-500 font-['Space_Grotesk'] text-[10px] font-bold tracking-widest uppercase mb-1">
                  Projects Done
                </div>
                <div className="text-white font-['Space_Grotesk'] text-2xl font-medium">
                  {builder?.completedProjects || 0}
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h3 className="text-white font-['Space_Grotesk'] text-2xl font-medium mb-6">
              Reputation Breakdown
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2 gap-2 items-start">
                  <span className="text-slate-300 font-['Space_Grotesk'] text-[9px] font-bold tracking-widest uppercase flex-1 break-words">
                    Project Completion
                  </span>
                  <span className="text-cyan-400 font-['Inter'] font-semibold tracking-wider text-sm flex-shrink-0">
                    94%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 w-[94%] shadow-[0_0_8px_rgba(0,245,255,0.6)]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2 gap-2 items-start">
                  <span className="text-slate-300 font-['Space_Grotesk'] text-[9px] font-bold tracking-widest uppercase flex-1 break-words">
                    Peer Reviews
                  </span>
                  <span className="text-cyan-400 font-['Inter'] font-semibold tracking-wider text-sm flex-shrink-0">
                    88%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 w-[88%] shadow-[0_0_8px_rgba(0,245,255,0.6)]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2 gap-2 items-start">
                  <span className="text-slate-300 font-['Space_Grotesk'] text-[9px] font-bold tracking-widest uppercase flex-1 break-words">
                    Code Quality
                  </span>
                  <span className="text-cyan-400 font-['Inter'] font-semibold tracking-wider text-sm flex-shrink-0">
                    97%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 w-[97%] shadow-[0_0_8px_rgba(0,245,255,0.6)]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center/Right: AI Skill Graph */}
        <div className="col-span-12 lg:col-span-8">
          <div className="glass-card p-8 rounded-2xl h-full flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-['Space_Grotesk'] text-xl lg:text-2xl font-medium mb-1 break-words">
                  AI Skill Topology
                </h3>
                <p className="text-slate-500 text-sm break-words">
                  Real-time analysis of your contribution patterns.
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] lg:text-xs font-['Space_Grotesk'] font-bold tracking-widest uppercase text-white hover:bg-white/10 transition-all whitespace-nowrap">
                  Export
                </button>
                <button className="px-3 py-2 bg-cyan-400 text-black rounded-lg text-[10px] lg:text-xs font-['Space_Grotesk'] font-bold tracking-widest uppercase hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,245,255,0.3)] whitespace-nowrap">
                  Update
                </button>
              </div>
            </div>
            <div className="flex-1 relative radar-grid flex items-center justify-center min-h-[400px]">
              {/* Mock Radar Chart SVG */}
              <svg
                className="w-full max-w-[500px] h-auto drop-shadow-[0_0_20px_rgba(0,245,255,0.2)]"
                viewBox="0 0 400 400"
              >
                <polygon
                  fill="none"
                  points="200,40 340,120 340,280 200,360 60,280 60,120"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                ></polygon>
                <polygon
                  fill="none"
                  points="200,80 305,140 305,260 200,320 95,260 95,140"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                ></polygon>
                <polygon
                  fill="none"
                  points="200,120 270,160 270,240 200,280 130,240 130,160"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                ></polygon>

                <line
                  stroke="rgba(255,255,255,0.05)"
                  x1="200"
                  x2="200"
                  y1="40"
                  y2="360"
                ></line>
                <line
                  stroke="rgba(255,255,255,0.05)"
                  x1="60"
                  x2="340"
                  y1="120"
                  y2="280"
                ></line>
                <line
                  stroke="rgba(255,255,255,0.05)"
                  x1="340"
                  x2="60"
                  y1="120"
                  y2="280"
                ></line>

                <polygon
                  className="filter drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]"
                  fill="rgba(0,245,255,0.15)"
                  points="200,60 320,150 290,260 200,340 80,240 100,100"
                  stroke="rgba(0,245,255,0.8)"
                  strokeWidth="3"
                ></polygon>

                <circle cx="200" cy="60" fill="#fff" r="4"></circle>
                <circle cx="320" cy="150" fill="#fff" r="4"></circle>
                <circle cx="290" cy="260" fill="#fff" r="4"></circle>
                <circle cx="200" cy="340" fill="#fff" r="4"></circle>
                <circle cx="80" cy="240" fill="#fff" r="4"></circle>
                <circle cx="100" cy="100" fill="#fff" r="4"></circle>

                <text
                  fill="#fff"
                  fontFamily="Space Grotesk"
                  fontSize="12"
                  fontWeight="700"
                  textAnchor="middle"
                  x="200"
                  y="30"
                >
                  FRONTEND
                </text>
                <text
                  fill="#fff"
                  fontFamily="Space Grotesk"
                  fontSize="12"
                  fontWeight="700"
                  textAnchor="start"
                  x="350"
                  y="115"
                >
                  BACKEND
                </text>
                <text
                  fill="#fff"
                  fontFamily="Space Grotesk"
                  fontSize="12"
                  fontWeight="700"
                  textAnchor="start"
                  x="350"
                  y="295"
                >
                  DEVOPS
                </text>
                <text
                  fill="#fff"
                  fontFamily="Space Grotesk"
                  fontSize="12"
                  fontWeight="700"
                  textAnchor="middle"
                  x="200"
                  y="380"
                >
                  SECURITY
                </text>
                <text
                  fill="#fff"
                  fontFamily="Space Grotesk"
                  fontSize="12"
                  fontWeight="700"
                  textAnchor="end"
                  x="50"
                  y="295"
                >
                  AI/ML
                </text>
                <text
                  fill="#fff"
                  fontFamily="Space Grotesk"
                  fontSize="12"
                  fontWeight="700"
                  textAnchor="end"
                  x="50"
                  y="115"
                >
                  DESIGN
                </text>
              </svg>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-cyan-400 font-['Space_Grotesk'] text-[10px] font-bold tracking-widest uppercase mb-2">
                  Most Active
                </div>
                <div className="text-white font-['Space_Grotesk'] text-2xl font-medium">
                  Backend
                </div>
              </div>
              <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-cyan-400 font-['Space_Grotesk'] text-[10px] font-bold tracking-widest uppercase mb-2">
                  Growth Area
                </div>
                <div className="text-white font-['Space_Grotesk'] text-2xl font-medium">
                  AI/ML
                </div>
              </div>
              <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-cyan-400 font-['Space_Grotesk'] text-[10px] font-bold tracking-widest uppercase mb-2">
                  Leaderboard
                </div>
                <div className="text-white font-['Space_Grotesk'] text-2xl font-medium">
                  Top 3%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Recent Activity & Market Value */}
        <div className="col-span-12 lg:col-span-8">
          <div className="glass-card p-8 rounded-2xl h-full">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
              <h3 className="text-white font-['Space_Grotesk'] text-2xl font-medium">
                Verification Pulse
              </h3>
              <span className="text-cyan-400 font-['Space_Grotesk'] text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>{" "}
                LIVE SYNC
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#5efb6a]/20 flex items-center justify-center text-[#5efb6a]">
                    <span className="material-symbols-outlined">code</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      Core Protocol v2 - Smart Contract Audit
                    </div>
                    <div className="text-slate-500 text-xs mt-1">
                      Merged 2 hours ago &bull; +15 Rep
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-600 group-hover:text-cyan-400 transition-all self-end sm:self-center">
                  chevron_right
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#e9b3ff]/20 flex items-center justify-center text-[#e9b3ff]">
                    <span className="material-symbols-outlined">group</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      Peer Review: Infrastructure Scaling
                    </div>
                    <div className="text-slate-500 text-xs mt-1">
                      Received 6 hours ago &bull; +8 Rep
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-600 group-hover:text-cyan-400 transition-all self-end sm:self-center">
                  chevron_right
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-400/20 flex items-center justify-center text-cyan-400">
                    <span className="material-symbols-outlined">
                      rocket_launch
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      New Project: PulseFlow UI Kit
                    </div>
                    <div className="text-slate-500 text-xs mt-1">
                      Started yesterday &bull; Pending Review
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-600 group-hover:text-cyan-400 transition-all self-end sm:self-center">
                  chevron_right
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="glass-card p-8 rounded-2xl h-full flex flex-col justify-between bg-gradient-to-br from-white/[0.05] to-cyan-500/[0.05]">
            <div>
              <h3 className="text-white font-['Space_Grotesk'] text-2xl font-medium mb-2">
                Builder Equity
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                Estimated market valuation based on reputation score.
              </p>
              <div className="text-5xl font-black text-white font-['Space_Grotesk'] mb-2">
                $142.5k
                <span className="text-cyan-400 text-xl font-normal">/yr</span>
              </div>
              <div className="text-[#5efb6a] text-sm font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">
                  trending_up
                </span>{" "}
                +12% this month
              </div>
            </div>
            <div className="mt-8">
              <div className="text-slate-500 font-['Space_Grotesk'] text-[10px] font-bold tracking-widest uppercase mb-4">
                Eligible Funding
              </div>
              <div className="space-y-3">
                <button className="w-full py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-black rounded-xl transition-all shadow-[0_0_25px_rgba(0,245,255,0.2)] font-['Space_Grotesk'] tracking-wide">
                  APPLY FOR SEED FUNDING
                </button>
                <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all font-['Space_Grotesk']">
                  VIEW INVESTOR MATCHES
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
