import { NextResponse } from 'next/server';
import { projectEngine } from '@/lib/project-engine';

export async function GET() {
  return NextResponse.json(projectEngine.getProjects());
}
