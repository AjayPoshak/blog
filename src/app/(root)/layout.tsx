import { LayoutHeader } from "@/components/LayoutHeader";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LayoutHeader />
      {children}
    </>
  );
}
