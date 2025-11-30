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
**Topic:** 

---

## Notes


## Action Items
- [ ] 
- [ ] 

## Next Meeting

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
**Time:** 
**Duration:** 
**Location/Platform:** 
**Meeting Type:** Weekly Sync / Sprint Planning / Review / Other

---

## Attendees
| Name | Role | Present |
|------|------|---------|
| | | ✅ |
| | | ✅ |
| | | ❌ |

## Agenda
1. [ ] 
2. [ ] 
3. [ ] 

## Previous Action Items Review
| Item | Owner | Status |
|------|-------|--------|
| | | ✅ Done |
| | | 🔄 In Progress |
| | | ❌ Not Started |

## Discussion Points

### Topic 1: [Title]
**Presenter:** 
**Summary:**

**Decisions Made:**
- 

**Questions/Concerns:**
- 

### Topic 2: [Title]
**Presenter:** 
**Summary:**

**Decisions Made:**
- 

## New Action Items
| Action | Owner | Deadline | Priority |
|--------|-------|----------|----------|
| | | | 🔴 High |
| | | | 🟡 Medium |
| | | | 🟢 Low |

## Parking Lot
*Items to discuss later*
- 

## Next Steps
- 

## Next Meeting
**Date:** 
**Agenda Preview:**
- 

`,
  },
  {
    id: "srs-document",
    title: "SRS Document",
    description: "Software Requirements Specification template",
    icon: "clipboard-list",
    category: "development",
    content: `# Software Requirements Specification (SRS)

**Project Name:** 
**Version:** 1.0
**Date:** ${new Date().toLocaleDateString()}
**Author:** 

---

## 1. Introduction

### 1.1 Purpose
*Describe the purpose of this SRS document*


### 1.2 Scope
*Define the scope of the software product*


### 1.3 Definitions & Acronyms
| Term | Definition |
|------|------------|
| | |

### 1.4 References
- 

## 2. Overall Description

### 2.1 Product Perspective
*How does this product fit into the larger system?*


### 2.2 Product Features (High-Level)
- 
- 
- 

### 2.3 User Classes and Characteristics
| User Type | Description | Technical Level |
|-----------|-------------|-----------------|
| Admin | | Advanced |
| End User | | Basic |

### 2.4 Operating Environment
- **Platform:** 
- **Browser Support:** 
- **Device Types:** 

### 2.5 Constraints
- 

### 2.6 Assumptions and Dependencies
- 

## 3. Functional Requirements

### 3.1 Feature: [Feature Name]
**ID:** FR-001
**Priority:** High / Medium / Low
**Description:** 

**Acceptance Criteria:**
- [ ] 
- [ ] 

**User Story:**
> As a [user type], I want to [action] so that [benefit].

### 3.2 Feature: [Feature Name]
**ID:** FR-002
**Priority:** High / Medium / Low
**Description:** 

**Acceptance Criteria:**
- [ ] 
- [ ] 

## 4. Non-Functional Requirements

### 4.1 Performance Requirements
- Response time: 
- Throughput: 
- Concurrent users: 

### 4.2 Security Requirements
- Authentication: 
- Authorization: 
- Data encryption: 

### 4.3 Usability Requirements
- 

### 4.4 Reliability Requirements
- Uptime: 
- Recovery: 

### 4.5 Scalability Requirements
- 

## 5. Interface Requirements

### 5.1 User Interfaces
*Describe UI requirements*


### 5.2 API Interfaces
| Endpoint | Method | Description |
|----------|--------|-------------|
| | | |

### 5.3 External Interfaces
- 

## 6. Data Requirements

### 6.1 Data Models
*Key entities and relationships*


### 6.2 Data Retention
- 

## 7. Appendix
- 

`,
  },
  {
    id: "software-analysis",
    title: "Software Analysis",
    description: "Frontend & Backend analysis documentation",
    icon: "settings",
    category: "development",
    content: `# Software Analysis Document

**Project:** 
**Date:** ${new Date().toLocaleDateString()}
**Analyst:** 

---

## 1. Executive Summary
*Brief overview of the analysis findings*


## 2. Current State Analysis

### 2.1 Existing System Overview
*Description of current system (if any)*


### 2.2 Pain Points
- 
- 

### 2.3 Stakeholder Requirements
| Stakeholder | Requirements | Priority |
|-------------|--------------|----------|
| | | |

## 3. Frontend Analysis

### 3.1 UI/UX Requirements
- 
- 

### 3.2 Page/Screen Inventory
| Page | Purpose | Components |
|------|---------|------------|
| Home | | |
| Dashboard | | |
| | | |

### 3.3 Component Architecture
\`\`\`
src/
├── components/
│   ├── ui/
│   ├── features/
│   └── layouts/
├── pages/
├── hooks/
├── utils/
└── styles/
\`\`\`

### 3.4 State Management
- **Global State:** 
- **Local State:** 
- **Server State:** 

### 3.5 Frontend Tech Stack
| Technology | Purpose | Version |
|------------|---------|---------|
| React / Next.js | Framework | |
| TypeScript | Language | |
| Tailwind CSS | Styling | |
| | | |

### 3.6 Third-Party Integrations (Frontend)
- 
- 

## 4. Backend Analysis

### 4.1 API Requirements
| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| /api/users | GET | List users | Yes |
| /api/users | POST | Create user | Yes |
| | | | |

### 4.2 Database Schema
\`\`\`sql
-- Users Table
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  created_at TIMESTAMP
);

-- Add more tables
\`\`\`

### 4.3 Entity Relationships
*Describe key relationships*
- User → has many → Posts
- Post → belongs to → User
- 

### 4.4 Backend Tech Stack
| Technology | Purpose | Version |
|------------|---------|---------|
| Node.js | Runtime | |
| Express / Next.js API | Framework | |
| PostgreSQL / SQLite | Database | |
| Drizzle ORM | ORM | |
| | | |

### 4.5 External Services
| Service | Purpose | API Type |
|---------|---------|----------|
| | | REST / GraphQL |

### 4.6 Authentication & Authorization
- **Auth Method:** 
- **User Roles:** 
- **Permissions:** 

## 5. Security Analysis
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] Data encryption

## 6. Performance Considerations
- Caching strategy: 
- Database indexing: 
- CDN usage: 
- Code splitting: 

## 7. Deployment Architecture
\`\`\`
[Client] → [CDN] → [Load Balancer] → [App Servers] → [Database]
\`\`\`

## 8. Risk Assessment
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| | High/Med/Low | High/Med/Low | |

## 9. Recommendations
1. 
2. 
3. 

## 10. Next Steps
- [ ] 
- [ ] 

`,
  },
  {
    id: "product-requirements",
    title: "Product Requirements",
    description: "PRD template for product planning",
    icon: "file-code",
    category: "productivity",
    content: `# Product Requirements Document (PRD)

**Product Name:** 
**Version:** 1.0
**Date:** ${new Date().toLocaleDateString()}
**Product Manager:** 

---

## 1. Overview

### 1.1 Problem Statement
*What problem are we solving?*


### 1.2 Objective
*What do we want to achieve?*


### 1.3 Success Metrics (KPIs)
| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| | | | |

## 2. Users & Personas

### 2.1 Target Users
*Who is this product for?*


### 2.2 User Personas

#### Persona 1: [Name]
- **Role:** 
- **Goals:** 
- **Pain Points:** 
- **Tech Savviness:** Low / Medium / High

#### Persona 2: [Name]
- **Role:** 
- **Goals:** 
- **Pain Points:** 
- **Tech Savviness:** Low / Medium / High

## 3. User Stories & Requirements

### 3.1 Epic: [Epic Name]

#### User Story 1
> As a [user type], I want to [action] so that [benefit].

**Acceptance Criteria:**
- [ ] Given [context], when [action], then [result]
- [ ] 

**Priority:** P0 / P1 / P2
**Effort:** S / M / L / XL

#### User Story 2
> As a [user type], I want to [action] so that [benefit].

**Acceptance Criteria:**
- [ ] 
- [ ] 

**Priority:** P0 / P1 / P2
**Effort:** S / M / L / XL

## 4. Feature Specifications

### 4.1 Feature: [Feature Name]
**Description:** 

**User Flow:**
1. User navigates to...
2. User clicks...
3. System displays...
4. User completes...

**Wireframe/Mockup:**
*[Link or description]*

**Edge Cases:**
- 
- 

### 4.2 Feature: [Feature Name]
**Description:** 

**User Flow:**
1. 
2. 

## 5. Scope & Priorities

### 5.1 In Scope (MVP)
- [ ] 
- [ ] 
- [ ] 

### 5.2 Out of Scope (Future)
- 
- 

### 5.3 MoSCoW Prioritization
| Must Have | Should Have | Could Have | Won't Have |
|-----------|-------------|------------|------------|
| | | | |

## 6. Technical Considerations
- **Platform:** Web / Mobile / Both
- **Integrations:** 
- **Performance:** 
- **Security:** 

## 7. Design Requirements
- **Brand Guidelines:** 
- **Accessibility:** WCAG 2.1 AA
- **Responsive:** Yes / No
- **Dark Mode:** Yes / No

## 8. Timeline & Milestones
| Milestone | Date | Status |
|-----------|------|--------|
| Kickoff | | ✅ |
| Design Complete | | ⏳ |
| Development Complete | | ⏳ |
| QA Complete | | ⏳ |
| Launch | | ⏳ |

## 9. Dependencies & Risks
| Dependency/Risk | Impact | Mitigation |
|-----------------|--------|------------|
| | | |

## 10. Launch Plan
- **Soft Launch:** 
- **Full Launch:** 
- **Marketing:** 
- **Support:** 

## 11. Post-Launch
- **Monitoring:** 
- **Feedback Collection:** 
- **Iteration Plan:** 

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


## 📝 Today's Highlights
*What happened today worth remembering?*


## 💡 Lessons Learned
*What did I learn today?*


## 🙏 Gratitude
*Three things I'm grateful for:*
1. 
2. 
3. 

## 🎯 Tomorrow's Focus

`,
  },
  {
    id: "project-plan",
    title: "Project Plan",
    description: "Outline your project goals, timeline and tasks",
    icon: "briefcase",
    category: "productivity",
    content: `# Project: [Project Name]

## Overview
*Brief description of the project*


## Goals
- 
- 
- 

## Timeline
| Phase | Duration | Status |
|-------|----------|--------|
| Planning | | ⏳ |
| Development | | ⏳ |
| Testing | | ⏳ |
| Launch | | ⏳ |

## Tasks
### Phase 1: Planning
- [ ] 
- [ ] 

### Phase 2: Development
- [ ] 
- [ ] 

### Phase 3: Testing
- [ ] 
- [ ] 

## Resources
- 

## Notes

`,
  },
  {
    id: "code-snippet",
    title: "Code Snippet",
    description: "Document code with explanation and examples",
    icon: "code",
    category: "development",
    content: `# Code Snippet: [Title]

## Description
*What does this code do?*


## Language
\`javascript\`

## Code
\`\`\`javascript
// Your code here

\`\`\`

## Usage Example
\`\`\`javascript
// How to use this code

\`\`\`

## Parameters
| Name | Type | Description |
|------|------|-------------|
| | | |

## Notes
- 

## Related Links
- 
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
- [ ] 
- [ ] 

## 🟡 Medium Priority
- [ ] 
- [ ] 

## 🟢 Low Priority
- [ ] 
- [ ] 

## ✅ Completed
- [x] 

## Notes

`,
  },
  {
    id: "blog-post",
    title: "Blog Post Draft",
    description: "Structure your blog post with intro, body, conclusion",
    icon: "file-text",
    category: "creative",
    content: `# [Blog Post Title]

*Draft - ${new Date().toLocaleDateString()}*

## Hook
*Opening sentence to grab attention*


## Introduction
*Set the context and tell readers what they'll learn*


## Main Content

### Section 1: [Heading]


### Section 2: [Heading]


### Section 3: [Heading]


## Key Takeaways
- 
- 
- 

## Conclusion
*Summarize and call to action*


## Meta
- **Target audience:** 
- **Keywords:** 
- **Word count goal:** 
`,
  },
  {
    id: "book-notes",
    title: "Book Notes",
    description: "Capture key insights from what you're reading",
    icon: "book-open",
    category: "personal",
    content: `# 📚 Book Notes

**Title:** 
**Author:** 
**Date Started:** ${new Date().toLocaleDateString()}
**Date Finished:** 

## Rating
⭐⭐⭐⭐⭐ (X/5)

## Summary
*What is this book about in 2-3 sentences?*


## Key Ideas
1. 
2. 
3. 

## Favorite Quotes
> 

> 

## How This Applies to My Life


## Recommended For
*Who would benefit from reading this?*


## Related Books
- 
`,
  },
  {
    id: "recipe",
    title: "Recipe",
    description: "Document recipes with ingredients and steps",
    icon: "utensils",
    category: "personal",
    content: `# 🍳 [Recipe Name]

**Prep Time:** 
**Cook Time:** 
**Servings:** 
**Difficulty:** Easy / Medium / Hard

## Ingredients
- 
- 
- 
- 

## Equipment
- 
- 

## Instructions
1. 
2. 
3. 
4. 
5. 

## Tips & Variations
- 

## Notes

`,
  },
  {
    id: "brainstorm",
    title: "Brainstorm",
    description: "Free-form idea generation space",
    icon: "lightbulb",
    category: "creative",
    content: `# 💡 Brainstorm: [Topic]

*Date: ${new Date().toLocaleDateString()}*

## Problem / Question
*What am I trying to solve or explore?*


## Free Ideas
*Write anything that comes to mind, no filtering!*
- 
- 
- 
- 
- 

## Promising Ideas
*Which ideas seem worth exploring further?*
1. 
2. 
3. 

## Next Steps
- [ ] 
- [ ] 

## Inspiration / References
- 
`,
  },
  {
    id: "goal-tracker",
    title: "Goal Tracker",
    description: "Set and track progress toward your goals",
    icon: "target",
    category: "productivity",
    content: `# 🎯 Goal: [Your Goal]

**Start Date:** ${new Date().toLocaleDateString()}
**Target Date:** 
**Status:** 🟡 In Progress

## Why This Matters
*Your motivation for achieving this goal*


## Success Criteria
*How will you know when you've achieved it?*
- 
- 

## Milestones
| Milestone | Target Date | Status |
|-----------|-------------|--------|
| | | ⏳ |
| | | ⏳ |
| | | ⏳ |

## Weekly Progress

### Week 1
- 

## Obstacles & Solutions
| Obstacle | Solution |
|----------|----------|
| | |

## Resources Needed
- 

## Reflections

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