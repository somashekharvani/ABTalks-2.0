import { NextResponse } from 'next/server';
import { getDashboardData } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get('studentId') || undefined;
  const recruiterView = searchParams.get('recruiterView') === 'true';

  const viewModel = await getDashboardData(studentId, recruiterView);
  return NextResponse.json(viewModel);
}
