import AppLayout from "@/components/dashboardLayout";

export default function Layout({children}: {children: React.ReactNode}) {
  return <AppLayout>{children}</AppLayout>;
}
