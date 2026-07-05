import { LayoutHeader } from "@/components/LayoutHeader";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutHeader showProfilePicture={false} />
      {children}
    </>
  );
}
