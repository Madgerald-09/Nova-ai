import { useState } from 'react';
import { useApp } from '@/state/AppContext';
import { MatchScoreBar, ScoreBadge } from '@/components/MatchScoreBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, DollarSign, Calendar } from 'lucide-react';

export function OpportunitiesView() {
  const { state, getBuilderMatches, getProject } = useApp();
  const [search, setSearch] = useState('');
  const builder = state.builders.find(b => b.userId === state.currentUser?.userId);

  if (!builder) return null;

  const myMatches = getBuilderMatches(builder.userId);

  const filteredMatches = myMatches.filter(m => {
    const project = getProject(m.projectId);
    if (!project) return false;
    return project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.requiredSkills.some(s => s.toLowerCase().includes(search.toLowerCase()));
  });

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto animate-fade-in-up">
      <div className="mb-6">
        <h1 className="font-['Space_Grotesk'] font-semibold text-2xl">Opportunities</h1>
        <p className="text-sm text-[#6b7280] mt-1">Projects matched to your skills and experience</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
        <Input
          placeholder="Search opportunities..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 bg-[#0a0f1c] border-[#1f2937] text-sm"
        />
      </div>

      {/* Match Stats */}
      <div className="flex items-center gap-4 mb-6">
        <Badge variant="outline" className="bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30">
          {myMatches.filter(m => m.status === 'auto-recommend').length} Auto-Recommended
        </Badge>
        <Badge variant="outline" className="bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30">
          {myMatches.filter(m => m.status === 'recommend').length} Recommended
        </Badge>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filteredMatches.map(match => {
          const project = getProject(match.projectId);
          if (!project) return null;

          return (
            <div key={match.id} className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-5 hover:border-[#374151] transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src={project.coverImage} alt="" className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-medium text-sm text-[#f9fafb]">{project.title}</h3>
                    <p className="text-[10px] text-[#6b7280]">{project.founderName} &bull; {project.category}</p>
                  </div>
                </div>
                <ScoreBadge score={match.matchScore} />
              </div>

              <p className="text-xs text-[#9ca3af] mb-3">{project.description}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                {project.requiredSkills.map(skill => (
                  <span key={skill} className="px-2 py-0.5 bg-[#111827] rounded text-[10px] text-[#9ca3af]">{skill}</span>
                ))}
              </div>

              <MatchScoreBar components={match.components} />

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#1f2937]">
                <div className="flex items-center gap-4 text-[10px] text-[#6b7280]">
                  <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{project.budget}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{project.duration}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{project.experienceLevelRequired}</span>
                </div>
                <Button
                  size="sm"
                  className="bg-[#22d3ee] text-[#030712] hover:bg-[#22d3ee]/90 text-[10px] h-7"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
