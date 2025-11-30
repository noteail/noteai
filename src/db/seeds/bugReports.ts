import { db } from '@/db';
import { bugReports } from '@/db/schema';

async function main() {
    const sampleBugReports = [
        {
            title: 'Button not responding on checkout page',
            description: 'When attempting to complete a purchase, the "Confirm Payment" button becomes unresponsive after clicking once. The button shows a loading state but never completes the transaction. Expected behavior: Payment should process and redirect to confirmation page. Actual behavior: Button freezes and requires page refresh to attempt again.',
            severity: 'critical',
            pageUrl: '/checkout',
            browserInfo: 'Chrome 120.0.0 / Windows 11',
            userId: 'demo-user-1',
            userEmail: null,
            status: 'in_progress',
            ipAddress: '192.168.1.100',
            createdAt: new Date('2024-12-28').toISOString(),
            updatedAt: new Date('2024-12-29').toISOString(),
        },
        {
            title: 'Dashboard charts not loading',
            description: 'Analytics charts on the main dashboard fail to render on initial page load. Users see empty placeholder boxes instead of data visualizations. Steps to reproduce: 1) Log in to account 2) Navigate to /dashboard 3) Charts remain blank even after 30 seconds. Expected: Charts should display sales and traffic data. Actual: Empty containers with "Loading..." text that never resolves.',
            severity: 'critical',
            pageUrl: '/dashboard',
            browserInfo: 'Firefox 121.0 / macOS 14.1',
            userId: 'demo-user-2',
            userEmail: null,
            status: 'open',
            ipAddress: '10.0.0.50',
            createdAt: new Date('2025-01-05').toISOString(),
            updatedAt: new Date('2025-01-05').toISOString(),
        },
        {
            title: 'Profile image upload fails',
            description: 'Attempting to upload a new profile picture results in an error message "Upload failed: File too large" even with images under 1MB. Tested with JPG and PNG formats, all under 500KB. Steps: 1) Go to /profile 2) Click "Change Picture" 3) Select image file 4) Click Upload. Expected: Image should upload successfully. Actual: Generic error message appears regardless of file size.',
            severity: 'high',
            pageUrl: '/profile',
            browserInfo: 'Safari 17.2 / iOS 17.2',
            userId: null,
            userEmail: 'anonymous@example.com',
            status: 'resolved',
            ipAddress: '172.16.0.25',
            createdAt: new Date('2024-12-25').toISOString(),
            updatedAt: new Date('2025-01-02').toISOString(),
        },
        {
            title: 'Search bar freezes on mobile',
            description: 'On mobile devices, typing in the search bar causes the keyboard to become unresponsive after 3-4 characters. The app freezes for 5-10 seconds before recovering. Reproducible on both iOS and Android. Steps: 1) Open app on mobile 2) Navigate to /search 3) Begin typing query 4) App freezes after few characters. Expected: Smooth typing experience with instant search suggestions. Actual: Significant lag and periodic freezing.',
            severity: 'high',
            pageUrl: '/search',
            browserInfo: 'Chrome 120.0.0 / Android 14',
            userId: 'demo-user-1',
            userEmail: null,
            status: 'open',
            ipAddress: '192.168.1.101',
            createdAt: new Date('2025-01-04').toISOString(),
            updatedAt: new Date('2025-01-04').toISOString(),
        },
        {
            title: 'Dark mode toggle not working',
            description: 'The dark mode toggle switch in settings appears to change state but does not actually apply the dark theme to the application. Toggle shows as "enabled" but UI remains in light mode. Tested across multiple pages. Steps: 1) Go to /settings 2) Click dark mode toggle 3) Toggle changes to ON 4) Navigate to other pages. Expected: Entire app should switch to dark theme. Actual: Toggle changes but theme remains light.',
            severity: 'medium',
            pageUrl: '/settings',
            browserInfo: 'Edge 120.0.0 / Windows 10',
            userId: 'demo-user-2',
            userEmail: null,
            status: 'in_progress',
            ipAddress: '10.0.0.51',
            createdAt: new Date('2024-12-30').toISOString(),
            updatedAt: new Date('2025-01-03').toISOString(),
        },
        {
            title: 'Email notifications not received',
            description: 'Users are not receiving email notifications despite having all notification settings enabled. Tested with multiple email providers (Gmail, Outlook, Yahoo). Steps to reproduce: 1) Go to /settings/notifications 2) Enable all email notifications 3) Trigger notification event 4) Wait 24 hours. Expected: Email should arrive within minutes. Actual: No emails received, confirmed not in spam folder.',
            severity: 'medium',
            pageUrl: '/settings/notifications',
            browserInfo: 'Firefox 121.0 / Ubuntu 22.04',
            userId: null,
            userEmail: 'testuser@gmail.com',
            status: 'open',
            ipAddress: '203.0.113.42',
            createdAt: new Date('2025-01-06').toISOString(),
            updatedAt: new Date('2025-01-06').toISOString(),
        },
        {
            title: 'Typo in footer copyright text',
            description: 'The footer displays "Copyright © 2023" instead of "Copyright © 2024". This appears on all pages across the site. Minor visual issue but affects brand professionalism. Location: Bottom of every page in footer section. Expected: Current year (2024) should be displayed. Actual: Shows previous year (2023). Simple text update needed.',
            severity: 'low',
            pageUrl: '/',
            browserInfo: 'Chrome 120.0.0 / macOS 14.1',
            userId: 'demo-user-1',
            userEmail: null,
            status: 'resolved',
            ipAddress: '192.168.1.100',
            createdAt: new Date('2024-12-20').toISOString(),
            updatedAt: new Date('2024-12-22').toISOString(),
        },
        {
            title: 'Export CSV button missing',
            description: 'The "Export to CSV" button that was previously available on the reports page has disappeared after recent update. Users cannot export their data for external analysis. The button used to be located in the top-right corner of the reports table. Steps: 1) Navigate to /reports 2) Look for export functionality. Expected: Export CSV button should be visible. Actual: Button is completely missing from UI.',
            severity: 'low',
            pageUrl: '/reports',
            browserInfo: 'Safari 17.2 / macOS 14.1',
            userId: null,
            userEmail: 'poweruser@company.com',
            status: 'closed',
            ipAddress: '198.51.100.15',
            createdAt: new Date('2024-12-18').toISOString(),
            updatedAt: new Date('2024-12-27').toISOString(),
        }
    ];

    await db.insert(bugReports).values(sampleBugReports);
    
    console.log('✅ Bug reports seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});