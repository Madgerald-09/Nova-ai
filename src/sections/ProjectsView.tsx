import { useApp } from "@/state/AppContext";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, Calendar } from "lucide-react";

export function ProjectsView() {
  const { state, getProjectMatches, getBuilder } = useApp();

  // For builder: show their active projects and matches
  // For company: show their posted projects
  // For admin: show all projects

  const projects =
    state.userRole === "company"
      ? state.projects.filter((p) => {
          const company = state.companies.find(
            (c) => c.userId === state.currentUser?.userId,
          );
          return p.founderId === company?.userId;
        })
      : state.projects;

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto animate-fade-in-up">
      <div className="mb-6">
        <h1 className="font-['Space_Grotesk'] font-semibold text-2xl">
          {state.userRole === "company" ? "My Projects" : "All Projects"}
        </h1>
        <p className="text-sm text-[#6b7280] mt-1">
          {projects.length} projects{" "}
          {state.userRole === "company" ? "posted" : "in the system"}
        </p>
      </div>

      <div className="space-y-4">
        {projects.map((project) => {
          const matches = getProjectMatches(project.id);

          return (
            <div
              key={project.id}
              className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-5"
            >
              <div className="flex items-start gap-4">
                <img
                  src={project.coverImage}
                  alt=""
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 min-w-0">
                    <h3 className="font-medium text-sm text-[#f9fafb] break-words pr-2">
                      {project.title}
                    </h3>
                    <Badge
                      variant="outline"
                      className={`text-[9px] flex-shrink-0 ${
                        project.status === "open"
                          ? "bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30"
                          : project.status === "in-progress"
                            ? "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30"
                            : "bg-[#6b7280]/10 text-[#6b7280] border-[#6b7280]/30"
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#9ca3af] mb-2 line-clamp-2 break-words">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-[#6b7280] mb-3 flex-wrap">
                    <span className="flex items-center gap-1 flex-shrink-0">
                      <DollarSign className="w-3 h-3" />
                      {project.budget}
                    </span>
                    <span className="flex items-center gap-1 flex-shrink-0">
                      <Calendar className="w-3 h-3" />
                      {project.duration}
                    </span>
                    <span className="flex items-center gap-1 flex-shrink-0">
                      <Users className="w-3 h-3" />
                      {project.teamSize} needed
                    </span>
                    <span className="break-words">{project.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-[#111827] rounded text-[10px] text-[#22d3ee] break-words"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top matches preview */}
              {matches.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[#1f2937]">
                  <p className="text-[10px] text-[#6b7280] uppercase tracking-wider mb-2">
                    Top Matches
                  </p>
                  <div className="flex items-center gap-3 overflow-x-auto">
                    {matches.slice(0, 5).map((match) => {
                      const builder = getBuilder(match.builderId);
                      if (!builder) return null;
                      return (
                        <div
                          key={match.id}
                          className="flex items-center gap-1.5 flex-shrink-0 min-w-0"
                        >
                          <img
                            src={builder.avatarUrl}
                            alt=""
                            className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                          />
                          <span className="text-[10px] text-[#9ca3af] truncate max-w-[60px]">
                            {builder.fullName.split(" ")[0]}
                          </span>
                          <span className="text-[10px] font-mono text-[#22d3ee] flex-shrink-0">
                            {match.matchScore}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
