import { Task } from '@/types';

export function downloadPdfNotes(task: Task) {
  const content = `================================================================================
ABTALKS 2.0 — TECHNICAL LECTURE NOTES & CODE PROOF
================================================================================

Day ${task.day}: ${task.title}
Track Category: ${task.category}
Difficulty Tier: ${task.difficulty}
Estimated Hours: ${task.estimatedHours} Hours
Verified Performance Score: ${task.score}/100 ⭐

--------------------------------------------------------------------------------
TECHNICAL LECTURE NOTES & ARCHITECTURAL CONCEPTS
--------------------------------------------------------------------------------
${task.notes}

--------------------------------------------------------------------------------
TECHNICAL ACCEPTANCE REQUIREMENTS
--------------------------------------------------------------------------------
${task.requirements.map((req, idx) => `[ ${idx + 1} ] ${req}`).join('\n')}

--------------------------------------------------------------------------------
DAY-SPECIFIC RUNNABLE CODE EXAMPLE
--------------------------------------------------------------------------------
${task.codeExample}

--------------------------------------------------------------------------------
VIDEO LESSON CLASS
--------------------------------------------------------------------------------
Title: ${task.videoTitle}
Duration: ${task.videoDuration}
Starter Template: ${task.githubTemplate}

================================================================================
Generated on ${new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}
ABTalks 2.0 — Built for Consistency
================================================================================`;

  const blob = new Blob([content], { type: 'application/pdf;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ABTalks_Day_${task.day}_Lecture_Notes.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
