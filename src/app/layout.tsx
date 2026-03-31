import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barquera | Calzado Artesanal de Piel - Hecho en México",
  description:
    "Zapatos y sandalias artesanales de piel hechos a mano en México. Tradición, diseño contemporáneo y materiales premium. Apoya nuestra campaña en Kickstarter.",
  keywords:
    "calzado artesanal, zapatos de piel, sandalias mexicanas, handmade shoes, leather sandals, kickstarter",
  openGraph: {
    title: "Barquera | Calzado Artesanal de Piel",
    description:
      "Zapatos y sandalias artesanales de piel hechos a mano en México.",
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
      <head>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateInit"
          strategy="afterInteractive"
        />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'es',
                autoDisplay: false,
                includedLanguages: 'en,fr,de,it,pt,ja,ko,zh-CN,ar,ru,hi,nl,sv,pl,tr,th,vi,id,he'
              }, 'google_translate_element');
            }
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
