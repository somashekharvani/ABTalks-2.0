import { NextResponse } from 'next/server';
import { getSubmissions, saveSubmission } from '@/lib/data';
import { validateGithubUrl, validateLinkedinUrl } from '@/lib/utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get('studentId') || undefined;
  const submissions = await getSubmissions(studentId);
  return NextResponse.json(submissions);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentId, day, githubUrl, linkedinUrl } = body;

    if (!studentId || typeof day !== 'number') {
      return NextResponse.json({ error: 'Missing required parameters: studentId and day' }, { status: 400 });
    }

    if (!githubUrl || !validateGithubUrl(githubUrl)) {
      return NextResponse.json({ error: 'Invalid GitHub repository URL format. Example: https://github.com/username/repo' }, { status: 400 });
    }

    if (!linkedinUrl || !validateLinkedinUrl(linkedinUrl)) {
      return NextResponse.json({ error: 'Invalid LinkedIn post URL format. Example: https://linkedin.com/posts/username_post' }, { status: 400 });
    }

    const { submission, viewModel } = await saveSubmission(studentId, day, githubUrl, linkedinUrl);

    return NextResponse.json({
      success: true,
      submission,
      viewModel,
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || 'Server error processing submission' }, { status: 500 });
  }
}
