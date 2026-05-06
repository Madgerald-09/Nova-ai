import { useState } from 'react';
import { useApp } from '@/state/AppContext';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Building2 } from 'lucide-react';

export function AdminUsersView() {
  const { state } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'builder' | 'company'>('all');

  const filteredBuilders = state.builders.filter(b =>
    filter !== 'company' &&
    (b.fullName.toLowerCase().includes(search.toLowerCase()) ||
     b.username.toLowerCase().includes(search.toLowerCase()) ||
     b.skills.some(s => s.toLowerCase().includes(search.toLowerCase())))
  );

  const filteredCompanies = state.companies.filter(c =>
    filter !== 'builder' &&
    (c.fullName.toLowerCase().includes(search.toLowerCase()) ||
     c.companyName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto animate-fade-in-up">
      <div className="mb-6">
        <h1 className="font-['Space_Grotesk'] font-semibold text-2xl">Users</h1>
        <p className="text-sm text-[#6b7280] mt-1">{state.builders.length} builders &middot; {state.companies.length} companies</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 bg-[#0a0f1c] border-[#1f2937] text-sm"
          />
        </div>
        <div className="flex items-center gap-1 bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-0.5">
          {(['all', 'builder', 'company'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-[10px] font-medium uppercase tracking-wider transition-colors ${
                filter === f ? 'bg-[#111827] text-[#22d3ee] border border-[#374151]' : 'text-[#6b7280] hover:text-[#9ca3af]'
              }`}
            >
              {f === 'all' ? 'All' : f === 'builder' ? 'Builders' : 'Companies'}
            </button>
          ))}
        </div>
      </div>

      {/* Builders */}
      {(filter === 'all' || filter === 'builder') && (
        <div className="mb-8">
          <h2 className="flex items-center gap-2 text-sm font-medium text-[#9ca3af] mb-3">
            <Users className="w-4 h-4" /> Builders ({filteredBuilders.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredBuilders.map(builder => (
              <div key={builder.userId} className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-4 flex items-start gap-3">
                <img src={builder.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[#f9fafb]">{builder.fullName}</p>
                    <Badge variant="outline" className={`text-[9px] ${
                      builder.availabilityStatus === 'available'
                        ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30'
                        : 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30'
                    }`}>
                      {builder.availabilityStatus}
                    </Badge>
                  </div>
                  <p className="text-[10px] text-[#6b7280]">@{builder.username} &middot; {builder.experienceLevel}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {builder.skills.slice(0, 4).map(skill => (
                      <span key={skill} className="px-2 py-0.5 bg-[#111827] rounded text-[10px] text-[#9ca3af]">{skill}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-[#6b7280]">
                    <span>Rep: {builder.reputationScore}</span>
                    <span>Projects: {builder.completedProjects}</span>
                    <span>{builder.hoursPerWeek}h/week</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Companies */}
      {(filter === 'all' || filter === 'company') && (
        <div>
          <h2 className="flex items-center gap-2 text-sm font-medium text-[#9ca3af] mb-3">
            <Building2 className="w-4 h-4" /> Companies ({filteredCompanies.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredCompanies.map(company => (
              <div key={company.userId} className="bg-[#0a0f1c] border border-[#1f2937] rounded-lg p-4 flex items-start gap-3">
                <img src={company.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#f9fafb]">{company.companyName}</p>
                  <p className="text-[10px] text-[#6b7280]">{company.fullName} &middot; {company.industry}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-[#6b7280]">
                    <span>{company.companySize} employees</span>
                    <span>{company.postedProjects} projects</span>
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-[#22d3ee] hover:underline">
                      Website
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
