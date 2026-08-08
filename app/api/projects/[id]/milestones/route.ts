import { NextRequest, NextResponse } from 'next/server';
import { PROJECT_MILESTONES } from '@/data/project-milestones';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const milestones = PROJECT_MILESTONES.filter((m) => m.projectId === id);
  return NextResponse.json(milestones);
}
