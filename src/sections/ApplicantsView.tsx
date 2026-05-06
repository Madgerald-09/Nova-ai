import { useApp } from '@/state/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, User } from 'lucide-react';

export function ApplicantsView() {
  const { state, dispatch, getProject } = useApp();
  const company = state.companies.find(c => c.userId === state.currentUser?.userId);

  if (!company) return null;

  const myProjects = state.projects.filter(p => p.founderId === company.userId);
  const myApplications = state.applications.filter(a =>
    myProjects.some(p => p.id === a.projectId)
  );

  const handleUpdateStatus = (appId: string, status: 'accepted' | 'rejected') => {
    const app = state.applications.find(a => a.id === appId);
    if (!app) return;
    dispatch({ type: 'UPDATE_APPLICATION', payload: { ...app, status } });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30';
      case 'accepted': return 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30';
      case 'rejected': return 'bg-red-500/10 text-red-400 border-red-500/30';
      default: return '';
    }
  };

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto animate-fade-in-up">
      <div className="mb-6">
        <h1 className="font-['Space_Grotesk'] font-semibold text-2xl">Applicants</h1>
        <p className="text-sm text-[#6b7280] mt-1">Review and manage applications for your projects</p>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-6">
        {['all', 'pending', 'accepted', 'rejected'].map(status => (
          <button key={status} className="px-3 py-1.5 rounded-full text-[10px] font-medium uppercase tracking-wider bg-[#111827] text-[#9ca3af] border border-[#1f2937]">
            {status} ({myApplications.filter(a => status === 'all' || a.status === status).length})
          </button>
        ))}
      </div>

      {myApplications.length === 0 ? (
        <div className="text-center py-12 text-[#6b7280]">
          <User className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-sm">No applications yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {myApplications.map(app => {
            const project = getProject(app.projectId);
                    return (
              <div key={app.id} className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <img src={app.builderAvatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium text-[#f9fafb]">{app.builderName}</h3>
                      <Badge variant="outline" className={`text-[9px] ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </Badge>
                    </div>
                    <p className="text-[10px] text-[#6b7280] mb-2">Applied to: {project?.title}</p>
                    <p className="text-xs text-[#9ca3af] mb-3">"{app.message}"</p>

                    {app.status === 'pending' && (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          className="bg-[#10b981] text-white hover:bg-[#10b981]/90 text-[10px] h-7"
                          onClick={() => handleUpdateStatus(app.id, 'accepted')}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" /> Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-transparent border-red-500/30 text-red-400 hover:bg-red-500/10 text-[10px] h-7"
                          onClick={() => handleUpdateStatus(app.id, 'rejected')}
                        >
                          <XCircle className="w-3 h-3 mr-1" /> Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
