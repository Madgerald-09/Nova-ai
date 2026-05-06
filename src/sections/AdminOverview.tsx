import { useApp } from "@/state/AppContext";
import { ScoreRoller } from "@/components/ScoreRoller";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, RefreshCw, UserCheck, GitMerge } from "lucide-react";

export function AdminOverview() {
  const { state, dispatch, runMatching } = useApp();

  const totalBuilders = state.builders.length;
  const totalCompanies = state.companies.length;
  const totalProjects = state.projects.length;
  const activeMatches = state.matches.length;
  const autoRecommendations = state.matches.filter(
    (m) => m.status === "auto-recommend",
  ).length;
  const avgScore =
    state.matches.length > 0
      ? Math.round(
          (state.matches.reduce((sum, m) => sum + m.matchScore, 0) /
            state.matches.length) *
            10,
        ) / 10
      : 0;

  const recentActivity = state.matches
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 10);

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-['Space_Grotesk'] font-semibold text-2xl">
            Admin Overview
          </h1>
          <p className="text-sm text-[#6b7280] mt-1">
            System overview and matching engine controls
          </p>
        </div>
        <Button
          size="sm"
          onClick={runMatching}
          disabled={state.engineStatus === "processing"}
          className="bg-[#22d3ee] text-[#030712] hover:bg-[#22d3ee]/90"
        >
          {state.engineStatus === "processing" ? (
            <RefreshCw className="w-4 h-4 mr-1.5 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4 mr-1.5" />
          )}
          Run Matching
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-md bg-[#22d3ee]/10">
              <Users className="w-4 h-4 text-[#22d3ee]" />
            </div>
            <span className="text-xs text-[#6b7280] uppercase tracking-wider">
              Builders
            </span>
          </div>
          <p className="font-['Space_Grotesk'] font-bold text-2xl text-[#f9fafb]">
            {totalBuilders}
          </p>
        </div>
        <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-md bg-[#8b5cf6]/10">
              <UserCheck className="w-4 h-4 text-[#8b5cf6]" />
            </div>
            <span className="text-xs text-[#6b7280] uppercase tracking-wider">
              Companies
            </span>
          </div>
          <p className="font-['Space_Grotesk'] font-bold text-2xl text-[#f9fafb]">
            {totalCompanies}
          </p>
        </div>
        <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-md bg-[#10b981]/10">
              <Briefcase className="w-4 h-4 text-[#10b981]" />
            </div>
            <span className="text-xs text-[#6b7280] uppercase tracking-wider">
              Projects
            </span>
          </div>
          <p className="font-['Space_Grotesk'] font-bold text-2xl text-[#f9fafb]">
            {totalProjects}
          </p>
        </div>
        <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-md bg-[#f59e0b]/10">
              <GitMerge className="w-4 h-4 text-[#f59e0b]" />
            </div>
            <span className="text-xs text-[#6b7280] uppercase tracking-wider">
              Matches
            </span>
          </div>
          <p className="font-['Space_Grotesk'] font-bold text-2xl text-[#f9fafb]">
            {activeMatches}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Match Distribution */}
        <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-5">
          <h3 className="font-['Space_Grotesk'] font-semibold text-sm mb-4">
            Match Distribution
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#9ca3af]">Auto-Recommend</span>
                <span className="text-xs font-mono text-[#10b981]">
                  {autoRecommendations}
                </span>
              </div>
              <div className="h-2 rounded-full bg-[#1f2937] overflow-hidden">
                <div
                  className="h-full bg-[#10b981] rounded-full transition-all duration-500"
                  style={{
                    width:
                      activeMatches > 0
                        ? `${(autoRecommendations / activeMatches) * 100}%`
                        : "0%",
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#9ca3af]">Recommend</span>
                <span className="text-xs font-mono text-[#f59e0b]">
                  {state.matches.filter((m) => m.status === "recommend").length}
                </span>
              </div>
              <div className="h-2 rounded-full bg-[#1f2937] overflow-hidden">
                <div
                  className="h-full bg-[#f59e0b] rounded-full transition-all duration-500"
                  style={{
                    width:
                      activeMatches > 0
                        ? `${(state.matches.filter((m) => m.status === "recommend").length / activeMatches) * 100}%`
                        : "0%",
                  }}
                />
              </div>
            </div>
            <div className="pt-3 border-t border-[#1f2937]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6b7280]">Average Score</span>
                <span className="font-['Space_Grotesk'] font-bold text-lg text-[#22d3ee]">
                  <ScoreRoller value={avgScore} />%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-5">
          <h3 className="font-['Space_Grotesk'] font-semibold text-sm mb-4">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent border-[#1f2937] text-[#9ca3af] hover:text-[#f9fafb] hover:border-[#374151] text-xs min-w-0"
              onClick={() => dispatch({ type: "SET_TAB", payload: "users" })}
            >
              <Users className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
              <span className="truncate">View All Users</span>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent border-[#1f2937] text-[#9ca3af] hover:text-[#f9fafb] hover:border-[#374151] text-xs min-w-0"
              onClick={() => dispatch({ type: "SET_TAB", payload: "matching" })}
            >
              <GitMerge className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
              <span className="truncate">Match Users Manually</span>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent border-[#1f2937] text-[#9ca3af] hover:text-[#f9fafb] hover:border-[#374151] text-xs min-w-0"
              onClick={runMatching}
            >
              <RefreshCw className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
              <span className="truncate">Recalculate All Matches</span>
            </Button>
          </div>
        </div>

        {/* Engine Status */}
        <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-5">
          <h3 className="font-['Space_Grotesk'] font-semibold text-sm mb-4">
            Engine Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#9ca3af]">Status</span>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                  state.engineStatus === "online"
                    ? "text-[#10b981]"
                    : state.engineStatus === "processing"
                      ? "text-[#f59e0b]"
                      : "text-red-400"
                }`}
              >
                <span className={`relative flex h-2 w-2`}>
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                      state.engineStatus === "online"
                        ? "bg-[#10b981]"
                        : "bg-[#f59e0b]"
                    } opacity-75`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      state.engineStatus === "online"
                        ? "bg-[#10b981]"
                        : state.engineStatus === "processing"
                          ? "bg-[#f59e0b]"
                          : "bg-red-500"
                    }`}
                  ></span>
                </span>
                {state.engineStatus}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#9ca3af]">Last Run</span>
              <span className="text-xs text-[#6b7280]">
                {state.lastRunTimestamp
                  ? new Date(state.lastRunTimestamp).toLocaleString()
                  : "Never"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#9ca3af]">Total Builders</span>
              <span className="text-xs font-mono text-[#f9fafb]">
                {totalBuilders}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#9ca3af]">Total Projects</span>
              <span className="text-xs font-mono text-[#f9fafb]">
                {totalProjects}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#9ca3af]">Active Matches</span>
              <span className="text-xs font-mono text-[#f9fafb]">
                {activeMatches}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-5">
        <h3 className="font-['Space_Grotesk'] font-semibold text-sm mb-4">
          Recent Matching Activity
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {recentActivity.map((match) => {
            const builder = state.builders.find(
              (b) => b.userId === match.builderId,
            );
            const project = state.projects.find(
              (p) => p.id === match.projectId,
            );
            return (
              <div
                key={match.id}
                className="flex items-center gap-2 p-2 bg-[#111827] rounded-md min-w-0"
              >
                <img
                  src={builder?.avatarUrl}
                  alt=""
                  className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-[#9ca3af] truncate">
                    {builder?.fullName}
                  </p>
                  <p className="text-[9px] text-[#6b7280] truncate">
                    {project?.title}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-mono flex-shrink-0 ml-1 ${
                    match.status === "auto-recommend"
                      ? "text-[#10b981]"
                      : "text-[#f59e0b]"
                  }`}
                >
                  {match.matchScore}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
