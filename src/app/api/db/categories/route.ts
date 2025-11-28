import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { categories } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    let query = db.select().from(categories);
    
    if (userId) {
      query = query.where(eq(categories.userId, parseInt(userId)));
    }

    const results = await query
      .orderBy(desc(categories.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({ categories: results }, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, color, icon, userId } = body;

    if (!name) {
      return NextResponse.json({ 
        error: "Name is required",
        code: "MISSING_NAME" 
      }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ 
        error: "User ID is required",
        code: "MISSING_USER_ID" 
      }, { status: 400 });
    }

    const categoryData = {
      name: name.trim(),
      color: color?.trim() || '#6366f1',
      icon: icon?.trim() || 'folder',
      userId: parseInt(userId),
      createdAt: new Date().toISOString(),
    };

    const newCategory = await db.insert(categories)
      .values(categoryData)
      .returning();

    return NextResponse.json({ category: newCategory[0] }, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}