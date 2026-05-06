import { useApp } from '@/state/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FolderPlus, Users, Zap, Briefcase,
  TrendingUp, CheckCircle, Clock, XCircle, ArrowRight
} from 'lucide-react';
export function CompanyOverview() {
  const { state, dispatch, getProjectMatches, getBuilder } = useApp();
  const company = state.companies.find(c => c.userId === state.currentUser?.userId);
  if (!company) return null;
  // Company's projects
  const myProjects = state.projects.filter(p => p.founderId === company.userId);
  const openProjects = myProjects.filter(p => p.status === 'open');
  // Applications for company's projects
  const myApplications = state.applications.filter(a =>
    myProjects.some(p => p.id === a.projectId)
  );
  // Recent matches for company's projects
  const myMatches = state.matches.filter(m =>
    myProjects.some(p => p.id === m.projectId)
  ).sort((a, b) => b.matchScore - a.matchScore);
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-3 h-3 text-[#f59e0b]" />;
      case 'accepted': return <CheckCircle className="w-3 h-3 text-[#10b981]" />;
      case 'rejected': return <XCircle className="w-3 h-3 text-red-400" />;
    }
  };
  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto animate-fade-in-up">
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="font-['Space_Grotesk'] font-semibold text-2xl">{company.companyName}</h1>
        <p className="text-sm text-[#6b7280] mt-1">Manage your projects and review matched builders.</p>
      </div>
      {/* Quick Actions */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          size="sm"
          className="bg-[#22d3ee] text-[#030712] hover:bg-[#22d3ee]/90"
          onClick={() => dispatch({ type: 'SET_TAB', payload: 'post-project' })}
        >
          <FolderPlus className="w-4 h-4 mr-1.5" /> Post New Project
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent border-[#1f2937] text-[#9ca3af] hover:text-[#f9fafb] hover:border-[#374151]"
          onClick={() => dispatch({ type: 'SET_TAB', payload: 'applicants' })}
        >
          <Users className="w-4 h-4 mr-1.5" /> Review Applicants
        </Button>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-4 h-4 text-[#22d3ee]" />
            <span className="text-xs text-[#6b7280]">Posted Projects</span>
          </div>
          <p className="font-['Space_Grotesk'] font-bold text-xl text-[#f9fafb]">{myProjects.length}</p>
        </div>
        <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-[#8b5cf6]" />
            <span className="text-xs text-[#6b7280]">Open Projects</span>
          </div>
          <p className="font-['Space_Grotesk'] font-bold text-xl text-[#f9fafb]">{openProjects.length}</p>
        </div>
        <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-[#10b981]" />
            <span className="text-xs text-[#6b7280]">Applicants</span>
          </div>
          <p className="font-['Space_Grotesk'] font-bold text-xl text-[#f9fafb]">{myApplications.length}</p>
        </div>
        <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[#f59e0b]" />
            <span className="text-xs text-[#6b7280]">Matches</span>
          </div>
          <p className="font-['Space_Grotesk'] font-bold text-xl text-[#f9fafb]">{myMatches.length}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects with Top Matches */}
        <div>
          <h2 className="font-['Space_Grotesk'] font-semibold text-lg mb-4">Your Projects & Top Matches</h2>
          <div className="space-y-4">
            {myProjects.map(project => {
              const matches = getProjectMatches(project.id).slice(0, 3);
              const appCount = state.applications.filter(a => a.projectId === project.id).length;
              return (
                <div key={project.id} className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img src={project.coverImage} alt="" className="w-10 h-10 rounded-md object-cover" />
                      <div>
                        <h3 className="font-medium text-sm text-[#f9fafb]">{project.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={`text-[9px] ${
                            project.status === 'open' ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30' :
                            'bg-[#6b7280]/10 text-[#6b7280] border-[#6b7280]/30'
                          }`}>
                            {project.status}
                          </Badge>
                          <span className="text-[10px] text-[#6b7280]">{appCount} applicants</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Top 3 matches */}
                  {matches.length > 0 && (
                    <div className="space-y-2">
                      {matches.map(match => {
                        const builder = getBuilder(match.builderId);
                        if (!builder) return null;
                        return (
                          <div key={match.id} className="flex items-center gap-3 py-1.5">
                            <img src={builder.avatarUrl} alt="" className="w-6 h-6 rounded-full object-cover" />
                            <span className="flex-1 text-xs text-[#9ca3af] truncate">{builder.fullName}</span>
                            <span className="text-[10px] font-mono text-[#22d3ee]">{match.matchScore}%</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 text-[#9ca3af] hover:text-[#22d3ee] text-[10px]"
                    onClick={() => {
                      // no-op
                      dispatch({ type: 'SET_TAB', payload: 'projects' });
                    }}
                  >
                    View All Matches <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
        {/* Recent Applicants */}
        <div>
          <h2 className="font-['Space_Grotesk'] font-semibold text-lg mb-4">Recent Applicants</h2>
          <div className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg">
            {myApplications.length === 0 ? (
              <div className="p-6 text-center text-[#6b7280]">
                <p className="text-sm">No applications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-[#1f2937]">
                {myApplications.slice(0, 8).map(app => {
                  const project = state.projects.find(p => p.id === app.projectId);
                  return (
                    <div key={app.id} className="flex items-center gap-3 p-3 hover:bg-[#111827] transition-colors">
                      <img src={app.builderAvatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#f9fafb]">{app.builderName}</p>
                        <p className="text-[10px] text-[#6b7280] truncate">{project?.title}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(app.status)}
                        <Badge variant="outline" className={`text-[9px] ${
                          app.status === 'pending' ? 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30' :
                          app.status === 'accepted' ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30' :
                          'bg-red-500/10 text-red-400 border-red-500/30'
                        }`}>
                          {app.status}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
