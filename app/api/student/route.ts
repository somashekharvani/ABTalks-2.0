import { NextResponse } from 'next/server';
import { getStudent } from '@/lib/data';
import { STUDENTS } from '@/data/students';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const student = await getStudent(id || undefined);
  return NextResponse.json(student);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentId } = body;
    if (!studentId || !STUDENTS[studentId]) {
      return NextResponse.json({ error: 'Invalid studentId fixture' }, { status: 400 });
    }
    const student = STUDENTS[studentId];
    return NextResponse.json({ success: true, student });
  } catch {
    return NextResponse.json({ error: 'Failed to switch student fixture' }, { status: 500 });
  }
}
