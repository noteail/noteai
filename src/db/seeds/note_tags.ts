import { db } from '@/db';

async function main() {
    await db.execute(`
        INSERT INTO note_tags (note_id, tag_id) VALUES
        (1, 1),
        (1, 4),
        (2, 4),
        (3, 8),
        (3, 6),
        (4, 7),
        (4, 9),
        (5, 1),
        (5, 2),
        (6, 10),
        (6, 3),
        (7, 2),
        (7, 4),
        (8, 5),
        (9, 9),
        (9, 3)
    `);
    
    console.log('✅ Note tags seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});