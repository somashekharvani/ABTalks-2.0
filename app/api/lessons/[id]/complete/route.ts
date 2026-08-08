import { NextRequest, NextResponse } from 'next/server';
import { learningEngine } from '@/lib/learning-engine';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const { studentId, day } = body;

  const dayNum = parseInt(day || id.replace('lesson-', ''), 10);
  if (!studentId || isNaN(dayNum)) {
    return NextResponse.json({ error: 'Missing studentId or day' }, { status: 400 });
  }

  learningEngine.markLessonCompleted(studentId, dayNum);
  return NextResponse.json({ success: true, lessonId: id, day: dayNum, studentId });
}
