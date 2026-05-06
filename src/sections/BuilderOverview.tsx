import { useApp } from "@/state/AppContext";
import { Button } from "@/components/ui/button";
import {
  Search,
  PlusSquare,
  TestTube,
  CheckCircle2,
  Zap,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";

export function BuilderOverview() {
  const { state, dispatch, getProject } = useApp();
  const builder = state.builders.find(
    (b) => b.userId === state.currentUser?.userId,
  );
  const [copied, setCopied] = useState(false);

  if (!builder) return null;

  const myMatches = state.matches
    .filter((m) => m.builderId === builder.userId)
    .sort((a, b) => b.matchScore - a.matchScore);

  const myApplications = state.applications.filter(
    (a) => a.builderId === builder.userId,
  );

  const copyProfileLink = async () => {
    const profileUrl = `${window.location.origin}/profile/${builder.userId}`;
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto animate-fade-in-up">
      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="font-['Space_Grotesk'] font-bold text-3xl md:text-4xl text-white mb-2">
            Workspace Overview
          </h1>
          <p className="text-[#9ca3af] text-sm md:text-base">
            Welcome back, {builder.fullName.split(" ")[0]}. You have{" "}
            {myApplications.length} active applications and {myMatches.length}{" "}
            recommended matches.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="bg-transparent border-[#1a1a1a] text-white hover:bg-[#262626] hover:text-white text-xs font-semibold tracking-wider uppercase h-10"
            onClick={() =>
              dispatch({ type: "SET_TAB", payload: "opportunities" })
            }
          >
            <Search className="w-4 h-4 mr-2" /> Browse Opportunities
          </Button>
          <Button
            className="bg-[#22d3ee] hover:bg-[#22d3ee]/90 text-[#0a0a0a] text-xs font-semibold tracking-wider uppercase h-10"
            onClick={() => dispatch({ type: "SET_TAB", payload: "profile" })}
          >
            <PlusSquare className="w-4 h-4 mr-2" /> Update Profile
          </Button>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Projects & Match Performance */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Projects (Applications) */}
          <section className="bg-[#121212] border border-[#1a1a1a] p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-['Space_Grotesk'] font-semibold text-xl text-white">
                Active Projects
              </h2>
              <button
                onClick={() =>
                  dispatch({ type: "SET_TAB", payload: "projects" })
                }
                className="text-[#22d3ee] text-sm font-semibold hover:text-[#22d3ee]/80"
              >
                View All
              </button>
            </div>

            <div className="space-y-4">
              {myApplications.length > 0 ? (
                myApplications.slice(0, 2).map((app, index) => {
                  const project = getProject(app.projectId);
                  if (!project) return null;
                  const progress = index === 0 ? 65 : 88;
                  return (
                    <div
                      key={app.id}
                      className="group border border-[#1a1a1a] hover:border-[#22d3ee]/30 p-4 rounded-lg transition-all hover:bg-[#262626]"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-['Space_Grotesk'] font-semibold text-lg text-white mb-1 group-hover:text-[#22d3ee] transition-colors">
                            {project.title}
                          </h4>
                          <p className="text-sm text-[#6b7280]">
                            {project.category}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            app.status === "accepted"
                              ? "bg-[#22d3ee]/10 text-[#22d3ee]"
                              : app.status === "pending"
                                ? "bg-[#f59e0b]/10 text-[#f59e0b]"
                                : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex-1 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#22d3ee] rounded-full"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-mono font-bold text-white">
                          {progress}%
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex -space-x-2">
                          <img
                            src={project.coverImage}
                            className="w-7 h-7 rounded-full border-2 border-[#121212] object-cover"
                          />
                          <img
                            src={builder.avatarUrl}
                            className="w-7 h-7 rounded-full border-2 border-[#121212] object-cover"
                          />
                          <div className="w-7 h-7 rounded-full border-2 border-[#121212] bg-[#262626] flex items-center justify-center text-[10px] font-bold text-[#6b7280]">
                            +2
                          </div>
                        </div>
                        <span className="text-[11px] text-[#6b7280]">
                          Status: {app.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-[#6b7280] text-sm">
                  No active projects yet. Apply for opportunities to get
                  started!
                </div>
              )}
            </div>
          </section>

          {/* Match Performance (Reputation & Skills) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#121212] border border-[#1a1a1a] p-6 rounded-xl flex flex-col justify-between">
              <div>
                <h3 className="font-['Space_Grotesk'] font-semibold text-xs mb-4 text-[#6b7280] uppercase tracking-wider">
                  Match Performance
                </h3>
                <div className="flex items-end gap-2 mb-2">
                  <span className="font-['Space_Grotesk'] font-bold text-5xl leading-none text-[#22d3ee]">
                    {myMatches.length > 0
                      ? myMatches[0].matchScore
                      : builder.reputationScore}
                  </span>
                  <span className="text-[#6b7280] font-semibold text-xl mb-1">
                    /100
                  </span>
                </div>
                <p className="text-sm text-[#9ca3af] mb-6">
                  Your reputation score is in the top 5% of {builder.role}s this
                  month.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[11px] font-bold mb-1 text-white uppercase">
                    <span>Reliability</span>
                    <span>98%</span>
                  </div>
                  <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className="h-full bg-[#10b981] w-[98%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] font-bold mb-1 text-white uppercase">
                    <span>Technical Depth</span>
                    <span>89%</span>
                  </div>
                  <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className="h-full bg-[#8b5cf6] w-[89%]"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#1a1a1a] p-6 rounded-xl flex flex-col">
              <h3 className="font-['Space_Grotesk'] font-semibold text-xs mb-4 text-[#6b7280] uppercase tracking-wider">
                Skills Growth
              </h3>
              <div className="flex-1 flex items-end gap-2 px-2 mt-4 min-h-[120px]">
                {[40, 55, 50, 75, 90, 95].map((height, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-sm ${i >= 4 ? "bg-[#22d3ee]" : "bg-[#1a1a1a]"}`}
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {builder.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="bg-[#262626] text-[#9ca3af] px-2 py-1 rounded text-[10px] font-medium border border-[#1a1a1a]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Notifications & Activity */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-[#121212] border border-[#1a1a1a] p-6 rounded-xl flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Space_Grotesk'] font-semibold text-xl text-white">
                Notifications
              </h2>
              <span className="bg-[#22d3ee] text-[#0a0a0a] w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                {myMatches.slice(0, 3).length}
              </span>
            </div>

            <div className="space-y-4 flex-1">
              {myMatches.slice(0, 3).map((match, i) => {
                const project = getProject(match.projectId);
                if (!project) return null;
                const icons = [
                  <CheckCircle2 key="1" />,
                  <Zap key="2" />,
                  <TestTube key="3" />,
                ];
                const Icon = icons[i % icons.length];

                return (
                  <div
                    key={match.id}
                    className="flex gap-4 p-3 rounded-lg hover:bg-[#262626] transition-colors cursor-pointer border border-transparent hover:border-[#1a1a1a]"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#22d3ee]/10 text-[#22d3ee] flex items-center justify-center flex-shrink-0">
                      {Icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Match:{" "}
                        <span className="text-[#22d3ee]">{project.title}</span>
                      </p>
                      <p className="text-xs text-[#6b7280] mt-0.5 line-clamp-1">
                        {project.description}
                      </p>
                      <span className="text-[10px] text-[#4b5563] mt-2 block">
                        {match.matchScore}% Match Score
                      </span>
                    </div>
                  </div>
                );
              })}
              {myMatches.length === 0 && (
                <div className="text-center py-8 text-[#6b7280] text-sm">
                  No new notifications.
                </div>
              )}
            </div>

            <button className="mt-6 w-full py-3 text-[#6b7280] hover:text-[#22d3ee] text-xs font-semibold tracking-wider uppercase border-t border-[#1a1a1a] pt-4 transition-colors">
              Mark all as read
            </button>
          </section>

          {/* Share Profile Section */}
          <section className="bg-[#121212] border border-[#1a1a1a] p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['Space_Grotesk'] font-semibold text-xl text-white">
                Share Profile
              </h2>
              <div className="w-5 h-5 rounded-full bg-[#22d3ee]/10 text-[#22d3ee] flex items-center justify-center">
                <Copy className="w-3 h-3" />
              </div>
            </div>

            <p className="text-sm text-[#9ca3af] mb-4">
              Share your profile with investors and potential clients. They'll
              be able to view your skills, experience, and portfolio.
            </p>

            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3 mb-4">
              <p className="text-xs font-mono text-[#6b7280] break-all">
                {window.location.origin}/profile/{builder.userId}
              </p>
            </div>

            <Button
              onClick={copyProfileLink}
              className="w-full bg-[#22d3ee] hover:bg-[#22d3ee]/90 text-[#0a0a0a] text-sm font-semibold h-10 flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Profile Link
                </>
              )}
            </Button>
          </section>

          {/* Code Snippet Break */}
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-4 overflow-hidden relative group">
            <div className="absolute top-2 right-2 flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
            </div>
            <p className="text-[10px] text-[#22d3ee] font-mono mb-3 uppercase mt-1">
              nova_status.sh
            </p>
            <pre className="text-xs font-mono text-[#9ca3af]">
              <code>
                <span className="text-pink-400">export</span>{" "}
                <span className="text-blue-400">ENGINE</span>="nova-v1"
                <br />
                <span className="text-pink-400">if</span> [[{" "}
                <span className="text-green-400">$STATUS</span> == "stable" ]];{" "}
                <span className="text-pink-400">then</span>
                <br />
                <span className="text-yellow-400 ml-4">run_matching</span>{" "}
                --priority high
                <br />
                <span className="text-pink-400">fi</span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
