import { NextRequest, NextResponse } from 'next/server';
import { fetchOGPData } from '@/lib/ogp';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const ogpData = await fetchOGPData(url);

    if (!ogpData) {
      return NextResponse.json(
        { error: 'Failed to fetch OGP data' },
        { status: 500 }
      );
    }

    return NextResponse.json(ogpData);
  } catch (error) {
    console.error('OGP API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}