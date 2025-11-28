import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getTokenFromRequest, getUserFromToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter");
    const categoryId = searchParams.get("categoryId");
    const tagId = searchParams.get("tagId");
    const search = searchParams.get("search");

    let notes;

    if (search) {
      notes = db.searchNotes(user.id, search);
    } else if (filter === "favorites") {
      notes = db.getFavoriteNotes(user.id);
    } else if (filter === "recent") {
      notes = db.getRecentNotes(user.id, 10);
    } else if (filter === "archived") {
      notes = db.getArchivedNotes(user.id);
    } else if (filter === "trash") {
      notes = db.getDeletedNotes(user.id);
    } else if (categoryId) {
      notes = db.getNotesByCategory(user.id, parseInt(categoryId));
    } else if (tagId) {
      notes = db.getNotesByTag(user.id, parseInt(tagId));
    } else {
      notes = db.getNotesByUser(user.id);
    }

    return NextResponse.json({ notes });
  } catch (error) {
    console.error("Get notes error:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content, categoryId, tags } = await request.json();

    const note = db.createNote({
      title: title || "Untitled",
      content: content || "",
      userId: user.id,
      categoryId: categoryId || null,
      tags: tags || [],
      isFavorite: false,
      isArchived: false,
      isDeleted: false,
    });

    return NextResponse.json({ note });
  } catch (error) {
    console.error("Create note error:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}