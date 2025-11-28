import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { tags, noteTags } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const tagId = parseInt(id);

    const existingTag = await db
      .select()
      .from(tags)
      .where(eq(tags.id, tagId))
      .limit(1);

    if (existingTag.length === 0) {
      return NextResponse.json(
        { error: 'Tag not found', code: 'TAG_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete associated records from noteTags junction table first (cascade delete)
    await db.delete(noteTags).where(eq(noteTags.tagId, tagId));

    // Delete tag from tags table
    const deleted = await db
      .delete(tags)
      .where(eq(tags.id, tagId))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json(
        { error: 'Tag not found', code: 'TAG_NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Tag deleted', deleted: deleted[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}