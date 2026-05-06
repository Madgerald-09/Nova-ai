import type { BuilderProfile, Project, Match, ScoreComponents, MatchStatus, MatchResult, Application, Notification as AppNotification } from '@/types';

// Weights — exactly per spec
const WEIGHTS = {
  skill: 0.6,
  role: 0.15,
  experience: 0.1,
  availability: 0.1,
  reputation: 0.05,
};

export function getScoreComponents(builder: BuilderProfile, project: Project): ScoreComponents {
  // 1. Skill Match (0-100)
  const matchedSkills = project.requiredSkills.filter(s =>
    builder.skills.some(bs => bs.toLowerCase() === s.toLowerCase())
  );
  const skillScore = project.requiredSkills.length > 0
    ? (matchedSkills.length / project.requiredSkills.length) * 100
    : 0;

  // 2. Role Match (0 or 100)
  const roleScore = project.rolesNeeded.some(r =>
    builder.role.toLowerCase().includes(r.toLowerCase())
  ) ? 100 : 0;

  // 3. Experience Match (0-100)
  const levels: string[] = ['beginner', 'intermediate', 'advanced'];
  const builderIdx = levels.indexOf(builder.experienceLevel);
  const projectIdx = levels.indexOf(project.experienceLevelRequired);
  const diff = Math.abs(builderIdx - projectIdx);
  const expScore = diff === 0 ? 100 : diff === 1 ? 70 : 40;

  // 4. Availability (0 or 100)
  const availScore = builder.availabilityStatus === 'available' ? 100 : 0;

  // 5. Reputation Boost (0-100)
  const reputationScore = Math.min(100, builder.reputationScore);

  return {
    skill: Math.round(skillScore * 10) / 10,
    role: roleScore,
    experience: expScore,
    availability: availScore,
    reputation: Math.round(reputationScore * 10) / 10,
  };
}

export function calculateMatchScore(components: ScoreComponents): number {
  return (
    components.skill * WEIGHTS.skill +
    components.role * WEIGHTS.role +
    components.experience * WEIGHTS.experience +
    components.availability * WEIGHTS.availability +
    components.reputation * WEIGHTS.reputation
  );
}

export function getMatchAction(score: number): MatchStatus {
  if (score >= 80) return 'auto-recommend';
  if (score >= 65) return 'recommend';
  return 'ignored';
}

export function matchBuilderToProjects(builder: BuilderProfile, projects: Project[]): MatchResult[] {
  return projects
    .filter(p => p.status === 'open')
    .map(project => {
      const components = getScoreComponents(builder, project);
      const score = calculateMatchScore(components);
      return {
        builder,
        score: Math.round(score * 10) / 10,
        components,
        action: getMatchAction(score),
      };
    })
    .filter(r => r.action !== 'ignored')
    .sort((a, b) => b.score - a.score);
}

export function runMatchingPipeline(builders: BuilderProfile[], projects: Project[]): Match[] {
  const matches: Match[] = [];
  const now = Date.now();

  for (const project of projects.filter(p => p.status === 'open')) {
    // Pre-filter: at least 1 skill match + available
    const candidates = builders.filter(b =>
      b.availabilityStatus === 'available' &&
      b.skills.some(s =>
        project.requiredSkills.some(rs => rs.toLowerCase() === s.toLowerCase())
      )
    );

    // Calculate scores
    const scored = candidates.map(builder => {
      const components = getScoreComponents(builder, project);
      const score = calculateMatchScore(components);
      return {
        builder,
        score,
        components,
        action: getMatchAction(score),
      };
    });

    // Sort DESC, take top 10, filter out ignored
    const topMatches = scored
      .filter(s => s.action !== 'ignored')
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    for (const m of topMatches) {
      matches.push({
        id: `${project.id}_${m.builder.userId}`,
        projectId: project.id,
        builderId: m.builder.userId,
        matchScore: Math.round(m.score * 10) / 10,
        status: m.action,
        components: m.components,
        createdAt: now,
      });
    }
  }

  return matches;
}

export function generateNotifications(matches: Match[], applications: Application[]): AppNotification[] {
  const notifications: AppNotification[] = [];
  const now = Date.now();

  // Auto-recommend notifications
  const autoRecs = matches.filter(m => m.status === 'auto-recommend');
  for (const m of autoRecs.slice(0, 5)) {
    notifications.push({
      id: `notif_match_${m.id}`,
      type: 'match',
      title: 'Top Match Found',
      message: `Builder matched to project with ${m.matchScore}% score`,
      read: false,
      createdAt: now,
      relatedId: m.id,
    });
  }

  // Application notifications
  for (const app of applications.slice(0, 3)) {
    notifications.push({
      id: `notif_app_${app.id}`,
      type: 'application',
      title: 'New Application',
      message: `${app.builderName} applied to a project`,
      read: false,
      createdAt: app.createdAt,
      relatedId: app.id,
    });
  }

  return notifications;
}
