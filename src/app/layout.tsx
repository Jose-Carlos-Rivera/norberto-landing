import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "611 Design | Calzado Hecho a Mano de Calidad Premium",
  description:
    "Zapatos y sandalias artesanales de piel hechos a mano. Altos estándares de calidad, productos hechos con el corazón e impecables en su manufactura. Apoya nuestra campaña en Kickstarter.",
  keywords:
    "calzado artesanal, zapatos de piel, sandalias, handmade shoes, leather sandals, kickstarter, 611 design",
  openGraph: {
    title: "611 Design | Calzado Hecho a Mano de Calidad Premium",
    description:
      "Zapatos y sandalias artesanales de piel hechos a mano de calidad premium.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
