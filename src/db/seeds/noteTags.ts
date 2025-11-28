import { db } from '@/db';
import { noteTags } from '@/db/schema';

async function main() {
    const sampleNoteTags = [
        { noteId: 1, tagId: 1 },
        { noteId: 1, tagId: 4 },
        { noteId: 2, tagId: 4 },
        { noteId: 3, tagId: 8 },
        { noteId: 3, tagId: 6 },
        { noteId: 4, tagId: 7 },
        { noteId: 4, tagId: 9 },
        { noteId: 5, tagId: 1 },
        { noteId: 5, tagId: 2 },
        { noteId: 6, tagId: 10 },
        { noteId: 6, tagId: 3 },
        { noteId: 7, tagId: 2 },
        { noteId: 7, tagId: 4 },
        { noteId: 8, tagId: 5 },
        { noteId: 9, tagId: 9 },
        { noteId: 9, tagId: 3 },
    ];

    await db.insert(noteTags).values(sampleNoteTags);
    
    console.log('✅ Note tags seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});