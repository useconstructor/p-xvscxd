import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ferretería El Constructor | Herramientas y Materiales de Construcción en Colombia",
  description: "Tu ferretería de confianza en Colombia. Herramientas manuales y eléctricas, materiales de construcción, pinturas, plomería, electricidad y tornillería. Asesoría profesional y entregas a domicilio.",
  keywords: "ferretería, Colombia, herramientas, construcción, materiales, DeWalt, Bosch, Makita",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
