import { NextRequest, NextResponse } from 'next/server';
import { assessmentEngine } from '@/lib/assessment-engine';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const dayNum = parseInt(id.replace('quiz-', ''), 10) || 12;
  const quiz = assessmentEngine.getQuiz(dayNum);
  return NextResponse.json(quiz);
}
