import { useState } from "react";

export function PortfolioView() {
  const [filter, setFilter] = useState<"all" | "completed" | "in-progress">(
    "all",
  );

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto animate-fade-in-up">
      {/* Header Section */}
      <section className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-['Space_Grotesk'] text-3xl font-semibold text-white mb-2">
            Proof-of-Work
          </h1>
          <p className="text-slate-400 font-['Inter'] max-w-2xl text-lg">
            Verified evidence of technical execution and product delivery. Every
            entry is backed by on-chain reputation and stakeholder sign-offs.
          </p>
        </div>
        {/* Filters */}
        <div className="flex gap-2 glass-card p-1.5 rounded-xl border-white/5">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-lg font-['Space_Grotesk'] text-xs font-bold tracking-widest uppercase transition-all ${filter === "all" ? "bg-cyan-400 text-[#006c71]" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
          >
            All Works
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-6 py-2 rounded-lg font-['Space_Grotesk'] text-xs font-bold tracking-widest uppercase transition-all ${filter === "completed" ? "bg-cyan-400 text-[#006c71]" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("in-progress")}
            className={`px-6 py-2 rounded-lg font-['Space_Grotesk'] text-xs font-bold tracking-widest uppercase transition-all ${filter === "in-progress" ? "bg-cyan-400 text-[#006c71]" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
          >
            In Progress
          </button>
        </div>
      </section>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        {(filter === "all" || filter === "completed") && (
          <div className="glass-card group rounded-2xl hover:border-cyan-400/40 transition-all duration-500 hover:-translate-y-2">
            <div className="h-48 w-full relative overflow-hidden">
              <img
                alt="Web3 Project Hero"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvWIFTGFIE9_g3yA3ImOfCTyJ3nbFdrCl1fa5mIRT_22g12grPPL10G10cyMYjrNmVaKfyWdScVBwSZI9bLdlFnjRMdzoQXUTSlF8FPo84YhdMYKQx9UGg-z7C0kzPlVJCyFkaWkSHy689TEHyGbWvK9c7zJMEEvMsHXyOlWyAIxo3Z6j9_lIpFiku1djqLovp2TIX5oD8uKEFNxRgn983g33loEQp7i_4mzQE42UL2a0ccGvyjTkfbahfYIy5DmuxYnvJuBVe4bc"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#42e355]/20 backdrop-blur-md text-[#70ff76] border border-[#70ff76]/30 font-['Space_Grotesk'] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                  Completed
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] to-transparent"></div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-['Space_Grotesk'] font-medium text-xl text-white group-hover:text-cyan-400 transition-colors">
                    Nova Protocol
                  </h3>
                  <p className="text-slate-500 font-['Inter']">
                    Lead Smart Contract Architect
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-['Space_Grotesk'] text-xs font-bold tracking-widest text-cyan-400 uppercase">
                    Contribution
                  </div>
                  <div className="font-['Space_Grotesk'] font-medium text-xl text-white">
                    85%
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="text-xs text-slate-500 font-['Space_Grotesk'] font-bold tracking-widest uppercase mb-1">
                    Total Users
                  </div>
                  <div className="font-['Inter'] font-semibold tracking-wider text-cyan-100">
                    420.5k
                  </div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="text-xs text-slate-500 font-['Space_Grotesk'] font-bold tracking-widest uppercase mb-1">
                    TVL Secured
                  </div>
                  <div className="font-['Inter'] font-semibold tracking-wider text-cyan-100">
                    $12.4M
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <div className="flex -space-x-2">
                  <img
                    alt="Team Avatar"
                    className="w-8 h-8 rounded-full border-2 border-[#0A0C10]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8UVSqHAIiCl6IIzZmcECfkDw1DP6bxC3YxVgYMQcYlQJhRW05wSKn7qg-6wQmyfclq_F2t_OBki4NryaQjXhULnS4wXRPuA-K0VST4beuKUkCNzR42Y7UA1Ndfbw1hlOtbbYemnRNhn0E540x-sbsbxVSzMzNhuhpiKGe7jhJWh_5y3a4J_qt7Y92pXHkV1hVa92T_WqaZRyK6ZINQdu92qEV1n5IToLXzgxIz20JlauqzgGWF77-pwC9QjAi5Q1iloFO3Lk5IW4"
                  />
                  <img
                    alt="Team Avatar"
                    className="w-8 h-8 rounded-full border-2 border-[#0A0C10]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAq1jPn7gylEB2Ncmi_k-JbB7sA70D1Be8ke66DPObVvJJcKK677Ayc9ESb6rZvepVUE5JixGgwAk5wsMOmwoz2YbnmYDbEetHE_4vHr5c2ofhj7nOS-X7tXEQdWLVqMzJYhCOPW-zyUJOcscuXEBS6-TMb1k3fBMExsAAEOif4jDzQ9U7JZZfZYom5ZDjVdNRMaUDvBhF5bg7wF97d6t5Fy2sgI1dYW2oD1cED0DymGeC2aJQhjPzsR0Js7AlzOihgUpRXpBxyDrk"
                  />
                  <div className="w-8 h-8 rounded-full border-2 border-[#0A0C10] bg-[#1e2024] flex items-center justify-center text-[10px] font-bold">
                    +4
                  </div>
                </div>
                <button className="text-cyan-400 font-['Space_Grotesk'] text-xs font-bold tracking-widest uppercase hover:underline flex items-center gap-1">
                  Case Study{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Card 2 */}
        {(filter === "all" || filter === "in-progress") && (
          <div className="glass-card group rounded-2xl hover:border-cyan-400/40 transition-all duration-500 hover:-translate-y-2">
            <div className="h-48 w-full relative overflow-hidden">
              <img
                alt="DeFi Project Hero"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAotEJpGXyOYRUQGc9ACnmMnVWHDOdpSFFEMdprwlUdudzjM3CC1seDHiL3abEusrj3drfMOI_v7JQtL4yisjXix66nSP4acJ4n7kaesMAIABG4Mm-UkSg9NXXvNZ41ZbtV8xRX_BksUJRjMN1tkhMrgFQFpimeoIYOTQgV6bUXJF4mNekKl6hvARIw0xl26XFoilGefWYBh76BAFNUvlmMhaDRSBYWrZlBNKeQYduwp8Kvu0WuoOPzVYOAPtPvHAhlMR9w3l5Np7k"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#00dce5]/20 backdrop-blur-md text-[#63f7ff] border border-[#63f7ff]/30 font-['Space_Grotesk'] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                  In Progress
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] to-transparent"></div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-['Space_Grotesk'] font-medium text-xl text-white group-hover:text-cyan-400 transition-colors">
                    Aether DEX
                  </h3>
                  <p className="text-slate-500 font-['Inter']">
                    Senior Frontend Engineer
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-['Space_Grotesk'] text-xs font-bold tracking-widest text-cyan-400 uppercase">
                    Contribution
                  </div>
                  <div className="font-['Space_Grotesk'] font-medium text-xl text-white">
                    40%
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="text-xs text-slate-500 font-['Space_Grotesk'] font-bold tracking-widest uppercase mb-1">
                    Latency Redux
                  </div>
                  <div className="font-['Inter'] font-semibold tracking-wider text-cyan-100">
                    -120ms
                  </div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="text-xs text-slate-500 font-['Space_Grotesk'] font-bold tracking-widest uppercase mb-1">
                    PRs Merged
                  </div>
                  <div className="font-['Inter'] font-semibold tracking-wider text-cyan-100">
                    84
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <div className="flex -space-x-2">
                  <img
                    alt="Team Avatar"
                    className="w-8 h-8 rounded-full border-2 border-[#0A0C10]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtWw9Qd_CEyTh365RAfToxIpNHnmOOGo12dbtxYXnn1VKZ4oVcjTAZuBjjiNRoEyvEYzef3N4dblmDqmWKcUcpNbkKA2uH4I9mzlUQxxqcZWc6W15cKnVXj8SnhUvPhVPKKqNiYg2RTxlQSviD6tdJQDENIWA0i2PCWD2E_Qv0Qx9tRpef2JqwDHXdm_q5rYvwejTzXsNBlv0VbcCE7wUfBiE6qE8ssno3akower09pcLRAe4QrXz9d30pyhR1ioaq3o3e26QXIU0"
                  />
                  <img
                    alt="Team Avatar"
                    className="w-8 h-8 rounded-full border-2 border-[#0A0C10]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS1267PLAjxdk25Ek_CW0DiFSZYm4pCSXkLvUMcDGvirjWywyqUF097aCWyM8wZ6N2s32GemIQZjieAj1ug3hKhveMedt9v0StN9laiVuB58TNtGk0X41fz0_Gdq_E0EM6hMV9Z_6Ilmmuet9xPzWCjWVS3ZeXtAMixt3y0GA1xxotzrdAR5XdLfNAE453TfooPHzb66_2MdTDFR3X9yMBj7J0xUSKCGHqA0cjBA7mqLfVVifdrzxr1B0ru3dRjwjc9TjPyGe5K-Q"
                  />
                </div>
                <button className="text-cyan-400 font-['Space_Grotesk'] text-xs font-bold tracking-widest uppercase hover:underline flex items-center gap-1">
                  Repository{" "}
                  <span className="material-symbols-outlined text-sm">
                    terminal
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Card 3 */}
        {(filter === "all" || filter === "completed") && (
          <div className="glass-card group rounded-2xl hover:border-cyan-400/40 transition-all duration-500 hover:-translate-y-2">
            <div className="h-48 w-full relative overflow-hidden">
              <img
                alt="AI Project Hero"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBpPMQ4GpvYIMZdWGWUrqgzHCFdaAkDE5bhRLbCQ27BS_qIqzZpQc1MMZsvcat8Z-UUAhOa6GnOzv9BEycZ-b__9qLB46Plz30-RbmwzbKCN_YlRlgB0vScGATzqZ_MDX8A_2E_h25S6Ber0ny1n0E_nqwYLWQO2WIH9XEETyUL4UfzPy-q5wjxkc6qdEP1I-c4WVILYx527aDwnZEU1fUgYWQIk_awdiyRyMjAPZqS2VZI2H4mcWuwC885DTH6UiSuR5nEwiZ34g"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#42e355]/20 backdrop-blur-md text-[#70ff76] border border-[#70ff76]/30 font-['Space_Grotesk'] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                  Completed
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] to-transparent"></div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-['Space_Grotesk'] font-medium text-xl text-white group-hover:text-cyan-400 transition-colors">
                    Neural Mesh
                  </h3>
                  <p className="text-slate-500 font-['Inter']">
                    ML Infrastructure Lead
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-['Space_Grotesk'] text-xs font-bold tracking-widest text-cyan-400 uppercase">
                    Contribution
                  </div>
                  <div className="font-['Space_Grotesk'] font-medium text-xl text-white">
                    100%
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="text-xs text-slate-500 font-['Space_Grotesk'] font-bold tracking-widest uppercase mb-1">
                    API Calls/day
                  </div>
                  <div className="font-['Inter'] font-semibold tracking-wider text-cyan-100">
                    1.2M
                  </div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="text-xs text-slate-500 font-['Space_Grotesk'] font-bold tracking-widest uppercase mb-1">
                    Cost Efficiency
                  </div>
                  <div className="font-['Inter'] font-semibold tracking-wider text-cyan-100">
                    +45%
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <div className="flex -space-x-2">
                  <img
                    alt="Team Avatar"
                    className="w-8 h-8 rounded-full border-2 border-[#0A0C10]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOUZZFwA95LCVyIP2h4_kUWjJs62bZ_ofJYjFZL594TrTlwMKhgAKRzkOOIGFklMxsaWdpRJXKmzcr2neTp1AK6TKRGROXSqQCKcu_00Avw7eJzxzvtMtZs0rntEpEihDbA_675kj751TGcI5AKdSaoZ4bpHRgOQin3pozXQ-AoXm4tPsDteR9NSOGDk1eUa2vHXHomXaDe2dVRRjMZdieWD-cjDn5ZnZywdUakustPEE40n1EV_RFZLnIzBnLfcrEXOCTBAheVB0"
                  />
                </div>
                <button className="text-cyan-400 font-['Space_Grotesk'] text-xs font-bold tracking-widest uppercase hover:underline flex items-center gap-1">
                  Case Study{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Card 4 (Asymmetric Large/Stats Card) */}
        {(filter === "all" || filter === "completed") && (
          <div className="glass-card md:col-span-2 p-8 rounded-2xl flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="font-['Space_Grotesk'] text-xs font-bold tracking-widest text-cyan-400 mb-2 uppercase">
                Signature Project
              </div>
              <h2 className="font-['Space_Grotesk'] text-3xl font-semibold text-white mb-4">
                Pulse Analytics Engine
              </h2>
              <p className="text-slate-400 font-['Inter'] mb-6">
                The core engine powering real-time reputation tracking for over
                50,000 active builders. Built with a custom time-series
                implementation and zero-knowledge proof verification.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-400/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-cyan-400">
                      speed
                    </span>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-['Space_Grotesk'] font-bold tracking-widest uppercase">
                      Max Throughput
                    </div>
                    <div className="text-white font-['Inter'] font-semibold tracking-wider">
                      50k req/s
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-400/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-cyan-400">
                      verified
                    </span>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-['Space_Grotesk'] font-bold tracking-widest uppercase">
                      Status
                    </div>
                    <div className="text-white font-['Inter'] font-semibold tracking-wider">
                      Audited
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-64 flex flex-col justify-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
              <div className="text-center">
                <div className="font-['Space_Grotesk'] text-xs font-bold tracking-widest text-cyan-400 mb-1 uppercase">
                  Impact Velocity
                </div>
                <div className="text-4xl font-black text-white font-['Space_Grotesk']">
                  94.2
                </div>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full">
                <div className="h-full bg-cyan-400 w-[94%] shadow-[0_0_15px_rgba(0,245,255,0.6)]"></div>
              </div>
              <button className="w-full bg-cyan-400 text-black font-['Space_Grotesk'] font-bold py-3 rounded-lg hover:brightness-110 transition-all mt-2">
                Deep Review
              </button>
            </div>
          </div>
        )}

        {/* Empty State / Add Card */}
        {filter === "all" && (
          <div className="glass-card border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center p-10 group cursor-pointer hover:border-cyan-400/50 transition-all mb-20 md:mb-0">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-slate-500 group-hover:text-cyan-400 text-3xl">
                add
              </span>
            </div>
            <div className="text-center">
              <div className="text-white font-['Space_Grotesk'] font-medium text-xl mb-1">
                Submit Proof
              </div>
              <p className="text-slate-500 text-sm px-8">
                Add a new verified project to your reputation portfolio
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Contextual FAB */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-[#00f5ff] text-[#006c71] w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:scale-110 active:scale-95 transition-all">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            add
          </span>
        </button>
      </div>
    </div>
  );
}
