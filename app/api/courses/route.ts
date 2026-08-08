import { NextResponse } from 'next/server';
import { COURSES } from '@/data/courses';

export async function GET() {
  return NextResponse.json(COURSES);
}
