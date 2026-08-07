import { NextResponse } from 'next/server';
import { getSubmissions } from '@/lib/data';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ day: string }> }
) {
  const { day } = await params;
  const dayNumber = parseInt(day, 10);
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get('studentId') || undefined;

  const submissions = await getSubmissions(studentId);
  const submission = submissions.find((s) => s.day === dayNumber);

  if (!submission) {
    return NextResponse.json({ error: 'Submission not found for specified day' }, { status: 404 });
  }

  return NextResponse.json({ success: true, submission });
}
