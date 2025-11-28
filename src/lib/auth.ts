import { db, User } from "./db";

export async function getSession(): Promise<{ user: User } | null> {
  // This function is now only used server-side for checking auth via headers
  return null;
}

export function createSessionToken(userId: number): string {
  const session = db.createSession(userId);
  return session.id;
}

export function deleteSessionToken(sessionId: string): void {
  db.deleteSession(sessionId);
}

export function getUserFromToken(token: string): User | null {
  const session = db.findSession(token);
  if (!session) {
    return null;
  }

  const user = db.findUserById(session.userId);
  return user || null;
}

export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  return null;
}

export async function requireAuth(request: Request): Promise<User> {
  const token = getTokenFromRequest(request);
  if (!token) {
    throw new Error("Unauthorized");
  }
  
  const user = getUserFromToken(token);
  if (!user) {
    throw new Error("Unauthorized");
  }
  
  return user;
}