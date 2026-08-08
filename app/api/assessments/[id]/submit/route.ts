import { NextRequest, NextResponse } from 'next/server';
import { assessmentEngine } from '@/lib/assessment-engine';
import { notificationEngine } from '@/lib/notification-engine';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const { studentId, day, answers } = body;

  const dayNum = parseInt(day || id.replace('quiz-', ''), 10);
  if (!studentId || isNaN(dayNum) || !answers) {
    return NextResponse.json({ error: 'Missing studentId, day, or answers' }, { status: 400 });
  }

  const result = assessmentEngine.submitAssessment(studentId, dayNum, answers);

  if (result.passed) {
    notificationEngine.addNotification(
      studentId,
      'Assessment Passed',
      `You scored ${result.scorePercent}% on Day ${dayNum} assessment. Build task unlocked!`,
      'ASSESSMENT_PASSED',
      `/day/${dayNum}`
    );
  } else {
    notificationEngine.addNotification(
      studentId,
      'Assessment Review Required',
      `Scored ${result.scorePercent}% on Day ${dayNum} assessment. 70% required. Retry when ready (streak is unaffected).`,
      'ASSESSMENT_FAILED',
      `/day/${dayNum}`
    );
  }

  return NextResponse.json(result);
}
