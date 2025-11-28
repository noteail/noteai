export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authentication is handled client-side in the dashboard page
  // using bearer tokens stored in localStorage
  return <>{children}</>;
}