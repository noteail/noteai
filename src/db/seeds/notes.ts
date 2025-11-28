import { db } from '@/db';
import { notes } from '@/db/schema';

async function main() {
    const sampleNotes = [
        {
            title: 'Q1 2024 Business Strategy',
            content: '## Q1 2024 Goals\n\n### Revenue Targets\n- Target: $2.5M ARR\n- Growth: 40% QoQ\n\n### Market Expansion\n- Enter European market\n- Launch in 3 new verticals\n\n### Key Performance Indicators\n- Customer acquisition: 150 new clients\n- Retention rate: 95%\n- NPS score: 70+',
            userId: 1,
            categoryId: 2,
            isFavorite: true,
            isArchived: false,
            isDeleted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Client Meeting - Acme Corp',
            content: '## Meeting Notes - Jan 15, 2024\n\n**Attendees:** Sarah (VP), John (CTO), Team\n\n**Discussion Points:**\n- Migration timeline: Q2 2024\n- Budget approved: $150K\n- Integration requirements\n\n**Action Items:**\n- [ ] Send technical proposal by Friday\n- [ ] Schedule architecture review\n- [ ] Prepare demo environment',
            userId: 1,
            categoryId: 2,
            isFavorite: false,
            isArchived: false,
            isDeleted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'React Performance Optimization Guide',
            content: '## React Performance Tips\n\n### Memoization\nx\nconst MemoizedComponent = React.memo(({ data }) => {\n  return <div>{data}</div>;\n});\n\n\n### useMemo Hook\nx\nconst expensiveValue = useMemo(() => {\n  return computeExpensiveValue(a, b);\n}, [a, b]);\n\n\n### Lazy Loading\nx\nconst LazyComponent = React.lazy(() => import(\'./Component\'));\n',
            userId: 1,
            categoryId: 6,
            isFavorite: true,
            isArchived: false,
            isDeleted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Python FastAPI Backend Setup',
            content: '## FastAPI Backend Structure\n\n### Basic Setup\npython\nfrom fastapi import FastAPI\napp = FastAPI()\n\n@app.get(\'/\')\nasync def root():\n    return {\'message\': \'Hello World\'}\n\n\n### Authentication Middleware\npython\nfrom fastapi import Depends, HTTPException\nfrom fastapi.security import HTTPBearer\n\nsecurity = HTTPBearer()\n\nasync def verify_token(credentials = Depends(security)):\n    # Verify JWT token\n    pass\n\n\n### Database Connection\npython\nfrom sqlalchemy import create_engine\nengine = create_engine(\'postgresql://...\')\n',
            userId: 1,
            categoryId: 6,
            isFavorite: true,
            isArchived: false,
            isDeleted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Product Roadmap 2024',
            content: '## 2024 Product Roadmap\n\n### Q1 - Foundation\n- User authentication 2.0\n- Dashboard redesign\n- Mobile app beta\n\n### Q2 - Growth\n- API marketplace\n- Advanced analytics\n- Team collaboration features\n\n### Q3 - Scale\n- Enterprise features\n- White-label solution\n- International expansion\n\n### Q4 - Innovation\n- AI-powered insights\n- Automation workflows\n- Custom integrations',
            userId: 1,
            categoryId: 4,
            isFavorite: false,
            isArchived: false,
            isDeleted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Database Schema Design Notes',
            content: '## Database Design Principles\n\n### Normalization\n- 1NF: Atomic values\n- 2NF: No partial dependencies\n- 3NF: No transitive dependencies\n\n### Indexing Strategies\nsql\nCREATE INDEX idx_user_email ON users(email);\nCREATE INDEX idx_created_at ON orders(created_at DESC);\n\n\n### Foreign Key Example\nsql\nALTER TABLE orders \nADD CONSTRAINT fk_user \nFOREIGN KEY (user_id) \nREFERENCES users(id);\n',
            userId: 1,
            categoryId: 5,
            isFavorite: false,
            isArchived: false,
            isDeleted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Weekly Sprint Planning',
            content: '## Sprint 23 - Week of Jan 22\n\n### Sprint Goals\n- Complete user dashboard\n- Fix critical bugs\n- Deploy staging environment\n\n### User Stories\n- [JIRA-123] As a user, I want to export reports\n- [JIRA-124] As an admin, I want to manage permissions\n\n### Team Assignments\n- Frontend: Sarah & Mike\n- Backend: Alex\n- QA: Jennifer\n\n### Blockers\n- Waiting on API keys from vendor\n- Design assets pending',
            userId: 1,
            categoryId: 2,
            isFavorite: false,
            isArchived: false,
            isDeleted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Investment Portfolio Ideas',
            content: '## Investment Strategy 2024\n\n### Asset Allocation\n- Stocks: 60%\n- Bonds: 25%\n- Real Estate: 10%\n- Crypto: 5%\n\n### Diversification\n- Tech sector: AAPL, MSFT, GOOGL\n- Index funds: VOO, QQQ\n- International: VXUS\n\n### Market Analysis\n- Interest rates trending down\n- Tech sector showing strength\n- Consider defensive positions',
            userId: 1,
            categoryId: 1,
            isFavorite: false,
            isArchived: false,
            isDeleted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'API Integration Checklist',
            content: '## Third-Party API Integration\n\n### Setup Steps\n1. Register for API key\n2. Review rate limits\n3. Set up authentication\n4. Configure webhooks\n5. Test in sandbox environment\n\n### Authentication Flow\n- OAuth 2.0 implementation\n- Token refresh strategy\n- Secure storage of credentials\n\n### Error Handling\n\ntry {\n  const response = await apiClient.get(\'/data\');\n  return response.data;\n} catch (error) {\n  if (error.response?.status === 429) {\n    // Rate limit exceeded\n    await delay(1000);\n    return retry();\n  }\n  throw error;\n}\n',
            userId: 1,
            categoryId: 4,
            isFavorite: false,
            isArchived: false,
            isDeleted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Archived: Old Project Notes',
            content: '## Legacy Project Documentation\n\n### Project Overview\nThis was the initial prototype for the mobile app. Completed in Q3 2023.\n\n### Key Learnings\n- React Native performance issues\n- Need better state management\n- User feedback was positive\n\n### Archive Reason\nProject completed and deployed. Keeping for historical reference.',
            userId: 1,
            categoryId: 4,
            isFavorite: false,
            isArchived: true,
            isDeleted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ];

    await db.insert(notes).values(sampleNotes);
    
    console.log('✅ Notes seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});