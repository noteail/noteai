import { db } from '@/db';
import { categories } from '@/db/schema';

async function main() {
    const sampleCategories = [
        {
            name: 'Personal',
            color: '#6366f1',
            icon: 'user',
            userId: 1,
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Work',
            color: '#f59e0b',
            icon: 'briefcase',
            userId: 1,
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Ideas',
            color: '#10b981',
            icon: 'lightbulb',
            userId: 1,
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Projects',
            color: '#ec4899',
            icon: 'folder',
            userId: 1,
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Learning',
            color: '#8b5cf6',
            icon: 'book',
            userId: 1,
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Code Snippets',
            color: '#06b6d4',
            icon: 'code',
            userId: 1,
            createdAt: new Date().toISOString(),
        },
    ];

    await db.insert(categories).values(sampleCategories);
    
    console.log('✅ Categories seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});