import { useState } from 'react';
import { useApp } from '@/state/AppContext';
import { MatchScoreBar, ScoreBadge } from '@/components/MatchScoreBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Search, Zap } from 'lucide-react';

export function AdminMatchingView() {
  const { state, runMatching, getProjectMatches, getBuilder, getProject } = useApp();
  const [projectSearch, setProjectSearch] = useState('');
  const [builderSearch, setBuilderSearch] = useState('');

  const filteredProjects = state.projects.filter(p =>
    p.status === 'open' &&
    p.title.toLowerCase().includes(projectSearch.toLowerCase())
  );

  const filteredBuilders = state.builders.filter(b =>
    b.availabilityStatus === 'available' &&
    (b.fullName.toLowerCase().includes(builderSearch.toLowerCase()) ||
     b.skills.some(s => s.toLowerCase().includes(builderSearch.toLowerCase())))
  );

  // Simulate manual match
  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-['Space_Grotesk'] font-semibold text-2xl">Matching</h1>
          <p className="text-sm text-[#6b7280] mt-1">Manually match builders to projects or run the engine</p>
        </div>
        <Button
          size="sm"
          onClick={runMatching}
          disabled={state.engineStatus === 'processing'}
          className="bg-[#22d3ee] text-[#030712] hover:bg-[#22d3ee]/90"
        >
          {state.engineStatus === 'processing' ? (
            <RefreshCw className="w-4 h-4 mr-1.5 animate-spin" />
          ) : (
            <Zap className="w-4 h-4 mr-1.5" />
          )}
          Run Auto-Matching
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-[#9ca3af]">Open Projects</h2>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#6b7280]" />
              <Input
                value={projectSearch}
                onChange={e => setProjectSearch(e.target.value)}
                placeholder="Search..."
                className="pl-7 h-7 bg-[#0a0f1c] border-[#1f2937] text-xs w-40"
              />
            </div>
          </div>
          <div className="space-y-2 max-h-[500px] overflow-auto">
            {filteredProjects.map(project => (
              <div key={project.id} className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <img src={project.coverImage} alt="" className="w-8 h-8 rounded object-cover" />
                  <div>
                    <p className="text-xs font-medium text-[#f9fafb]">{project.title}</p>
                    <p className="text-[9px] text-[#6b7280]">{project.requiredSkills.slice(0, 3).join(', ')}</p>
                  </div>
                </div>
                <div className="text-[9px] text-[#6b7280]">
                  {getProjectMatches(project.id).length} matches found
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Builders */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-[#9ca3af]">Available Builders</h2>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#6b7280]" />
              <Input
                value={builderSearch}
                onChange={e => setBuilderSearch(e.target.value)}
                placeholder="Search..."
                className="pl-7 h-7 bg-[#0a0f1c] border-[#1f2937] text-xs w-40"
              />
            </div>
          </div>
          <div className="space-y-2 max-h-[500px] overflow-auto">
            {filteredBuilders.map(builder => (
              <div key={builder.userId} className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <img src={builder.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-medium text-[#f9fafb]">{builder.fullName}</p>
                    <p className="text-[9px] text-[#6b7280]">{builder.skills.slice(0, 3).join(', ')}</p>
                  </div>
                </div>
                <div className="text-[9px] text-[#6b7280] mb-2">
                  Exp: {builder.experienceLevel} &middot; Rep: {builder.reputationScore}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Matches Table */}
      <div className="mt-8">
        <h2 className="text-sm font-medium text-[#9ca3af] mb-3">All Matches ({state.matches.length})</h2>
        <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-[#111827] text-[10px] text-[#6b7280] uppercase tracking-wider">
            <span className="col-span-3">Builder</span>
            <span className="col-span-3">Project</span>
            <span className="col-span-1">Score</span>
            <span className="col-span-1">Status</span>
            <span className="col-span-4">Components</span>
          </div>
          <div className="divide-y divide-[#1f2937] max-h-80 overflow-auto">
            {state.matches.slice(0, 50).map(match => {
              const builder = getBuilder(match.builderId);
              const project = getProject(match.projectId);
              return (
                <div key={match.id} className="grid grid-cols-12 gap-2 px-4 py-2 items-center hover:bg-[#111827] transition-colors">
                  <span className="col-span-3 text-xs text-[#f9fafb] truncate">{builder?.fullName}</span>
                  <span className="col-span-3 text-xs text-[#9ca3af] truncate">{project?.title}</span>
                  <span className="col-span-1 text-xs font-mono text-[#22d3ee]">{match.matchScore}%</span>
                  <span className="col-span-1">
                    <ScoreBadge score={match.matchScore} />
                  </span>
                  <span className="col-span-4">
                    <MatchScoreBar components={match.components} compact />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
