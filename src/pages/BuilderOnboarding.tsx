import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApp } from "@/state/AppContext";
import { ArrowLeft, ImageIcon, UploadCloud } from "lucide-react";
import type { BuilderProfile } from "@/types";

interface BuilderOnboardingProps {
  userId: string;
  userName?: string;
  onComplete: () => void;
  onBack: () => void;
}

const onboardingSchema = z.object({
  displayName: z.string().min(2, "Please enter your name"),
  bio: z.string().min(10, "Tell us a bit about yourself"),
  skills: z.string().min(3, "List at least one skill"),
  experienceLevel: z.enum(["beginner", "intermediate", "advanced"]),
  portfolioLinks: z.string().optional(),
  availabilityStatus: z.enum(["available", "busy"]),
  hoursPerWeek: z.coerce
    .number()
    .min(1, "At least 1 hour per week")
    .max(168, "Enter a valid number"),
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

export default function BuilderOnboarding({
  userId,
  userName,
  onComplete,
  onBack,
}: BuilderOnboardingProps) {
  const { state, dispatch } = useApp();
  const builder = state.builders.find((b) => b.userId === userId);
  const [avatarPreview, setAvatarPreview] = useState<string>(
    builder?.avatarUrl ?? "",
  );

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema) as any,
    defaultValues: {
      displayName: builder?.fullName ?? userName ?? "",
      bio: builder?.bio ?? "",
      skills: builder?.skills.join(", ") ?? "",
      experienceLevel: builder?.experienceLevel ?? "beginner",
      portfolioLinks: (builder?.portfolioLinks ?? []).join(", ") ?? "",
      availabilityStatus: builder?.availabilityStatus ?? "available",
      hoursPerWeek: builder?.hoursPerWeek ?? 40,
    },
  });

  useEffect(() => {
    if (builder) {
      form.reset({
        displayName: builder.fullName,
        bio: builder.bio,
        skills: builder.skills.join(", "),
        experienceLevel: builder.experienceLevel,
        portfolioLinks: builder.portfolioLinks.join(", "),
        availabilityStatus: builder.availabilityStatus,
        hoursPerWeek: builder.hoursPerWeek,
      });
      setAvatarPreview(builder.avatarUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [builder]);

  if (!builder) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6 py-12">
        <div className="max-w-xl w-full rounded-3xl border border-white/10 bg-[#0f0f11]/80 p-10 text-center">
          <p className="text-lg font-semibold">Builder profile not found.</p>
          <p className="text-sm text-slate-400 mt-3">
            Please return to the signup flow and try again.
          </p>
          <Button className="mt-8" onClick={onBack}>
            Return
          </Button>
        </div>
      </div>
    );
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
  };

  const onSubmit: SubmitHandler<OnboardingFormData> = (values) => {
    const updatedBuilder: BuilderProfile = {
      ...builder,
      fullName: values.displayName,
      avatarUrl: avatarPreview || builder.avatarUrl,
      bio: values.bio,
      skills: values.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      experienceLevel: values.experienceLevel,
      portfolioLinks: values.portfolioLinks
        ? values.portfolioLinks
            .split(",")
            .map((link) => link.trim())
            .filter(Boolean)
        : [],
      availabilityStatus: values.availabilityStatus,
      hoursPerWeek: values.hoursPerWeek,
    };

    dispatch({ type: "UPDATE_BUILDER", payload: updatedBuilder });
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#0f0f11] text-slate-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-indigo-300/80">
              NOVA Builder Onboarding
            </p>
            <h1 className="text-4xl font-black text-white leading-tight">
              Tell us about yourself
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Answer a few questions so your builder profile shows your skills,
              experience, and projects right away.
            </p>
          </div>
          <Button
            variant="ghost"
            className="text-slate-400 hover:text-white"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0f0f11]/60 backdrop-blur-sm p-8 shadow-xl shadow-indigo-500/10">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[270px_1fr] items-start">
              <div className="space-y-4">
                <div className="relative h-64 rounded-3xl border border-white/10 bg-[#0f0f11] p-4 flex flex-col items-center justify-center text-center">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Profile preview"
                      className="h-44 w-44 rounded-full object-cover border border-white/10"
                    />
                  ) : (
                    <div className="h-44 w-44 rounded-full bg-white/5 border border-dashed border-white/10 flex items-center justify-center text-slate-500">
                      <ImageIcon className="h-8 w-8" />
                    </div>
                  )}
                  <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">
                    <UploadCloud className="h-4 w-4" />
                    Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    Profile name
                  </label>
                  <Input
                    {...form.register("displayName")}
                    className="mt-2 bg-white/5 border-white/10 text-white"
                    placeholder="Your display name"
                  />
                  <p className="mt-2 text-xs text-rose-400">
                    {form.formState.errors.displayName?.message}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300">
                    What you build
                  </label>
                  <Textarea
                    {...form.register("bio")}
                    className="mt-2 bg-white/5 border-white/10 text-white"
                    rows={5}
                    placeholder="Describe your focus, experience, and what you want to build on NOVA"
                  />
                  <p className="mt-2 text-xs text-rose-400">
                    {form.formState.errors.bio?.message}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Skills
                </label>
                <Input
                  {...form.register("skills")}
                  className="mt-2 bg-white/5 border-white/10 text-white"
                  placeholder="React, TypeScript, Figma"
                />
                <p className="mt-2 text-xs text-slate-400">
                  Separate skills with commas.
                </p>
                <p className="mt-2 text-xs text-rose-400">
                  {form.formState.errors.skills?.message}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Portfolio links
                </label>
                <Input
                  {...form.register("portfolioLinks")}
                  className="mt-2 bg-white/5 border-white/10 text-white"
                  placeholder="https://github.com/you, https://yourportfolio.com"
                />
                <p className="mt-2 text-xs text-slate-400">
                  Add links separated by commas.
                </p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Experience level
                </label>
                <Select
                  onValueChange={(
                    value: "beginner" | "intermediate" | "advanced",
                  ) => form.setValue("experienceLevel", value)}
                  defaultValue={form.getValues("experienceLevel")}
                >
                  <SelectTrigger className="mt-2 bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Choose level" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0f0f11] border-white/10 text-white">
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-2 text-xs text-rose-400">
                  {form.formState.errors.experienceLevel?.message}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Availability
                </label>
                <Select
                  onValueChange={(value: "available" | "busy") =>
                    form.setValue("availabilityStatus", value)
                  }
                  defaultValue={form.getValues("availabilityStatus")}
                >
                  <SelectTrigger className="mt-2 bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0f0f11] border-white/10 text-white">
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="busy">Busy</SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-2 text-xs text-rose-400">
                  {form.formState.errors.availabilityStatus?.message}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Hours available
                </label>
                <Input
                  type="number"
                  {...form.register("hoursPerWeek", { valueAsNumber: true })}
                  className="mt-2 bg-white/5 border-white/10 text-white"
                  placeholder="Hours per week"
                />
                <p className="mt-2 text-xs text-rose-400">
                  {form.formState.errors.hoursPerWeek?.message}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/10">
              <Button
                type="button"
                variant="outline"
                className="w-full text-white border-white/10 hover:bg-white/5"
                onClick={onBack}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white"
              >
                Complete profile setup
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
