import { useState } from 'react';
import { useApp } from '@/state/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FolderPlus } from 'lucide-react';
import type { Project, ExperienceLevel } from '@/types';

const SKILL_OPTIONS = [
  'React', 'TypeScript', 'Tailwind', 'Next.js', 'GraphQL', 'Vue.js', 'Angular',
  'Node.js', 'Python', 'Django', 'Java', 'Spring Boot', 'PHP', 'Laravel',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase',
  'Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD',
  'React Native', 'Flutter', 'Swift', 'Kotlin',
  'Figma', 'UI Design', 'Prototyping', 'User Research',
  'Machine Learning', 'TensorFlow', 'Pandas', 'SQL', 'Spark',
];

const ROLES = ['frontend', 'backend', 'ui/ux', 'mobile', 'devops', 'data', 'fullstack'];

export function PostProjectView() {
  const { state, dispatch } = useApp();
  const company = state.companies.find(c => c.userId === state.currentUser?.userId);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [rolesNeeded, setRolesNeeded] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('intermediate');
  const [teamSize, setTeamSize] = useState(3);
  const [category, setCategory] = useState('Fintech');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');

  const toggleSkill = (skill: string) => {
    setRequiredSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleRole = (role: string) => {
    setRolesNeeded(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const handleSubmit = () => {
    if (!title.trim() || !company) return;

    const newProject: Project = {
      id: `project_${Date.now()}`,
      title,
      description,
      requiredSkills,
      rolesNeeded,
      experienceLevelRequired: experienceLevel,
      teamSize,
      status: 'open',
      coverImage: `/projects/project${Math.floor(Math.random() * 6) + 1}.jpg`,
      founderId: company.userId,
      founderName: company.fullName,
      createdAt: Date.now(),
      category,
      budget,
      duration,
    };

    dispatch({ type: 'ADD_PROJECT', payload: newProject });

    // Reset form
    setTitle('');
    setDescription('');
    setRequiredSkills([]);
    setRolesNeeded([]);
    setExperienceLevel('intermediate');
    setTeamSize(3);
    setCategory('Fintech');
    setBudget('');
    setDuration('');

    // Switch to projects tab
    dispatch({ type: 'SET_TAB', payload: 'projects' });
  };

  return (
    <div className="p-4 lg:p-6 max-w-2xl mx-auto animate-fade-in-up">
      <div className="mb-6">
        <h1 className="font-['Space_Grotesk'] font-semibold text-2xl">Post a Project</h1>
        <p className="text-sm text-[#6b7280] mt-1">Create a new project and find the right builders</p>
      </div>

      <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-6 space-y-5">
        {/* Title */}
        <div>
          <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-1.5">Project Title</label>
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g., Build Fintech MVP"
            className="bg-[#111827] border-[#1f2937] text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-1.5">Description</label>
          <Textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe the project, goals, and requirements..."
            className="bg-[#111827] border-[#1f2937] text-sm min-h-[100px]"
          />
        </div>

        {/* Required Skills */}
        <div>
          <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-1.5">Required Skills</label>
          <div className="flex flex-wrap gap-1.5 p-2 bg-[#111827] rounded-md border border-[#1f2937]">
            {SKILL_OPTIONS.map(skill => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                  requiredSkills.includes(skill)
                    ? 'bg-[#22d3ee]/10 text-[#22d3ee] border border-[#22d3ee]/30'
                    : 'bg-[#0a0f1c] text-[#6b7280] border border-[#1f2937] hover:text-[#9ca3af]'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Roles Needed */}
        <div>
          <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-1.5">Roles Needed</label>
          <div className="flex flex-wrap gap-2">
            {ROLES.map(role => (
              <button
                key={role}
                onClick={() => toggleRole(role)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                  rolesNeeded.includes(role)
                    ? 'bg-[#111827] text-[#22d3ee] border border-[#374151]'
                    : 'text-[#9ca3af] hover:text-[#f9fafb] bg-[#111827]/50 border border-transparent'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-1.5">Experience Level Required</label>
          <div className="flex gap-2">
            {(['beginner', 'intermediate', 'advanced'] as ExperienceLevel[]).map(level => (
              <button
                key={level}
                onClick={() => setExperienceLevel(level)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                  experienceLevel === level
                    ? 'bg-[#111827] text-[#22d3ee] border border-[#374151]'
                    : 'text-[#9ca3af] hover:text-[#f9fafb] bg-[#111827]/50 border border-transparent'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Team Size & Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-1.5">Team Size</label>
            <Input
              type="number"
              value={teamSize}
              onChange={e => setTeamSize(parseInt(e.target.value) || 1)}
              className="bg-[#111827] border-[#1f2937] text-sm"
              min={1}
              max={20}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-1.5">Category</label>
            <Input
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder="e.g., Fintech"
              className="bg-[#111827] border-[#1f2937] text-sm"
            />
          </div>
        </div>

        {/* Budget & Duration */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-1.5">Budget</label>
            <Input
              value={budget}
              onChange={e => setBudget(e.target.value)}
              placeholder="e.g., $5,000 - $10,000"
              className="bg-[#111827] border-[#1f2937] text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-1.5">Duration</label>
            <Input
              value={duration}
              onChange={e => setDuration(e.target.value)}
              placeholder="e.g., 2-3 months"
              className="bg-[#111827] border-[#1f2937] text-sm"
            />
          </div>
        </div>

        {/* Submit */}
        <Button
          className="w-full bg-[#22d3ee] text-[#030712] hover:bg-[#22d3ee]/90"
          onClick={handleSubmit}
          disabled={!title.trim() || requiredSkills.length === 0}
        >
          <FolderPlus className="w-4 h-4 mr-1.5" /> Post Project
        </Button>
      </div>
    </div>
  );
}
