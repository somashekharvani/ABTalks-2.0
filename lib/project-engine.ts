import { Project, ProjectMilestone } from '@/types';
import { PROJECTS } from '@/data/projects';
import { PROJECT_MILESTONES } from '@/data/project-milestones';

export const projectEngine = {
  getProjects(): Project[] {
    return PROJECTS;
  },

  getProjectForDay(day: number): Project {
    return PROJECTS.find((p) => day >= p.startDay && day <= p.endDay) || PROJECTS[1];
  },

  getMilestoneForDay(day: number): ProjectMilestone {
    return PROJECT_MILESTONES.find((m) => m.day === day) || PROJECT_MILESTONES[11];
  },

  getCompletedProjects(currentDay: number): Project[] {
    return PROJECTS.filter((p) => p.endDay < currentDay);
  },

  generateLinkedInTemplate(
    studentName: string,
    day: number,
    lessonTitle: string,
    milestoneTitle: string,
    githubUrl: string,
    concepts: string[]
  ): string {
    const conceptBullets = concepts.map((c) => `• ${c}`).join('\n');

    return `🎯 ABTalks 2.0 — Day ${day}/60 Milestone Completed!

Today I learned:
${lessonTitle}

What I built:
${milestoneTitle}

Key concepts mastered:
${conceptBullets}

🔗 GitHub Repository:
${githubUrl}

#ABTalks #BuildInPublic #WebDevelopment #React #TypeScript`;
  },
};
