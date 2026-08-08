import { NextRequest, NextResponse } from 'next/server';
import { learningEngine } from '@/lib/learning-engine';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const dayNum = parseInt(id.replace('lesson-', ''), 10);
  if (isNaN(dayNum)) {
    return NextResponse.json({ error: 'Invalid lesson parameter' }, { status: 400 });
  }
  const lesson = learningEngine.getLesson(dayNum);
  return NextResponse.json(lesson);
}
