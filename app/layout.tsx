import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Prom Night - You're Invited",
  description: "Minimalist Mexican Floral Theme Invitation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      {/* Background Soft Cream / Warm Beige: #F9F5F0 */}
      <body
        className={`${playfair.variable} ${poppins.variable} font-sans bg-[#F9F5F0] text-neutral-800 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}