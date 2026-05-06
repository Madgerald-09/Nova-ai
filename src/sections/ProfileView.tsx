import { useApp } from "@/state/AppContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Pencil, Globe, Briefcase, Star, Clock, Link2 } from "lucide-react";

export function ProfileView() {
  const { state, dispatch } = useApp();

  if (state.userRole === "builder") {
    const builder = state.builders.find(
      (b) => b.userId === state.currentUser?.userId,
    );
    if (!builder) return null;

    return (
      <div className="p-4 lg:p-6 max-w-3xl mx-auto animate-fade-in-up">
        {/* Header Card */}
        <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <img
                src={builder.avatarUrl}
                alt=""
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h1 className="font-['Space_Grotesk'] font-semibold text-lg md:text-xl text-[#f9fafb] break-words">
                  {builder.fullName}
                </h1>
                <p className="text-xs md:text-sm text-[#9ca3af] break-words">
                  @{builder.username}
                </p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <Badge
                    variant="outline"
                    className={`text-xs capitalize ${
                      builder.availabilityStatus === "available"
                        ? "bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30"
                        : "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30"
                    }`}
                  >
                    {builder.availabilityStatus}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-[#111827] text-[#9ca3af] border-[#1f2937] text-xs capitalize"
                  >
                    {builder.experienceLevel}
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="bg-transparent border-[#1f2937] text-[#9ca3af] hover:text-[#22d3ee] hover:border-[#374151] flex-shrink-0"
              onClick={() => dispatch({ type: "TOGGLE_PROFILE_EDIT" })}
            >
              <Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-5">
              <h3 className="font-['Space_Grotesk'] font-semibold text-sm mb-3">
                About
              </h3>
              <p className="text-xs md:text-sm text-[#9ca3af] leading-relaxed break-words">
                {builder.bio}
              </p>
            </div>

            {/* Skills */}
            <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-5">
              <h3 className="font-['Space_Grotesk'] font-semibold text-sm mb-3">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {builder.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-[#111827] border border-[#1f2937] rounded-full text-xs text-[#22d3ee]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-5">
              <h3 className="font-['Space_Grotesk'] font-semibold text-sm mb-3">
                Portfolio
              </h3>
              <div className="space-y-2">
                {builder.portfolioLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs md:text-sm text-[#22d3ee] hover:underline break-all"
                  >
                    <Link2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="break-all">{link}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6">
            <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-5">
              <h3 className="font-['Space_Grotesk'] font-semibold text-sm mb-4">
                Activity
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-2 text-xs text-[#9ca3af]">
                      <Briefcase className="w-3.5 h-3.5" /> Projects
                    </span>
                    <span className="text-sm font-semibold text-[#f9fafb]">
                      {builder.completedProjects}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-2 text-xs text-[#9ca3af]">
                      <Star className="w-3.5 h-3.5" /> Reputation
                    </span>
                    <span className="text-sm font-semibold text-[#f9fafb]">
                      {builder.reputationScore}
                    </span>
                  </div>
                  <Progress
                    value={builder.reputationScore}
                    className="h-1.5 bg-[#1f2937]"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-2 text-xs text-[#9ca3af]">
                      <Clock className="w-3.5 h-3.5" /> Hours/Week
                    </span>
                    <span className="text-sm font-semibold text-[#f9fafb]">
                      {builder.hoursPerWeek}h
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-5">
              <h3 className="font-['Space_Grotesk'] font-semibold text-sm mb-3">
                Details
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#9ca3af] min-w-0">
                  <span className="text-[#6b7280] w-20 flex-shrink-0">
                    Email
                  </span>
                  <span className="break-all">{builder.email}</span>
                </div>
                <div className="flex items-center gap-2 text-[#9ca3af]">
                  <span className="text-[#6b7280] w-20 flex-shrink-0">
                    Joined
                  </span>
                  <span className="break-words">
                    {new Date(builder.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#9ca3af]">
                  <span className="text-[#6b7280] w-20 flex-shrink-0">
                    Updated
                  </span>
                  <span className="break-words">
                    {new Date(builder.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Company Profile
  const company = state.companies.find(
    (c) => c.userId === state.currentUser?.userId,
  );
  if (!company) return null;

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto animate-fade-in-up">
      <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <img
              src={company.avatarUrl}
              alt=""
              className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h1 className="font-['Space_Grotesk'] font-semibold text-lg md:text-xl text-[#f9fafb] break-words">
                {company.companyName}
              </h1>
              <p className="text-xs md:text-sm text-[#9ca3af] break-words">
                {company.fullName} &bull; {company.industry}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant="outline"
                  className="bg-[#111827] text-[#9ca3af] border-[#1f2937] text-xs"
                >
                  {company.companySize} employees
                </Badge>
              </div>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="bg-transparent border-[#1f2937] text-[#9ca3af] hover:text-[#22d3ee] hover:border-[#374141] flex-shrink-0"
            onClick={() => dispatch({ type: "TOGGLE_PROFILE_EDIT" })}
          >
            <Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-5">
          <h3 className="font-['Space_Grotesk'] font-semibold text-sm mb-3">
            About
          </h3>
          <p className="text-xs md:text-sm text-[#9ca3af] leading-relaxed break-words">
            {company.bio}
          </p>
        </div>
        <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-5">
          <h3 className="font-['Space_Grotesk'] font-semibold text-sm mb-3">
            Details
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2 text-[#9ca3af] min-w-0">
              <Globe className="w-3.5 h-3.5 text-[#6b7280] flex-shrink-0" />
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#22d3ee] hover:underline break-all"
              >
                {company.website}
              </a>
            </div>
            <div className="flex items-center gap-2 text-[#9ca3af]">
              <Briefcase className="w-3.5 h-3.5 text-[#6b7280] flex-shrink-0" />
              <span className="break-words">
                {company.postedProjects} projects posted
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#9ca3af] min-w-0">
              <span className="text-[#6b7280] w-16 flex-shrink-0">Email</span>
              <span className="break-all">{company.email}</span>
            </div>
            <div className="flex items-center gap-2 text-[#9ca3af]">
              <span className="text-[#6b7280] w-16 flex-shrink-0">Joined</span>
              <span className="break-words">
                {new Date(company.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
