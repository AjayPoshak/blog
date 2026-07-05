import { LayoutHeader } from "@/components/LayoutHeader";
import { fontClassName } from "@/app/fonts";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontClassName}>
      <body>
        <LayoutHeader showProfilePicture={false} />
        {children}
      </body>
    </html>
  );
}
