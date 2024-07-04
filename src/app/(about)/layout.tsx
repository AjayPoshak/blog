import { LayoutHeader } from "@/components/LayoutHeader";
import { IBM_Plex_Sans } from "next/font/google";
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plexSans.className}>
      <body>
        <LayoutHeader showProfilePicture={false} />
        {children}
      </body>
    </html>
  );
}
