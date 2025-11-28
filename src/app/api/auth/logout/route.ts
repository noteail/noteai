import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest, deleteSessionToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    
    if (token) {
      deleteSessionToken(token);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "An error occurred during logout" },
      { status: 500 }
    );
  }
}