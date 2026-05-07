import { useState, useRef } from "react";
import { useApp } from "@/state/AppContext";
import type { BuilderProfile, CompanyProfile } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Trash2 } from "lucide-react";

const EXPERIENCE_LEVELS = ["beginner", "intermediate", "advanced"];
const AVAILABILITY_STATUS = ["available", "busy"];
const SKILL_OPTIONS = [
  "React",
  "TypeScript",
  "Tailwind",
  "Next.js",
  "GraphQL",
  "Vue.js",
  "Angular",
  "Node.js",
  "Python",
  "Django",
  "Java",
  "Spring Boot",
  "PHP",
  "Laravel",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Firebase",
  "Docker",
  "Kubernetes",
  "AWS",
  "Terraform",
  "CI/CD",
  "React Native",
  "Flutter",
  "Swift",
  "Kotlin",
  "Figma",
  "Adobe XD",
  "Prototyping",
  "User Research",
  "Design Systems",
  "UI Design",
  "Machine Learning",
  "TensorFlow",
  "Pandas",
  "SQL",
  "Spark",
];

export function ProfileEditModal() {
  const { state, dispatch } = useApp();

  const builder =
    state.userRole === "builder"
      ? state.builders.find((b) => b.userId === state.currentUser?.userId)
      : undefined;

  const company =
    state.userRole === "company"
      ? state.companies.find((c) => c.userId === state.currentUser?.userId)
      : undefined;

  const isBuilder = state.userRole === "builder";

  // Form state for builder
  const [builderForm, setBuilderForm] = useState<Partial<BuilderProfile>>(
    builder || {},
  );
  // Form state for company
  const [companyForm, setCompanyForm] = useState<Partial<CompanyProfile>>(
    company || {},
  );

  const [newLink, setNewLink] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (isBuilder) {
          setBuilderForm({ ...builderForm, avatarUrl: result });
        } else {
          setCompanyForm({ ...companyForm, avatarUrl: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!builder && !company) return null;

  const handleSave = () => {
    if (isBuilder && builder && builderForm) {
      const updated: BuilderProfile = {
        ...builder,
        ...builderForm,
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: "UPDATE_BUILDER", payload: updated });
    } else if (!isBuilder && company && companyForm) {
      const updated: CompanyProfile = {
        ...company,
        ...companyForm,
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: "UPDATE_COMPANY", payload: updated });
    }
    dispatch({ type: "TOGGLE_PROFILE_EDIT" });
  };

  const toggleSkill = (skill: string) => {
    if (!isBuilder) return;
    const currentSkills = builderForm.skills || builder?.skills || [];
    const updated = currentSkills.includes(skill)
      ? currentSkills.filter((s) => s !== skill)
      : [...currentSkills, skill];
    setBuilderForm({ ...builderForm, skills: updated });
  };

  const addLink = () => {
    if (!newLink.trim() || !isBuilder) return;
    const currentLinks =
      builderForm.portfolioLinks || builder?.portfolioLinks || [];
    setBuilderForm({
      ...builderForm,
      portfolioLinks: [...currentLinks, newLink.trim()],
    });
    setNewLink("");
  };

  const removeLink = (index: number) => {
    if (!isBuilder) return;
    const currentLinks =
      builderForm.portfolioLinks || builder?.portfolioLinks || [];
    setBuilderForm({
      ...builderForm,
      portfolioLinks: currentLinks.filter((_, i) => i !== index),
    });
  };

  const currentBuilder = builder || ({} as BuilderProfile);
  const currentCompany = company || ({} as CompanyProfile);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-xl w-full max-w-lg max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-[#1f2937]">
          <h2 className="font-['Space_Grotesk'] font-semibold text-lg">
            Edit Profile
          </h2>
          <button
            onClick={() => dispatch({ type: "TOGGLE_PROFILE_EDIT" })}
            className="p-1.5 rounded-md hover:bg-[#111827] transition-colors"
            aria-label="Close profile editor"
            title="Close"
          >
            <X className="w-4 h-4 text-[#9ca3af]" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-5 space-y-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#111827] border border-[#1f2937]">
              <img
                src={
                  isBuilder
                    ? builderForm.avatarUrl || currentBuilder.avatarUrl
                    : companyForm.avatarUrl || currentCompany.avatarUrl
                }
                alt="Avatar"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center bg-black/30 text-[11px] text-white opacity-0 hover:opacity-100 transition-opacity"
              >
                Change photo
              </button>
            </div>
            <div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="bg-[#111827] border-[#1f2937] text-xs hover:bg-[#1f2937] text-[#9ca3af] hover:text-[#f9fafb]"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose image from device
              </Button>
              <p className="text-[11px] text-[#6b7280] mt-2 max-w-xs">
                Upload any profile photo from your phone or computer.
              </p>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleAvatarUpload}
                aria-label="Upload profile picture"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <Input
              value={
                isBuilder
                  ? builderForm.fullName || currentBuilder.fullName
                  : companyForm.fullName || currentCompany.fullName
              }
              onChange={(e) =>
                isBuilder
                  ? setBuilderForm({ ...builderForm, fullName: e.target.value })
                  : setCompanyForm({ ...companyForm, fullName: e.target.value })
              }
              className="bg-[#111827] border-[#1f2937] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-1.5">
              Username
            </label>
            <Input
              value={
                isBuilder
                  ? builderForm.username || currentBuilder.username
                  : companyForm.username || currentCompany.username
              }
              onChange={(e) =>
                isBuilder
                  ? setBuilderForm({ ...builderForm, username: e.target.value })
                  : setCompanyForm({ ...companyForm, username: e.target.value })
              }
              className="bg-[#111827] border-[#1f2937] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-1.5">
              Email
            </label>
            <Input
              type="email"
              value={
                isBuilder
                  ? builderForm.email || currentBuilder.email
                  : companyForm.email || currentCompany.email
              }
              onChange={(e) =>
                isBuilder
                  ? setBuilderForm({ ...builderForm, email: e.target.value })
                  : setCompanyForm({ ...companyForm, email: e.target.value })
              }
              className="bg-[#111827] border-[#1f2937] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-1.5">
              Bio
            </label>
            <Textarea
              value={
                isBuilder
                  ? builderForm.bio || currentBuilder.bio
                  : companyForm.bio || currentCompany.bio
              }
              onChange={(e) =>
                isBuilder
                  ? setBuilderForm({ ...builderForm, bio: e.target.value })
                  : setCompanyForm({ ...companyForm, bio: e.target.value })
              }
              className="bg-[#111827] border-[#1f2937] text-sm min-h-[80px]"
              maxLength={300}
            />
            <span className="text-[10px] text-[#6b7280] mt-1">
              {
                (
                  (isBuilder
                    ? builderForm.bio || currentBuilder.bio
                    : companyForm.bio || currentCompany.bio) || ""
                ).length
              }
              /300
            </span>
          </div>

          {isBuilder && (
            <>
              <div>
                <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-1.5">
                  Experience Level
                </label>
                <div className="flex gap-2">
                  {EXPERIENCE_LEVELS.map((level) => (
                    <button
                      key={level}
                      onClick={() =>
                        setBuilderForm({
                          ...builderForm,
                          experienceLevel: level as
                            | "beginner"
                            | "intermediate"
                            | "advanced",
                        })
                      }
                      className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                        (builderForm.experienceLevel ||
                          currentBuilder.experienceLevel) === level
                          ? "bg-[#111827] text-[#22d3ee] border border-[#374151]"
                          : "text-[#9ca3af] hover:text-[#f9fafb] bg-[#111827]/50 border border-transparent"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-1.5">
                  Skills
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-auto p-2 bg-[#111827] rounded-md border border-[#1f2937]">
                  {SKILL_OPTIONS.map((skill) => {
                    const currentSkills =
                      builderForm.skills || currentBuilder.skills || [];
                    const isSelected = currentSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                          isSelected
                            ? "bg-[#22d3ee]/10 text-[#22d3ee] border border-[#22d3ee]/30"
                            : "bg-[#0a0f1c] text-[#6b7280] border border-[#1f2937] hover:text-[#9ca3af]"
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-1.5">
                  Availability
                </label>
                <div className="flex gap-2">
                  {AVAILABILITY_STATUS.map((status) => (
                    <button
                      key={status}
                      onClick={() =>
                        setBuilderForm({
                          ...builderForm,
                          availabilityStatus: status as "available" | "busy",
                        })
                      }
                      className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                        (builderForm.availabilityStatus ||
                          currentBuilder.availabilityStatus) === status
                          ? "bg-[#111827] text-[#22d3ee] border border-[#374151]"
                          : "text-[#9ca3af] hover:text-[#f9fafb] bg-[#111827]/50 border border-transparent"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-1.5">
                  Hours Per Week
                </label>
                <Input
                  type="number"
                  value={
                    builderForm.hoursPerWeek || currentBuilder.hoursPerWeek || 0
                  }
                  onChange={(e) =>
                    setBuilderForm({
                      ...builderForm,
                      hoursPerWeek: parseInt(e.target.value) || 0,
                    })
                  }
                  className="bg-[#111827] border-[#1f2937] text-sm w-24"
                  min={0}
                  max={80}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-1.5">
                  Portfolio Links
                </label>
                <div className="space-y-2">
                  {(
                    builderForm.portfolioLinks ||
                    currentBuilder.portfolioLinks ||
                    []
                  ).map((link, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="flex-1 text-xs text-[#22d3ee] truncate">
                        {link}
                      </span>
                      <button
                        onClick={() => removeLink(i)}
                        className="p-1 rounded hover:bg-[#111827] transition-colors"
                        aria-label={`Remove portfolio link: ${link}`}
                        title="Remove link"
                      >
                        <Trash2 className="w-3 h-3 text-[#6b7280]" />
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <Input
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                      placeholder="https://..."
                      className="bg-[#111827] border-[#1f2937] text-xs flex-1"
                      onKeyDown={(e) => e.key === "Enter" && addLink()}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={addLink}
                      className="text-[#22d3ee] hover:text-[#22d3ee] hover:bg-[#22d3ee]/10 h-8 px-2"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}

          {!isBuilder && (
            <>
              <div>
                <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-1.5">
                  Company Name
                </label>
                <Input
                  value={
                    companyForm.companyName || currentCompany.companyName || ""
                  }
                  onChange={(e) =>
                    setCompanyForm({
                      ...companyForm,
                      companyName: e.target.value,
                    })
                  }
                  className="bg-[#111827] border-[#1f2937] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-1.5">
                  Industry
                </label>
                <Input
                  value={companyForm.industry || currentCompany.industry || ""}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, industry: e.target.value })
                  }
                  className="bg-[#111827] border-[#1f2937] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-1.5">
                  Website
                </label>
                <Input
                  value={companyForm.website || currentCompany.website || ""}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, website: e.target.value })
                  }
                  className="bg-[#111827] border-[#1f2937] text-sm"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 p-5 border-t border-[#1f2937]">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch({ type: "TOGGLE_PROFILE_EDIT" })}
            className="text-[#9ca3af] hover:text-[#f9fafb]"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            className="bg-[#22d3ee] text-[#030712] hover:bg-[#22d3ee]/90"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
