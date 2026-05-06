import { useParams } from "react-router-dom";
import { useApp } from "@/state/AppContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, Star, ExternalLink } from "lucide-react";
import type { Project, BuilderProfile, CompanyProfile } from "@/types";

export default function PublicProfileView() {
  const { userId } = useParams<{ userId: string }>();
  const { state, getProject } = useApp();

  // Find the user (could be builder or company)
  const builder = state.builders.find((b) => b.userId === userId);
  const company = state.companies.find((c) => c.userId === userId);
  const profile = builder || company;

  const isBuilderProfile = (
    profile: BuilderProfile | CompanyProfile,
  ): profile is BuilderProfile => {
    return profile.role === "builder";
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-gray-400 mb-6">
            The profile you're looking for doesn't exist.
          </p>
          <Button
            onClick={() => window.history.back()}
            className="bg-[#22d3ee] hover:bg-[#22d3ee]/90 text-[#0a0a0a]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const isBuilder = "skills" in profile;

  const acceptedApplications = state.applications.filter(
    (app) => app.builderId === profile.userId && app.status === "accepted",
  );

  const builderProjects = acceptedApplications
    .map((app) => getProject(app.projectId))
    .filter((project): project is Project => Boolean(project));

  const ongoingWork = builderProjects.filter(
    (project) => project.status === "in-progress",
  );

  const completedWork = builderProjects.filter(
    (project) => project.status === "closed",
  );

  const profileSkills = isBuilder ? profile.skills : [];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-[#1a1a1a] bg-[#121212]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="text-white hover:bg-[#262626]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-semibold">Public Profile</h1>
          <div></div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header */}
        <div className="bg-[#121212] border border-[#1a1a1a] rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={profile.avatarUrl}
              alt={
                isBuilderProfile(profile)
                  ? profile.fullName
                  : profile.companyName
              }
              className="w-24 h-24 rounded-full border-2 border-[#22d3ee] object-cover"
            />

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                {isBuilderProfile(profile)
                  ? profile.fullName
                  : profile.companyName}
              </h1>

              <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Global</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Joined {new Date(profile.createdAt).getFullYear()}
                  </span>
                </div>
                {isBuilder && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{profile.reputationScore} Reputation</span>
                  </div>
                )}
              </div>

              <p className="text-gray-300 mb-4">{profile.bio}</p>

              {isBuilder ? (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.slice(0, 5).map((skill) => (
                    <span
                      key={skill}
                      className="bg-[#22d3ee]/10 text-[#22d3ee] px-3 py-1 rounded-full text-sm border border-[#22d3ee]/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-400">
                  <p>Industry: {profile.industry}</p>
                  <p>Company Size: {profile.companySize}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {isBuilder ? (
            <>
              <div className="bg-[#121212] border border-[#1a1a1a] rounded-xl p-6 text-center">
                <div className="text-2xl font-bold text-[#22d3ee] mb-2">
                  {profile.completedProjects}
                </div>
                <div className="text-sm text-gray-400">Completed Projects</div>
              </div>

              <div className="bg-[#121212] border border-[#1a1a1a] rounded-xl p-6 text-center">
                <div className="text-2xl font-bold text-[#22d3ee] mb-2">
                  {profile.reputationScore}
                </div>
                <div className="text-sm text-gray-400">Reputation Score</div>
              </div>

              <div className="bg-[#121212] border border-[#1a1a1a] rounded-xl p-6 text-center">
                <div className="text-2xl font-bold text-[#22d3ee] mb-2">
                  {profile.hoursPerWeek}
                </div>
                <div className="text-sm text-gray-400">Hours/Week</div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-[#121212] border border-[#1a1a1a] rounded-xl p-6 text-center">
                <div className="text-2xl font-bold text-[#22d3ee] mb-2">
                  {profile.postedProjects}
                </div>
                <div className="text-sm text-gray-400">Posted Projects</div>
              </div>

              <div className="bg-[#121212] border border-[#1a1a1a] rounded-xl p-6 text-center">
                <div className="text-2xl font-bold text-[#22d3ee] mb-2">
                  {profile.companySize}
                </div>
                <div className="text-sm text-gray-400">Company Size</div>
              </div>

              <div className="bg-[#121212] border border-[#1a1a1a] rounded-xl p-6 text-center">
                <div className="text-2xl font-bold text-[#22d3ee] mb-2">
                  {profile.industry}
                </div>
                <div className="text-sm text-gray-400">Industry</div>
              </div>
            </>
          )}
        </div>

        {/* Builder Summary & Work Details */}
        {isBuilder && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#121212] border border-[#1a1a1a] rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-3">
                Profile at a Glance
              </h2>
              <div className="space-y-3 text-sm text-gray-300">
                <p>
                  <span className="font-semibold text-white">Experience:</span>{" "}
                  {profile.experienceLevel}
                </p>
                <p>
                  <span className="font-semibold text-white">
                    Availability:
                  </span>{" "}
                  {profile.availabilityStatus}
                </p>
                <p>
                  <span className="font-semibold text-white">
                    Hours / Week:
                  </span>{" "}
                  {profile.hoursPerWeek}
                </p>
                <p>
                  <span className="font-semibold text-white">
                    Completed Projects:
                  </span>{" "}
                  {profile.completedProjects}
                </p>
                <p>
                  <span className="font-semibold text-white">
                    Investor-ready Score:
                  </span>{" "}
                  {profile.reputationScore}
                </p>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#1a1a1a] rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-3">Skills & Strengths</h2>
              <div className="flex flex-wrap gap-2">
                {profileSkills.length > 0 ? (
                  profileSkills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-[#22d3ee]/10 text-[#22d3ee] px-3 py-1 rounded-full text-sm border border-[#22d3ee]/20"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400">No skills listed yet.</p>
                )}
              </div>
            </div>

            <div className="bg-[#121212] border border-[#1a1a1a] rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-3">Project Snapshot</h2>
              <div className="space-y-3 text-sm text-gray-300">
                <p>
                  <span className="font-semibold text-white">
                    Ongoing Work:
                  </span>{" "}
                  {ongoingWork.length}
                </p>
                <p>
                  <span className="font-semibold text-white">Closed Wins:</span>{" "}
                  {completedWork.length}
                </p>
                <p>
                  <span className="font-semibold text-white">
                    Total Accepted Jobs:
                  </span>{" "}
                  {builderProjects.length}
                </p>
                <p className="text-gray-400">
                  This is the work investors will see on your transparent NOVA
                  profile.
                </p>
              </div>
            </div>
          </div>
        )}

        {isBuilder && ongoingWork.length > 0 && (
          <div className="bg-[#121212] border border-[#1a1a1a] rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-5">Ongoing Projects</h2>
            <div className="space-y-4">
              {ongoingWork.map((project) => (
                <div
                  key={project.id}
                  className="border border-[#1a1a1a] rounded-2xl p-5 hover:border-[#22d3ee]/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {project.category} · {project.experienceLevelRequired}{" "}
                        level
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-[#22d3ee]/10 px-3 py-1 text-sm text-[#22d3ee]">
                      In Progress
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mt-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-400">
                    {project.duration && (
                      <span>Duration: {project.duration}</span>
                    )}
                    {project.budget && <span>Budget: {project.budget}</span>}
                    <span>Team size: {project.teamSize}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isBuilder && completedWork.length > 0 && (
          <div className="bg-[#121212] border border-[#1a1a1a] rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-5">Completed Projects</h2>
            <div className="space-y-4">
              {completedWork.map((project) => (
                <div
                  key={project.id}
                  className="border border-[#1a1a1a] rounded-2xl p-5 hover:border-[#10b981]/40 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {project.category} · {project.experienceLevelRequired}{" "}
                        level
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-[#10b981]/10 px-3 py-1 text-sm text-[#10b981]">
                      Completed
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mt-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-400">
                    {project.duration && (
                      <span>Duration: {project.duration}</span>
                    )}
                    {project.budget && <span>Budget: {project.budget}</span>}
                    <span>Team size: {project.teamSize}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isBuilder &&
          profile.portfolioLinks &&
          profile.portfolioLinks.length > 0 && (
            <div className="bg-[#121212] border border-[#1a1a1a] rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.portfolioLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-lg hover:bg-[#262626] transition-colors border border-[#1a1a1a]"
                  >
                    <ExternalLink className="w-4 h-4 text-[#22d3ee]" />
                    <span className="text-sm text-gray-300 truncate">
                      {link}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">
            Interested in working with {profile.fullName}?
          </p>
          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-[#22d3ee] hover:bg-[#22d3ee]/90 text-[#0a0a0a] px-8"
          >
            Explore NOVA Platform
          </Button>
        </div>
      </div>
    </div>
  );
}
