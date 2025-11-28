import { db } from '@/db';
import { tags } from '@/db/schema';

async function main() {
    const sampleTags = [
        {
            name: 'important',
            color: '#ef4444',
            userId: 1,
        },
        {
            name: 'todo',
            color: '#f59e0b',
            userId: 1,
        },
        {
            name: 'reference',
            color: '#3b82f6',
            userId: 1,
        },
        {
            name: 'meeting',
            color: '#8b5cf6',
            userId: 1,
        },
        {
            name: 'idea',
            color: '#10b981',
            userId: 1,
        },
        {
            name: 'javascript',
            color: '#eab308',
            userId: 1,
        },
        {
            name: 'python',
            color: '#3b82f6',
            userId: 1,
        },
        {
            name: 'react',
            color: '#06b6d4',
            userId: 1,
        },
        {
            name: 'api',
            color: '#ec4899',
            userId: 1,
        },
        {
            name: 'database',
            color: '#84cc16',
            userId: 1,
        },
    ];

    await db.insert(tags).values(sampleTags);
    
    console.log('✅ Tags seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});