import { NextResponse } from 'next/server';
import { getTask } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ day: string }> }
) {
  const { day } = await params;
  const dayNumber = parseInt(day, 10);

  if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 60) {
    return NextResponse.json({ error: 'Invalid day parameter. Must be between 1 and 60.' }, { status: 400 });
  }

  const task = await getTask(dayNumber);
  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  return NextResponse.json(task);
}
