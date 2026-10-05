import { NextRequest, NextResponse } from 'next/server';
import { runFullMatchingPipeline } from '@/lib/ai/pipeline';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clinicalNote } = body;

    if (!clinicalNote || typeof clinicalNote !== 'string' || clinicalNote.trim().length < 15) {
      return NextResponse.json(
        { error: 'Please provide a clinical note or patient summary with at least 15 characters.' },
        { status: 400 }
      );
    }

    const response = await runFullMatchingPipeline(clinicalNote);
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('API Error in /api/match:', error);
    return NextResponse.json(
      { error: error.message || 'An internal error occurred while matching trials.' },
      { status: 500 }
    );
  }
}
