import { NextRequest, NextResponse } from 'next/server';
import { notificationEngine } from '@/lib/notification-engine';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get('studentId') || 'student-b';
  const notifications = notificationEngine.getNotifications(studentId);
  return NextResponse.json(notifications);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { studentId, action } = body;

  if (!studentId) {
    return NextResponse.json({ error: 'Missing studentId' }, { status: 400 });
  }

  if (action === 'mark_all_read') {
    const updated = notificationEngine.markAllAsRead(studentId);
    return NextResponse.json(updated);
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
