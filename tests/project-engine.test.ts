import { describe, it, expect } from 'vitest';
import { projectEngine } from '../lib/project-engine';

describe('Project Engine Suite', () => {
  it('maps Day 12 to TaskFlow 7-day sprint project', () => {
    const project = projectEngine.getProjectForDay(12);
    expect(project.id).toBe('proj-taskflow');
    expect(project.durationDays).toBe(7);
    expect(project.repositoryUrl).toBe('https://github.com/student/taskflow');

    const milestone = projectEngine.getMilestoneForDay(12);
    expect(milestone.projectId).toBe('proj-taskflow');
    expect(milestone.day).toBe(12);
    expect(milestone.requirements.length).toBeGreaterThan(0);
  });

  it('generates structured LinkedIn proof template', () => {
    const template = projectEngine.generateLinkedInTemplate(
      'Sarah Chen',
      12,
      'React State Management',
      'TaskFlow Persistence',
      'https://github.com/student/taskflow',
      ['useState', 'Controlled Inputs']
    );

    expect(template).toContain('🎯 ABTalks 2.0 — Day 12/60 Milestone Completed!');
    expect(template).toContain('React State Management');
    expect(template).toContain('https://github.com/student/taskflow');
    expect(template).toContain('#ABTalks');
  });
});
