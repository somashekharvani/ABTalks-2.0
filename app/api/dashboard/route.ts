import { NextResponse } from 'next/server';
import { getDashboardData } from '@/lib/data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId') || undefined;
    const recruiterView = searchParams.get('recruiterView') === 'true';
    const targetDay = searchParams.get('day') ? parseInt(searchParams.get('day')!, 10) : undefined;

    const viewModel = await getDashboardData(studentId, recruiterView, targetDay);
    return NextResponse.json(viewModel);
  } catch (error) {
    const fallbackViewModel = await getDashboardData('student-b', false);
    return NextResponse.json(fallbackViewModel);
  }
}
