import type { ScoreComponents } from '@/types';

interface MatchScoreBarProps {
  components: ScoreComponents;
  compact?: boolean;
}

const COLORS = {
  skill: '#22d3ee',
  role: '#8b5cf6',
  experience: '#f59e0b',
  availability: '#10b981',
  reputation: '#ec4899',
};

const LABELS: Record<keyof ScoreComponents, string> = {
  skill: 'Skills',
  role: 'Role',
  experience: 'Exp',
  availability: 'Avail',
  reputation: 'Rep',
};

export function MatchScoreBar({ components, compact = false }: MatchScoreBarProps) {
  const entries = Object.entries(components) as [keyof ScoreComponents, number][];

  if (compact) {
    return (
      <div className="w-full">
        <div className="flex h-1.5 rounded-full overflow-hidden bg-[#1f2937]">
          {entries.map(([key, value]) => (
            <div
              key={key}
              className="h-full transition-all duration-500"
              style={{
                width: `${value}%`,
                backgroundColor: COLORS[key],
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map(([key, value]) => (
        <div key={key} className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-[#6b7280] uppercase w-12 text-right">
            {LABELS[key]}
          </span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-[#1f2937]">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${value}%`,
                backgroundColor: COLORS[key],
              }}
            />
          </div>
          <span className="text-[10px] font-mono text-[#9ca3af] w-10">
            {Math.round(value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ScoreBadge({ score }: { score: number }) {
  const getColor = () => {
    if (score >= 80) return 'bg-[#10b981]/10 border-[#10b981]/30 text-[#10b981]';
    if (score >= 65) return 'bg-[#f59e0b]/10 border-[#f59e0b]/30 text-[#f59e0b]';
    return 'bg-[#6b7280]/10 border-[#6b7280]/30 text-[#6b7280]';
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${getColor()}`}>
      {score}%
    </span>
  );
}
