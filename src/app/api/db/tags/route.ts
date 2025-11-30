import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { tags } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

// Helper function to get current user from session using Bearer token
async function getCurrentUserId(request: NextRequest): Promise<number | null> {
  try {
    const authHeader = request.headers.get('Authorization');
    const headersList = await headers();
    const headersObj = new Headers(headersList);
    
    if (authHeader) {
      headersObj.set('Authorization', authHeader);
    }
    
    const session = await auth.api.getSession({ headers: headersObj });
    
    if (session?.user?.id) {
      return parseInt(session.user.id);
    }
    return null;
  } catch (error) {
    console.error('Session validation error:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get current user from session
    const userId = await getCurrentUserId(request);
    
    if (!userId) {
      return NextResponse.json({ 
        error: 'Unauthorized - Please log in',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Always filter by current user - secure!
    const results = await db.select()
      .from(tags)
      .where(eq(tags.userId, userId))
      .orderBy(asc(tags.name))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({ tags: results }, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get current user from session
    const userId = await getCurrentUserId(request);
    
    if (!userId) {
      return NextResponse.json({ 
        error: 'Unauthorized - Please log in',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    const body = await request.json();
    const { name, color } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required', code: 'MISSING_REQUIRED_FIELD' },
        { status: 400 }
      );
    }

    const tagData = {
      name: name.trim(),
      color: color?.trim() || '#6366f1',
      userId: userId, // Use session userId - secure!
    };

    const newTag = await db.insert(tags).values(tagData).returning();

    return NextResponse.json({ tag: newTag[0] }, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}