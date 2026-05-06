import { useApp } from "@/state/AppContext";

export function ReputationDeepDiveView() {
  const { state } = useApp();
  const builder =
    state.builders.find((b) => b.userId === state.currentUser?.userId) ||
    state.builders[0];

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto pb-24 animate-fade-in-up">
      {/* Hero Reputation Header */}
      <section className="flex flex-col lg:flex-row gap-8 mb-12">
        <div className="lg:w-2/3 glass-card rounded-3xl p-8 relative overflow-hidden flex flex-col sm:flex-row items-center gap-12">
          <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuClQvVH1oLA4_DrYRbgqDx1pO8nuIcKdNi4Q5ZbNlsygqxv3Rlf8JgHHkh-M6_YYCUYl8426As2ayOMd7EEjGqllQEewqjke_paTB4Qf0hO9qg5MGWJyFvfcUrHh37pOs5L0g9JBdB3JsGvM0nMdI83gikGoWcXqetXc3vxZh3Wev0g5BwzAUOh8I6ip4l58oNfxMWA_-p0py4l5EL32qq__LfE_bpHnH2YZhjo7VlcJ3CxMnt2c7rJzw6yPc0yveh8BJISrJBFsGE')] opacity-[0.02] pointer-events-none"></div>
          <div className="relative z-10 w-full min-w-0">
            <div className="text-[#3a494a] font-['Space_Grotesk'] text-xs font-bold tracking-widest uppercase mb-2">
              Current Reputation Score
            </div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-['Space_Grotesk'] text-5xl lg:text-6xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                {builder?.reputationScore || 0}
              </span>
              <span className="text-cyan-400 font-['Space_Grotesk'] text-lg lg:text-2xl font-medium">
                / 1000
              </span>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2 lg:gap-4">
              <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold border border-cyan-400/30 tracking-widest uppercase">
                Elite Tier
              </span>
              <span className="flex items-center gap-1 text-[#eeffe6] text-sm font-bold whitespace-nowrap">
                <span className="material-symbols-outlined text-sm">
                  trending_up
                </span>
                <span className="text-xs lg:text-sm">+4.2% Growth</span>
              </span>
            </div>
          </div>
          <div className="hidden sm:block flex-1 h-48 relative w-full min-w-[200px]">
            {/* Abstract Pulse Visualization */}
            <div className="absolute inset-0 flex items-end justify-between gap-1 opacity-40">
              <div className="w-2 bg-cyan-400 rounded-t-full h-[60%]"></div>
              <div className="w-2 bg-cyan-400 rounded-t-full h-[80%]"></div>
              <div className="w-2 bg-cyan-400 rounded-t-full h-[70%]"></div>
              <div className="w-2 bg-cyan-400 rounded-t-full h-[90%] shadow-[0_0_15px_rgba(0,245,255,0.5)]"></div>
              <div className="w-2 bg-cyan-400 rounded-t-full h-[85%]"></div>
              <div className="w-2 bg-cyan-400 rounded-t-full h-[75%]"></div>
              <div className="w-2 bg-cyan-400 rounded-t-full h-[100%] shadow-[0_0_20px_rgba(0,245,255,0.8)]"></div>
              <div className="w-2 bg-cyan-400 rounded-t-full h-[80%]"></div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 glass-card rounded-3xl p-6 lg:p-8 flex flex-col justify-between">
          <div className="min-w-0">
            <div className="text-[#3a494a] font-['Space_Grotesk'] text-xs font-bold tracking-widest uppercase mb-4">
              Reputation Breakdown
            </div>
            <ul className="space-y-3 lg:space-y-4">
              <li className="flex justify-between items-center text-sm gap-2">
                <span className="text-slate-400 text-xs lg:text-sm flex-1 break-words">
                  Completed Projects
                </span>
                <span className="font-['Inter'] font-semibold tracking-wider text-white flex-shrink-0">
                  {builder?.completedProjects || 0}
                </span>
              </li>
              <li className="flex justify-between items-center text-sm gap-2">
                <span className="text-slate-400 text-xs lg:text-sm flex-1 break-words">
                  Hours Per Week
                </span>
                <span className="font-['Inter'] font-semibold tracking-wider text-white flex-shrink-0">
                  {builder?.hoursPerWeek || 0}h
                </span>
              </li>
              <li className="flex justify-between items-center text-sm gap-2">
                <span className="text-slate-400 text-xs lg:text-sm flex-1 break-words">
                  Status
                </span>
                <span className="font-['Inter'] font-semibold tracking-wider text-white flex-shrink-0 capitalize">
                  {builder?.availabilityStatus || "unknown"}
                </span>
              </li>
            </ul>
          </div>
          <button className="mt-6 lg:mt-8 flex items-center justify-center gap-2 text-xs lg:text-sm font-bold text-cyan-400 bg-cyan-400/5 py-2 lg:py-3 rounded-xl border border-cyan-400/20 hover:bg-cyan-400/10 transition-all whitespace-nowrap px-3">
            <span className="material-symbols-outlined text-sm">share</span>
            <span className="hidden lg:inline">
              EXCHANGE REPUTATION CERTIFICATE
            </span>
            <span className="lg:hidden">EXCHANGE</span>
          </button>
        </div>
      </section>

      {/* Metrics Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Main Breakdown Bar Chart */}
        <div className="md:col-span-8 glass-card rounded-3xl p-6 lg:p-8 relative overflow-hidden">
          <h3 className="font-['Space_Grotesk'] text-lg lg:text-2xl font-medium mb-6 lg:mb-8 flex items-center gap-3 text-white break-words">
            <span className="material-symbols-outlined text-cyan-400 flex-shrink-0">
              bar_chart
            </span>
            <span>Weighted Score Components</span>
          </h3>
          <div className="space-y-6 lg:space-y-8">
            <div>
              <div className="flex justify-between mb-3 text-white gap-2 flex-wrap lg:flex-nowrap">
                <span className="text-xs lg:text-sm font-medium flex-1 break-words">
                  Project Completion (30%)
                </span>
                <span className="font-['Inter'] font-semibold tracking-wider text-cyan-400 flex-shrink-0 whitespace-nowrap">
                  285 / 300
                </span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[95%] bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full neon-glow"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-3 text-white gap-2 flex-wrap lg:flex-nowrap">
                <span className="text-xs lg:text-sm font-medium flex-1 break-words">
                  Peer Reviews (20%)
                </span>
                <span className="font-['Inter'] font-semibold tracking-wider text-[#42e355] flex-shrink-0 whitespace-nowrap">
                  180 / 200
                </span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[90%] bg-gradient-to-r from-[#42e355] to-[#005313] rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-3 text-white gap-2 flex-wrap lg:flex-nowrap">
                <span className="text-xs lg:text-sm font-medium flex-1 break-words">
                  Investor Signals (15%)
                </span>
                <span className="font-['Inter'] font-semibold tracking-wider text-[#e9b3ff] flex-shrink-0 whitespace-nowrap">
                  110 / 150
                </span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[73%] bg-gradient-to-r from-[#e9b3ff] to-[#7200a3] rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-3 text-white gap-2 flex-wrap lg:flex-nowrap">
                <span className="text-xs lg:text-sm font-medium flex-1 break-words">
                  Skill Validation (15%)
                </span>
                <span className="font-['Inter'] font-semibold tracking-wider text-[#e9feff] flex-shrink-0 whitespace-nowrap">
                  145 / 150
                </span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[96%] bg-gradient-to-r from-[#e9feff] to-[#00dce5] rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-3 text-[#3a494a] gap-2 flex-wrap lg:flex-nowrap">
                <span className="text-xs lg:text-sm font-medium flex-1 break-words">
                  Network Latency (20%)
                </span>
                <span className="font-['Inter'] font-semibold tracking-wider flex-shrink-0 whitespace-nowrap">
                  130 / 200
                </span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-[#3a494a] rounded-full opacity-50"></div>
              </div>
            </div>
          </div>
        </div>

        {/* History Line Graph Area */}
        <div className="md:col-span-4 glass-card rounded-3xl p-6 lg:p-8 relative overflow-hidden flex flex-col justify-between">
          <div className="min-w-0">
            <h3 className="font-['Space_Grotesk'] text-lg lg:text-2xl font-medium text-white mb-2 flex items-center gap-3 break-words">
              <span className="material-symbols-outlined text-cyan-400 flex-shrink-0">
                history
              </span>
              <span>Score History</span>
            </h3>
            <p className="text-slate-500 text-xs lg:text-sm mb-6 lg:mb-8 break-words">
              90-Day reputation velocity trajectory
            </p>
          </div>
          <div className="flex-1 flex items-end gap-2 px-2 pb-4 min-h-[200px]">
            {/* Simulated History Graph */}
            <div className="flex-1 bg-white/5 h-[40%] rounded-t-lg group relative hover:bg-cyan-400/20 transition-all">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-500 hidden group-hover:block">
                720
              </div>
            </div>
            <div className="flex-1 bg-white/5 h-[45%] rounded-t-lg group relative hover:bg-cyan-400/20 transition-all"></div>
            <div className="flex-1 bg-white/5 h-[42%] rounded-t-lg group relative hover:bg-cyan-400/20 transition-all"></div>
            <div className="flex-1 bg-white/5 h-[55%] rounded-t-lg group relative hover:bg-cyan-400/20 transition-all"></div>
            <div className="flex-1 bg-white/5 h-[68%] rounded-t-lg group relative hover:bg-cyan-400/20 transition-all"></div>
            <div className="flex-1 bg-cyan-400 h-[75%] rounded-t-lg group relative neon-glow">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-cyan-400">
                810
              </div>
            </div>
            <div className="flex-1 bg-cyan-400 h-[88%] rounded-t-lg group relative neon-glow">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-cyan-400">
                850
              </div>
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-[#3a494a] font-['Space_Grotesk'] font-bold tracking-widest uppercase pt-4 border-t border-white/5">
            <span>MAY</span>
            <span>JUN</span>
            <span>JUL</span>
          </div>
        </div>
      </section>

      {/* Collaboration History */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h2 className="font-['Space_Grotesk'] text-3xl font-semibold text-white">
            Collaboration History
          </h2>
          <button className="text-sm font-bold text-slate-400 hover:text-white flex items-center gap-2 group transition-all">
            View All Activity
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feedback Card 1 */}
          <div className="glass-card rounded-2xl p-6 group hover:border-cyan-400/40 transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk0SEBvkx2p0LUK3y726-uSo5RFxCRSs57kmLa3PiVTep86MMzSzWOCH-q800FVeT9vlFsakikHXnVHFw4-SFg5nZf_l8Zd2iA83hjxWNmgZchBFsZQ6oy7SpPmtkMLvsJ9jn_BMZ26HAk_CefghBM6c_eEgA-na76Ud-3BdTJqCU0h6RudA9u2Fne1Q4GGi3z4lNXC3xqgWeTPnM3G6OY8P3TcMiMUyxrTPYYad16IwE8ERzZgXOuLcQpkN2DghTnHZwrQZKNOm8"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Marcus Vance</h4>
                  <p className="text-xs text-slate-500">
                    Lead Architect at EthOS
                  </p>
                </div>
              </div>
              <div className="flex text-cyan-400">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
              "Unparalleled commitment to modularity and clean code.
              Successfully integrated our complex smart-contract logic in half
              the projected timeframe. A natural leader in the trenches."
            </p>
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <span className="text-[10px] text-[#3a494a] font-['Space_Grotesk'] font-bold tracking-widest uppercase">
                Project: Hyperlink Dex
              </span>
              <span className="text-[10px] text-[#42e355] font-bold">
                +12 RP Gained
              </span>
            </div>
          </div>

          {/* Feedback Card 2 */}
          <div className="glass-card rounded-2xl p-6 group hover:border-cyan-400/40 transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPHiWY3I0zAhA9O9DPFfZ8pmxYAPFcCuFfmg6o46O-l2tmdeRrxyXAViPNvZG1ZrvpMC2FxPwLFFeIrdt5zeGxERS2tBcmoYzoXXwAXJBD8W_IQWnEbkF5GDey0UZlDm0b4_l-i6_WElHSU_thaVvc4oEYEfLXDxxJyxg-zSENuXZ7vCA7qdgGaO5oV1pCRnJ8sMuHI3EiSrn07AMtR_dmztbBhzT-ugTRvqgS-a-0lVkQnwm0dIOODTb2AWWxGk36r9wmHJbD2XA"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    Elena Rodriguez
                  </h4>
                  <p className="text-xs text-slate-500">
                    Product Lead at Neobank
                  </p>
                </div>
              </div>
              <div className="flex text-cyan-400">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
              "Fantastic communicator. Managed to bridge the gap between our
              engineering and design teams during the most stressful part of the
              V2 launch. Highly recommend for any core team role."
            </p>
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <span className="text-[10px] text-[#3a494a] font-['Space_Grotesk'] font-bold tracking-widest uppercase">
                Project: Core UI Kit
              </span>
              <span className="text-[10px] text-[#42e355] font-bold">
                +18 RP Gained
              </span>
            </div>
          </div>

          {/* Feedback Card 3 */}
          <div className="glass-card rounded-2xl p-6 group hover:border-cyan-400/40 transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDbrRCDUc6hAEihq6mkm3TXcpEcpFgxQ2kGocFlJVIy7uvfSwOvfik0l88_EGPtZnfYNBfx3YtrdkA99JozmofgPuLhKehvOftnnY71raR5Wt3KFnYB7-xkXnw7mO80piMi7vnO_F3k5nc8AWseqny9f9nEXp5-DJ72_HA2WBIQosnPu3FLfEPIw0N4kKL00ll0ByRgMKdC7iPzO-aIefqBZVPnZGtuZIjcEyfTZb2ImrFGAx8y8x5-ry1nJAWuMAnlGCTojWiiOM"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">David Chen</h4>
                  <p className="text-xs text-slate-500">CTO at BlockFlow</p>
                </div>
              </div>
              <div className="flex text-cyan-400">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 0.5" }}
                >
                  star_half
                </span>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
              "Technical depth is incredible. We hit a snag with our indexing
              layer and he diagnosed the bottleneck in under an hour. Only
              downside is he's in high demand!"
            </p>
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <span className="text-[10px] text-[#3a494a] font-['Space_Grotesk'] font-bold tracking-widest uppercase">
                Project: Indexer Alpha
              </span>
              <span className="text-[10px] text-[#42e355] font-bold">
                +8 RP Gained
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Area */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <button className="w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-cyan-400 hover:bg-white/10 transition-all shadow-xl group">
          <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">
            bolt
          </span>
        </button>
        <button className="px-6 py-3 bg-cyan-400 text-black font-bold rounded-full flex items-center gap-2 shadow-[0_0_30px_rgba(0,245,255,0.3)] hover:scale-105 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-sm">add</span>
          Boost Score
        </button>
      </div>
    </div>
  );
}
