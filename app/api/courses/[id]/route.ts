import { NextRequest, NextResponse } from 'next/server';
import { COURSES } from '@/data/courses';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const course = COURSES.find((c) => c.id === id);
  if (!course) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 });
  }
  return NextResponse.json(course);
}
