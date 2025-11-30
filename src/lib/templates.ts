import { FileText, Calendar, CheckSquare, Code, BookOpen, Utensils, Briefcase, Lightbulb, MessageSquare, Target, ClipboardList, Settings, FileCode, Users } from "lucide-react";

export interface NoteTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "productivity" | "personal" | "development" | "creative";
  content: string;
}

export const NOTE_TEMPLATES: NoteTemplate[] = [
  {
    id: "meeting-notes-simple",
    title: "Meeting Notes (Simple)",
    description: "Quick and minimal meeting notes template",
    icon: "message-square",
    category: "productivity",
    content: `# Meeting Notes

**Date:** ${new Date().toLocaleDateString()}
**Topic:** Weekly Team Sync

---

## Notes
- Discussed Q4 roadmap priorities
- 

## Action Items
- [ ] Send follow-up email to stakeholders
- [ ] Schedule next sprint planning
- [ ] 

## Next Meeting
Date: Next Monday, 10:00 AM
`,
  },
  {
    id: "meeting-notes-advanced",
    title: "Meeting Notes (Advanced)",
    description: "Comprehensive template for detailed meeting documentation",
    icon: "users",
    category: "productivity",
    content: `# Meeting Notes

**Date:** ${new Date().toLocaleDateString()}
**Time:** 10:00 AM - 11:00 AM
**Duration:** 1 hour
**Location/Platform:** Zoom / Meeting Room A
**Meeting Type:** Weekly Sync / Sprint Planning / Review / Other

---

## Attendees
| Name | Role | Present |
|------|------|---------|
| John Smith | Product Manager | ✅ |
| Sarah Johnson | Tech Lead | ✅ |
| Mike Chen | Developer | ❌ |
| Emily Davis | Designer | ✅ |

## Agenda
1. [x] Review last week's progress
2. [ ] Discuss blockers and challenges
3. [ ] Plan next sprint priorities

## Previous Action Items Review
| Item | Owner | Status |
|------|-------|--------|
| Complete API documentation | John Smith | ✅ Done |
| Fix login page bug | Mike Chen | 🔄 In Progress |
| Design new dashboard | Emily Davis | ❌ Not Started |

## Discussion Points

### Topic 1: Q4 Product Roadmap
**Presenter:** John Smith
**Summary:**
Reviewed the Q4 priorities and aligned on key milestones.

**Decisions Made:**
- Prioritize mobile app release for November
- Postpone analytics dashboard to Q1

**Questions/Concerns:**
- Need more resources for mobile development

### Topic 2: Technical Debt
**Presenter:** Sarah Johnson
**Summary:**
Identified areas requiring refactoring before new features.

**Decisions Made:**
- Allocate 20% of sprint capacity for tech debt

## New Action Items
| Action | Owner | Deadline | Priority |
|--------|-------|----------|----------|
| Create mobile app wireframes | Emily Davis | Nov 15 | 🔴 High |
| Set up CI/CD pipeline | Sarah Johnson | Nov 10 | 🟡 Medium |
| Update project documentation | John Smith | Nov 20 | 🟢 Low |

## Parking Lot
*Items to discuss later*
- Budget allocation for Q1
- New team member onboarding process

## Next Steps
- Schedule design review meeting
- Share meeting notes with stakeholders

## Next Meeting
**Date:** Next Monday, 10:00 AM
**Agenda Preview:**
- Sprint retrospective
- Demo of completed features
`,
  },
  {
    id: "srs-document",
    title: "SRS Document",
    description: "Software Requirements Specification template",
    icon: "clipboard-list",
    category: "development",
    content: `# Software Requirements Specification (SRS)

**Project Name:** E-Commerce Platform
**Version:** 1.0
**Date:** ${new Date().toLocaleDateString()}
**Author:** Your Name

---

## 1. Introduction

### 1.1 Purpose
*Describe the purpose of this SRS document*
This document specifies the software requirements for the e-commerce platform.

### 1.2 Scope
*Define the scope of the software product*
A web-based marketplace for buying and selling products online.

### 1.3 Definitions & Acronyms
| Term | Definition |
|------|------------|
| API | Application Programming Interface |
| CRUD | Create, Read, Update, Delete |
| JWT | JSON Web Token |
| SPA | Single Page Application |

### 1.4 References
- Product Requirements Document v1.0
- UI/UX Design Specifications

## 2. Overall Description

### 2.1 Product Perspective
*How does this product fit into the larger system?*
Standalone web application with mobile-responsive design.

### 2.2 Product Features (High-Level)
- User authentication and authorization
- Product catalog with search and filters
- Shopping cart and checkout process
- Order management and tracking

### 2.3 User Classes and Characteristics
| User Type | Description | Technical Level |
|-----------|-------------|-----------------|
| Admin | Manages products, users, orders | Advanced |
| Seller | Lists products, manages inventory | Intermediate |
| Buyer | Browses and purchases products | Basic |
| Guest | Views products without account | Basic |

### 2.4 Operating Environment
- **Platform:** Web (SPA)
- **Browser Support:** Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Device Types:** Desktop, Tablet, Mobile

### 2.5 Constraints
- Must comply with GDPR regulations
- Maximum page load time: 3 seconds

### 2.6 Assumptions and Dependencies
- Users have stable internet connection
- Payment gateway API availability

## 3. Functional Requirements

### 3.1 Feature: User Registration
**ID:** FR-001
**Priority:** High
**Description:** Users can create an account with email and password.

**Acceptance Criteria:**
- [ ] Email validation with confirmation link
- [ ] Password strength requirements enforced
- [ ] Duplicate email prevention

**User Story:**
> As a new user, I want to register an account so that I can make purchases.

### 3.2 Feature: Product Search
**ID:** FR-002
**Priority:** High
**Description:** Users can search products by keyword, category, and filters.

**Acceptance Criteria:**
- [ ] Full-text search with relevance ranking
- [ ] Filter by price range, category, rating
- [ ] Sort by price, popularity, date added

## 4. Non-Functional Requirements

### 4.1 Performance Requirements
- Response time: < 200ms for API calls
- Throughput: 1000 requests/second
- Concurrent users: 10,000

### 4.2 Security Requirements
- Authentication: JWT with refresh tokens
- Authorization: Role-based access control
- Data encryption: TLS 1.3, AES-256

### 4.3 Usability Requirements
- Mobile-first responsive design
- WCAG 2.1 AA accessibility compliance

### 4.4 Reliability Requirements
- Uptime: 99.9% SLA
- Recovery: < 1 hour RTO

### 4.5 Scalability Requirements
- Horizontal scaling for web servers
- Database read replicas for high traffic

## 5. Interface Requirements

### 5.1 User Interfaces
*Describe UI requirements*
Clean, modern design following Material Design principles.

### 5.2 API Interfaces
| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/auth/register | POST | User registration |
| /api/auth/login | POST | User authentication |
| /api/products | GET | List products with pagination |
| /api/products/:id | GET | Get product details |
| /api/cart | POST | Add item to cart |
| /api/orders | POST | Create new order |

### 5.3 External Interfaces
- Stripe Payment Gateway
- SendGrid Email Service
- AWS S3 for image storage

## 6. Data Requirements

### 6.1 Data Models
*Key entities and relationships*
- User → has many → Orders
- Product → belongs to → Category
- Order → has many → OrderItems

### 6.2 Data Retention
- User data: Until account deletion + 30 days
- Order history: 7 years (legal requirement)
- Logs: 90 days

## 7. Appendix
- Wireframes and mockups
- Database schema diagram
`,
  },
  {
    id: "software-analysis",
    title: "Software Analysis",
    description: "Frontend & Backend analysis documentation",
    icon: "settings",
    category: "development",
    content: `# Software Analysis Document

**Project:** Task Management App
**Date:** ${new Date().toLocaleDateString()}
**Analyst:** Your Name

---

## 1. Executive Summary
*Brief overview of the analysis findings*
This document analyzes the technical requirements for a modern task management application with real-time collaboration features.

## 2. Current State Analysis

### 2.1 Existing System Overview
*Description of current system (if any)*
Currently using spreadsheets and email for task tracking, leading to inefficiencies.

### 2.2 Pain Points
- No real-time visibility into task status
- Manual status updates are time-consuming
- Difficult to track dependencies between tasks

### 2.3 Stakeholder Requirements
| Stakeholder | Requirements | Priority |
|-------------|--------------|----------|
| Project Manager | Dashboard with project overview | High |
| Team Members | Easy task creation and updates | High |
| Executives | Progress reports and analytics | Medium |
| IT Admin | User management and security | Medium |

## 3. Frontend Analysis

### 3.1 UI/UX Requirements
- Kanban board view for visual task management
- Calendar view for deadline tracking
- Mobile-responsive design for on-the-go access

### 3.2 Page/Screen Inventory
| Page | Purpose | Key Components |
|------|---------|----------------|
| Dashboard | Overview of all projects | ProjectCards, Charts, QuickActions |
| Board | Kanban task management | Column, TaskCard, DragDropContext |
| Task Detail | View/edit task | Form, Comments, Attachments |
| Settings | User preferences | ProfileForm, NotificationSettings |
| Team | Manage team members | MemberList, InviteForm, RoleSelect |

### 3.3 Component Architecture
\`\`\`
src/
├── components/
│   ├── ui/           # Button, Input, Modal, etc.
│   ├── features/     # TaskCard, KanbanColumn, etc.
│   └── layouts/      # Sidebar, Header, PageWrapper
├── pages/
├── hooks/            # useTask, useProject, useAuth
├── utils/            # formatDate, validateForm
└── styles/           # globals.css, themes
\`\`\`

### 3.4 State Management
- **Global State:** User session, theme preferences (Zustand)
- **Local State:** Form inputs, UI toggles (useState)
- **Server State:** Tasks, projects, comments (React Query)

### 3.5 Frontend Tech Stack
| Technology | Purpose | Version |
|------------|---------|---------|
| Next.js | Framework | 15.x |
| TypeScript | Language | 5.x |
| Tailwind CSS | Styling | 4.x |
| React Query | Data Fetching | 5.x |
| Zustand | State Management | 4.x |
| Framer Motion | Animations | 11.x |

### 3.6 Third-Party Integrations (Frontend)
- Stripe for subscription billing
- Sentry for error tracking
- Analytics (Mixpanel/Amplitude)

## 4. Backend Analysis

### 4.1 API Requirements
| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| /api/projects | GET | List user projects | Yes |
| /api/projects | POST | Create project | Yes |
| /api/projects/:id/tasks | GET | List tasks in project | Yes |
| /api/tasks | POST | Create task | Yes |
| /api/tasks/:id | PATCH | Update task | Yes |
| /api/tasks/:id | DELETE | Delete task | Yes |
| /api/comments | POST | Add comment | Yes |

### 4.2 Database Schema
\`\`\`sql
-- Users Table
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Projects Table
CREATE TABLE projects (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  owner_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tasks Table
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'todo',
  priority VARCHAR(20) DEFAULT 'medium',
  project_id INTEGER REFERENCES projects(id),
  assignee_id INTEGER REFERENCES users(id),
  due_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### 4.3 Entity Relationships
*Describe key relationships*
- User → has many → Projects (as owner)
- User → has many → Tasks (as assignee)
- Project → has many → Tasks
- Task → has many → Comments

### 4.4 Backend Tech Stack
| Technology | Purpose | Version |
|------------|---------|---------|
| Node.js | Runtime | 20.x |
| Next.js API Routes | Framework | 15.x |
| PostgreSQL | Database | 16.x |
| Drizzle ORM | ORM | 0.30.x |
| better-auth | Authentication | Latest |

### 4.5 External Services
| Service | Purpose | API Type |
|---------|---------|----------|
| SendGrid | Email notifications | REST |
| AWS S3 | File storage | REST |
| Stripe | Payments | REST |

### 4.6 Authentication & Authorization
- **Auth Method:** JWT with refresh tokens (better-auth)
- **User Roles:** Admin, Member, Viewer
- **Permissions:** Project-level access control

## 5. Security Analysis
- [x] Input validation (Zod schemas)
- [x] SQL injection prevention (Drizzle ORM)
- [x] XSS prevention (React's built-in escaping)
- [x] CSRF protection (SameSite cookies)
- [ ] Rate limiting (to implement)
- [x] Data encryption (TLS, bcrypt for passwords)

## 6. Performance Considerations
- Caching strategy: React Query with 5-min stale time
- Database indexing: project_id, assignee_id, status
- CDN usage: Vercel Edge Network
- Code splitting: Dynamic imports for modals

## 7. Deployment Architecture
\`\`\`
[Client] → [Vercel Edge] → [Next.js App] → [PostgreSQL]
                               ↓
                          [AWS S3]
\`\`\`

## 8. Risk Assessment
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Database downtime | High | Low | Multi-AZ deployment |
| API rate limits | Medium | Medium | Implement caching |
| Security breach | High | Low | Regular audits, WAF |
| Scale issues | Medium | Medium | Horizontal scaling plan |

## 9. Recommendations
1. Start with MVP features: Projects, Tasks, Basic Auth
2. Implement real-time updates in Phase 2
3. Add analytics dashboard after user feedback

## 10. Next Steps
- [ ] Finalize database schema
- [ ] Set up CI/CD pipeline
- [ ] Create API documentation
- [ ] Design system implementation
`,
  },
  {
    id: "product-requirements",
    title: "Product Requirements",
    description: "PRD template for product planning",
    icon: "file-code",
    category: "productivity",
    content: `# Product Requirements Document (PRD)

**Product Name:** FitTrack - Fitness Tracking App
**Version:** 1.0
**Date:** ${new Date().toLocaleDateString()}
**Product Manager:** Your Name

---

## 1. Overview

### 1.1 Problem Statement
*What problem are we solving?*
People struggle to maintain consistent exercise habits due to lack of tracking, motivation, and personalized guidance.

### 1.2 Objective
*What do we want to achieve?*
Create an intuitive fitness tracking app that helps users build sustainable exercise habits through gamification and social features.

### 1.3 Success Metrics (KPIs)
| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| Daily Active Users | 0 | 10,000 | 6 months |
| User Retention (D7) | - | 40% | 3 months |
| Workout Completion Rate | - | 70% | 3 months |
| App Store Rating | - | 4.5+ | 6 months |

## 2. Users & Personas

### 2.1 Target Users
*Who is this product for?*
Health-conscious individuals aged 25-45 who want to build consistent exercise habits.

### 2.2 User Personas

#### Persona 1: Active Amy
- **Role:** Marketing Manager, 32
- **Goals:** Stay fit despite busy schedule, track progress
- **Pain Points:** Forgets to log workouts, needs motivation
- **Tech Savviness:** High

#### Persona 2: Beginner Ben
- **Role:** Software Developer, 28
- **Goals:** Start exercising regularly, lose weight
- **Pain Points:** Doesn't know where to start, easily discouraged
- **Tech Savviness:** High

## 3. User Stories & Requirements

### 3.1 Epic: Workout Logging

#### User Story 1
> As a user, I want to log my workouts quickly so that I can track my progress without spending too much time.

**Acceptance Criteria:**
- [ ] Given I'm on the home screen, when I tap "Quick Log", then I can add a workout in under 30 seconds
- [ ] Given I've completed a workout, when I log it, then I see my streak updated

**Priority:** P0
**Effort:** M

#### User Story 2
> As a user, I want to see my workout history so that I can understand my progress over time.

**Acceptance Criteria:**
- [ ] Given I'm on the history tab, when I scroll, then I see workouts grouped by week
- [ ] Given I tap a workout, when it opens, then I see all details including duration and exercises

**Priority:** P0
**Effort:** S

## 4. Feature Specifications

### 4.1 Feature: Streak Tracking
**Description:** Track consecutive days of workouts to motivate consistent behavior.

**User Flow:**
1. User completes and logs a workout
2. System updates streak counter
3. System displays celebration animation for milestones (7, 30, 100 days)
4. User sees streak on home screen and profile

**Edge Cases:**
- Rest days don't break streak if scheduled
- Streak resets at midnight user's local time

### 4.2 Feature: Social Challenges
**Description:** Users can challenge friends to workout competitions.

**User Flow:**
1. User creates challenge (e.g., "Most workouts this week")
2. User invites friends via link or app
3. Friends accept and competition begins
4. Leaderboard updates in real-time
5. Winner announced at challenge end

## 5. Scope & Priorities

### 5.1 In Scope (MVP)
- [x] User registration and authentication
- [x] Workout logging (quick and detailed)
- [x] Progress dashboard
- [ ] Streak tracking
- [ ] Basic social features

### 5.2 Out of Scope (Future)
- AI-powered workout recommendations
- Wearable device integration
- Premium subscription tier

### 5.3 MoSCoW Prioritization
| Must Have | Should Have | Could Have | Won't Have (v1) |
|-----------|-------------|------------|-----------------|
| Workout logging | Streak tracking | Social challenges | AI recommendations |
| User auth | Progress charts | Achievements | Wearable sync |
| Basic dashboard | Exercise library | Friends feature | Video tutorials |

## 6. Technical Considerations
- **Platform:** iOS, Android, Web (PWA)
- **Integrations:** Apple Health, Google Fit
- **Performance:** < 2s app launch time
- **Security:** Biometric authentication, encrypted data

## 7. Design Requirements
- **Brand Guidelines:** Energetic, motivating colors (orange, green)
- **Accessibility:** WCAG 2.1 AA compliant
- **Responsive:** Mobile-first, tablet optimized
- **Dark Mode:** Yes, system default

## 8. Timeline & Milestones
| Milestone | Date | Status |
|-----------|------|--------|
| Kickoff | Jan 1 | ✅ Complete |
| Design Complete | Jan 31 | ✅ Complete |
| MVP Development | Feb 28 | 🔄 In Progress |
| Beta Testing | Mar 15 | ⏳ Planned |
| Public Launch | Apr 1 | ⏳ Planned |

## 9. Dependencies & Risks
| Dependency/Risk | Impact | Mitigation |
|-----------------|--------|------------|
| Apple Health API changes | High | Abstract integration layer |
| Designer availability | Medium | Prioritize critical screens |
| App store review delays | Medium | Submit early, have backup date |

## 10. Launch Plan
- **Soft Launch:** TestFlight/Play Console beta with 500 users
- **Full Launch:** App stores, Product Hunt, social media
- **Marketing:** Influencer partnerships, content marketing
- **Support:** In-app help, email support, FAQ

## 11. Post-Launch
- **Monitoring:** Crash analytics, performance metrics
- **Feedback Collection:** In-app surveys, reviews monitoring
- **Iteration Plan:** Bi-weekly releases based on feedback
`,
  },
  {
    id: "daily-journal",
    title: "Daily Journal",
    description: "Reflect on your day with guided prompts",
    icon: "calendar",
    category: "personal",
    content: `# Daily Journal - ${new Date().toLocaleDateString()}

## 🌅 Morning Intentions
*What do I want to accomplish today?*
- Complete the project proposal draft
- Exercise for 30 minutes
- Call mom

## 📝 Today's Highlights
*What happened today worth remembering?*
- Had a productive meeting with the team
- 

## 💡 Lessons Learned
*What did I learn today?*
- Taking short breaks improves focus
- 

## 🙏 Gratitude
*Three things I'm grateful for:*
1. Supportive colleagues
2. Good health
3. 

## 🎯 Tomorrow's Focus
- Follow up on meeting action items
- 
`,
  },
  {
    id: "project-plan",
    title: "Project Plan",
    description: "Outline your project goals, timeline and tasks",
    icon: "briefcase",
    category: "productivity",
    content: `# Project: Website Redesign

## Overview
*Brief description of the project*
Complete redesign of the company website to improve user experience and conversion rates.

## Goals
- Increase conversion rate by 25%
- Reduce bounce rate by 15%
- Improve mobile experience

## Timeline
| Phase | Duration | Status |
|-------|----------|--------|
| Discovery & Research | 2 weeks | ✅ Complete |
| Design | 3 weeks | 🔄 In Progress |
| Development | 4 weeks | ⏳ Not Started |
| Testing & QA | 1 week | ⏳ Not Started |
| Launch | 1 week | ⏳ Not Started |

## Tasks
### Phase 1: Discovery
- [x] Stakeholder interviews
- [x] Competitor analysis
- [x] User research surveys

### Phase 2: Design
- [x] Wireframes
- [ ] High-fidelity mockups
- [ ] Design review with stakeholders

### Phase 3: Development
- [ ] Set up new codebase
- [ ] Implement homepage
- [ ] Implement inner pages
- [ ] CMS integration

### Phase 4: Testing
- [ ] Cross-browser testing
- [ ] Mobile responsiveness
- [ ] Performance optimization

## Resources
- Design: Emily (Lead), John (Support)
- Development: Sarah (Lead), Mike, Alex
- Budget: $50,000

## Notes
- Weekly standup every Monday at 10 AM
- Design files in Figma: [link]
`,
  },
  {
    id: "code-snippet",
    title: "Code Snippet",
    description: "Document code with explanation and examples",
    icon: "code",
    category: "development",
    content: `# Code Snippet: Custom React Hook for API Calls

## Description
*What does this code do?*
A reusable React hook for making API calls with loading, error, and data states.

## Language
\`typescript\`

## Code
\`\`\`typescript
import { useState, useEffect } from 'react';

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useApi<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
}

export default useApi;
\`\`\`

## Usage Example
\`\`\`typescript
function UserList() {
  const { data, loading, error, refetch } = useApi<User[]>('/api/users');

  if (loading) return <Spinner />;
  if (error) return <Error message={error} onRetry={refetch} />;

  return (
    <ul>
      {data?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

## Parameters
| Name | Type | Description |
|------|------|-------------|
| url | string | The API endpoint to fetch data from |

## Return Values
| Name | Type | Description |
|------|------|-------------|
| data | T or null | The fetched data |
| loading | boolean | Whether the request is in progress |
| error | string or null | Error message if request failed |
| refetch | function | Function to retry the request |

## Notes
- Automatically fetches on mount and when URL changes
- Handles cleanup on unmount
- Generic type T allows type-safe data access

## Related Links
- [React Hooks Documentation](https://react.dev/reference/react)
- [SWR Library](https://swr.vercel.app/) (alternative)
`,
  },
  {
    id: "todo-list",
    title: "Todo List",
    description: "Simple task list with priorities",
    icon: "check-square",
    category: "productivity",
    content: `# Todo List - ${new Date().toLocaleDateString()}

## 🔴 High Priority
- [ ] Submit project proposal by 5 PM
- [ ] Fix critical bug in production

## 🟡 Medium Priority
- [ ] Review pull requests
- [ ] Update documentation
- [ ] Schedule team meeting

## 🟢 Low Priority
- [ ] Organize desktop files
- [ ] Read industry newsletter
- [ ] Update LinkedIn profile

## ✅ Completed
- [x] Morning standup
- [x] Reply to client emails

## Notes
- Remember to take breaks every 2 hours
- Lunch meeting at 12:30
`,
  },
  {
    id: "blog-post",
    title: "Blog Post Draft",
    description: "Structure your blog post with intro, body, conclusion",
    icon: "file-text",
    category: "creative",
    content: `# 10 Tips for Better Productivity

*Draft - ${new Date().toLocaleDateString()}*

## Hook
*Opening sentence to grab attention*
Are you tired of ending each day feeling like you didn't accomplish enough?

## Introduction
*Set the context and tell readers what they'll learn*
In this post, I'll share 10 proven productivity tips that helped me double my output without working longer hours.

## Main Content

### Section 1: Start with the Most Important Task
Tackle your biggest challenge first thing in the morning when your energy is highest.

### Section 2: Use Time Blocking
Schedule specific blocks of time for different types of work.

### Section 3: Minimize Distractions
Turn off notifications and create a focused work environment.

## Key Takeaways
- Prioritize your most important task
- Protect your time with time blocking
- Create an environment conducive to focus

## Conclusion
*Summarize and call to action*
Start implementing just one of these tips today, and you'll be amazed at the difference it makes. Which tip will you try first?

## Meta
- **Target audience:** Professionals and entrepreneurs
- **Keywords:** productivity, time management, efficiency
- **Word count goal:** 1,500 words
`,
  },
  {
    id: "book-notes",
    title: "Book Notes",
    description: "Capture key insights from what you're reading",
    icon: "book-open",
    category: "personal",
    content: `# 📚 Book Notes

**Title:** Atomic Habits
**Author:** James Clear
**Date Started:** ${new Date().toLocaleDateString()}
**Date Finished:** 

## Rating
⭐⭐⭐⭐⭐ (5/5)

## Summary
*What is this book about in 2-3 sentences?*
A practical guide to building good habits and breaking bad ones. Clear explains how small changes compound into remarkable results.

## Key Ideas
1. 1% improvements compound over time
2. Focus on systems, not goals
3. Make habits obvious, attractive, easy, and satisfying

## Favorite Quotes
> "You do not rise to the level of your goals. You fall to the level of your systems."

> "Every action is a vote for the type of person you wish to become."

## How This Applies to My Life
- Start with 2-minute versions of habits I want to build
- Design my environment to make good habits easier
- Track habits to maintain awareness

## Recommended For
*Who would benefit from reading this?*
Anyone looking to make lasting changes in their life, from fitness to productivity to learning.

## Related Books
- The Power of Habit by Charles Duhigg
- Deep Work by Cal Newport
`,
  },
  {
    id: "recipe",
    title: "Recipe",
    description: "Document recipes with ingredients and steps",
    icon: "utensils",
    category: "personal",
    content: `# 🍳 Classic Pasta Carbonara

**Prep Time:** 10 minutes
**Cook Time:** 20 minutes
**Servings:** 4
**Difficulty:** Medium

## Ingredients
- 400g spaghetti
- 200g guanciale or pancetta, cubed
- 4 large egg yolks
- 1 whole egg
- 100g Pecorino Romano, finely grated
- Freshly ground black pepper
- Salt (for pasta water)

## Equipment
- Large pot for pasta
- Large skillet
- Mixing bowl
- Tongs

## Instructions
1. Bring a large pot of salted water to boil. Cook spaghetti until al dente.
2. While pasta cooks, whisk egg yolks, whole egg, and most of the cheese in a bowl.
3. Cook guanciale in a cold skillet over medium heat until crispy (8-10 min).
4. Reserve 1 cup pasta water, then drain pasta.
5. Remove skillet from heat, add pasta and toss with guanciale.
6. Quickly add egg mixture, tossing constantly. Add pasta water as needed.
7. Season with pepper and remaining cheese. Serve immediately.

## Tips & Variations
- The residual heat cooks the eggs; don't add to hot pan or they'll scramble
- Use pancetta if guanciale is unavailable
- Add a splash of white wine when cooking the meat

## Notes
- Authentic carbonara has no cream!
- Pecorino can be mixed with Parmigiano for milder flavor
`,
  },
  {
    id: "brainstorm",
    title: "Brainstorm",
    description: "Free-form idea generation space",
    icon: "lightbulb",
    category: "creative",
    content: `# 💡 Brainstorm: Mobile App Features

*Date: ${new Date().toLocaleDateString()}*

## Problem / Question
*What am I trying to solve or explore?*
What features would make our app stand out from competitors?

## Free Ideas
*Write anything that comes to mind, no filtering!*
- Gamification with badges and streaks
- Social sharing capabilities
- Dark mode and custom themes
- Voice input for quick entries
- AI-powered suggestions
- Offline mode
- Widget for home screen
- Push notification reminders
- Integration with calendar apps
- Export to PDF/CSV

## Promising Ideas
*Which ideas seem worth exploring further?*
1. **Gamification** - High engagement potential, relatively easy to implement
2. **AI suggestions** - Differentiator, aligns with market trends
3. **Offline mode** - Basic expectation, must have

## Next Steps
- [ ] Research gamification best practices
- [ ] Get quote for AI integration
- [ ] Survey users on most wanted features

## Inspiration / References
- Duolingo's streak system
- Notion's AI features
- Todoist's karma points
`,
  },
  {
    id: "goal-tracker",
    title: "Goal Tracker",
    description: "Set and track progress toward your goals",
    icon: "target",
    category: "productivity",
    content: `# 🎯 Goal: Run a Half Marathon

**Start Date:** ${new Date().toLocaleDateString()}
**Target Date:** June 15, 2025
**Status:** 🔄 In Progress

## Why This Matters
*Your motivation for achieving this goal*
Improve cardiovascular health, prove to myself I can commit to a big challenge, and cross it off my bucket list.

## Success Criteria
*How will you know when you've achieved it?*
- Complete a half marathon (21.1 km) without stopping
- Finish in under 2 hours 15 minutes

## Milestones
| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Run 5K comfortably | Feb 1 | ✅ Complete |
| Run 10K | Mar 15 | 🔄 In Progress |
| Run 15K | May 1 | ⏳ Planned |
| Complete half marathon | Jun 15 | ⏳ Planned |

## Weekly Progress

### Week 1 (Jan 15-21)
- Ran 3x this week, total 12 km
- Feeling good, no injuries

### Week 2 (Jan 22-28)
- Increased to 15 km total
- 

## Obstacles & Solutions
| Obstacle | Solution |
|----------|----------|
| Bad weather | Gym treadmill as backup |
| Lack of motivation | Run with a friend on Saturdays |
| Knee pain | Proper stretching, quality shoes |

## Resources Needed
- Running shoes (purchased ✅)
- Training plan app
- Hydration belt for long runs

## Reflections
After Week 2: Starting to enjoy morning runs. Energy levels are improving throughout the day.
`,
  },
];

export const TEMPLATE_CATEGORIES = {
  productivity: { label: "Productivity", color: "#3B82F6" },
  personal: { label: "Personal", color: "#10B981" },
  development: { label: "Development", color: "#8B5CF6" },
  creative: { label: "Creative", color: "#F59E0B" },
} as const;

export const TEMPLATE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "message-square": MessageSquare,
  "users": Users,
  "calendar": Calendar,
  "briefcase": Briefcase,
  "code": Code,
  "check-square": CheckSquare,
  "file-text": FileText,
  "book-open": BookOpen,
  "utensils": Utensils,
  "lightbulb": Lightbulb,
  "target": Target,
  "clipboard-list": ClipboardList,
  "settings": Settings,
  "file-code": FileCode,
};