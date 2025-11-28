import { db } from '@/db';
import { users } from '@/db/schema';

async function main() {
    const sampleUsers = [
        {
            email: 'demo@notesai.com',
            password: 'demo123',
            name: 'Alex Johnson',
            avatar: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            email: 'sarah.chen@acme.corp',
            password: 'password123',
            name: 'Sarah Chen',
            avatar: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            email: 'mike.williams@techstart.io',
            password: 'password123',
            name: 'Mike Williams',
            avatar: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ];

    await db.insert(users).values(sampleUsers);
    
    console.log('✅ Users seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});