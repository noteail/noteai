import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { bugReports } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

// Rate limiting storage
const userRateLimits = new Map<string, number[]>();
const ipRateLimits = new Map<string, number[]>();

// Rate limit configuration
const USER_RATE_LIMITS = {
  MINUTE: { window: 60 * 1000, max: 2 },
  HOUR: { window: 60 * 60 * 1000, max: 10 }
};

const IP_RATE_LIMITS = {
  MINUTE: { window: 60 * 1000, max: 1 },
  HOUR: { window: 60 * 60 * 1000, max: 5 }
};

async function getCurrentUserId(request: NextRequest): Promise<string | null> {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    const headersObj = new Headers();
    headersObj.set('Authorization', authHeader);
    const session = await auth.api.getSession({ headers: headersObj });
    if (session?.user?.id) {
      return session.user.id;
    }
    return null;
  } catch (error) {
    console.error('Session validation error:', error);
    return null;
  }
}

function getIpAddress(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  if (forwarded) return forwarded.split(',')[0].trim();
  if (realIp) return realIp;
  return 'unknown';
}

function checkRateLimit(
  identifier: string,
  rateLimitMap: Map<string, number[]>,
  windowMs: number,
  maxRequests: number
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const timestamps = rateLimitMap.get(identifier) || [];
  
  // Remove timestamps outside the window
  const validTimestamps = timestamps.filter(ts => now - ts < windowMs);
  
  if (validTimestamps.length >= maxRequests) {
    const oldestTimestamp = validTimestamps[0];
    const retryAfter = Math.ceil((oldestTimestamp + windowMs - now) / 1000);
    return { allowed: false, retryAfter };
  }
  
  // Add current timestamp
  validTimestamps.push(now);
  rateLimitMap.set(identifier, validTimestamps);
  
  return { allowed: true };
}

function checkUserRateLimit(userId: string): { allowed: boolean; error?: string } {
  // Check minute limit
  const minuteCheck = checkRateLimit(
    `user:${userId}:minute`,
    userRateLimits,
    USER_RATE_LIMITS.MINUTE.window,
    USER_RATE_LIMITS.MINUTE.max
  );
  
  if (!minuteCheck.allowed) {
    return {
      allowed: false,
      error: `Rate limit exceeded. You can submit ${USER_RATE_LIMITS.MINUTE.max} reports per minute. Please try again in ${minuteCheck.retryAfter} seconds.`
    };
  }
  
  // Check hour limit
  const hourCheck = checkRateLimit(
    `user:${userId}:hour`,
    userRateLimits,
    USER_RATE_LIMITS.HOUR.window,
    USER_RATE_LIMITS.HOUR.max
  );
  
  if (!hourCheck.allowed) {
    return {
      allowed: false,
      error: `Rate limit exceeded. You can submit ${USER_RATE_LIMITS.HOUR.max} reports per hour. Please try again in ${hourCheck.retryAfter} seconds.`
    };
  }
  
  return { allowed: true };
}

function checkIpRateLimit(ipAddress: string): { allowed: boolean; error?: string } {
  // Check minute limit
  const minuteCheck = checkRateLimit(
    `ip:${ipAddress}:minute`,
    ipRateLimits,
    IP_RATE_LIMITS.MINUTE.window,
    IP_RATE_LIMITS.MINUTE.max
  );
  
  if (!minuteCheck.allowed) {
    return {
      allowed: false,
      error: `Rate limit exceeded. Anonymous users can submit ${IP_RATE_LIMITS.MINUTE.max} report per minute. Please try again in ${minuteCheck.retryAfter} seconds.`
    };
  }
  
  // Check hour limit
  const hourCheck = checkRateLimit(
    `ip:${ipAddress}:hour`,
    ipRateLimits,
    IP_RATE_LIMITS.HOUR.window,
    IP_RATE_LIMITS.HOUR.max
  );
  
  if (!hourCheck.allowed) {
    return {
      allowed: false,
      error: `Rate limit exceeded. Anonymous users can submit ${IP_RATE_LIMITS.HOUR.max} reports per hour. Please try again in ${hourCheck.retryAfter} seconds.`
    };
  }
  
  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, severity, pageUrl, browserInfo, userEmail } = body;
    
    // Validation
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json(
        { error: 'Title is required and must be a non-empty string', code: 'MISSING_TITLE' },
        { status: 400 }
      );
    }
    
    if (!description || typeof description !== 'string' || description.trim() === '') {
      return NextResponse.json(
        { error: 'Description is required and must be a non-empty string', code: 'MISSING_DESCRIPTION' },
        { status: 400 }
      );
    }
    
    const validSeverities = ['low', 'medium', 'high', 'critical'];
    if (!severity || !validSeverities.includes(severity)) {
      return NextResponse.json(
        { error: `Severity must be one of: ${validSeverities.join(', ')}`, code: 'INVALID_SEVERITY' },
        { status: 400 }
      );
    }
    
    // Get user ID from session (optional)
    const userId = await getCurrentUserId(request);
    
    // Get IP address for anonymous users
    const ipAddress = getIpAddress(request);
    
    // Rate limiting
    if (userId) {
      const rateLimitCheck = checkUserRateLimit(userId);
      if (!rateLimitCheck.allowed) {
        return NextResponse.json(
          { error: rateLimitCheck.error, code: 'RATE_LIMIT_EXCEEDED' },
          { status: 429 }
        );
      }
    } else {
      const rateLimitCheck = checkIpRateLimit(ipAddress);
      if (!rateLimitCheck.allowed) {
        return NextResponse.json(
          { error: rateLimitCheck.error, code: 'RATE_LIMIT_EXCEEDED' },
          { status: 429 }
        );
      }
    }
    
    // Create bug report
    const now = new Date().toISOString();
    const newBugReport = await db.insert(bugReports)
      .values({
        title: title.trim(),
        description: description.trim(),
        severity,
        pageUrl: pageUrl || null,
        browserInfo: browserInfo || null,
        userId: userId || null,
        userEmail: userEmail || null,
        status: 'open',
        ipAddress,
        createdAt: now,
        updatedAt: now
      })
      .returning();
    
    return NextResponse.json(newBugReport[0], { status: 201 });
    
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Authentication required for listing bug reports
    const userId = await getCurrentUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTHENTICATION_REQUIRED' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const severity = searchParams.get('severity');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    
    // Build WHERE conditions
    const conditions = [];
    
    if (status) {
      const validStatuses = ['open', 'in_progress', 'resolved', 'closed'];
      if (validStatuses.includes(status)) {
        conditions.push(eq(bugReports.status, status));
      }
    }
    
    if (severity) {
      const validSeverities = ['low', 'medium', 'high', 'critical'];
      if (validSeverities.includes(severity)) {
        conditions.push(eq(bugReports.severity, severity));
      }
    }
    
    // Build query
    let query = db.select().from(bugReports);
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    const results = await query
      .orderBy(desc(bugReports.createdAt))
      .limit(limit)
      .offset(offset);
    
    return NextResponse.json({ bugReports: results }, { status: 200 });
    
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}