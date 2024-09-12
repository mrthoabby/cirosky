import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400"],
  subsets: ["latin-ext"],
});

const keywords: { [key: string]: string } = {
  "es-ES": "Cirosky,almacenamiento, escritos, ideas, privado, compartir,documentación,notas",
  "en-US": "Cirosky, storage, writing, ideas, private, share, documentation, notes",
};

export const metadata: Metadata = {
  title: "Cirosky Almacena y Comparte desde un Solo Lugar",
  description:
    "Una solución ideal para almacenar y organizar escritos, ideas, proyectos y documentación en un solo lugar. Mantén todo en privado o" +
    "compártelo con tu equipo y el mundo. Descubre la forma más sencilla de gestionar tu información personal y colaborativa.",
  robots: "index, follow",
  keywords: Object.values(keywords).join(","),
  authors: [{ name: "dab", url: "https://github.com/mrthoabby" }],
  icons: {
    icon: "./public/cirosky.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="es">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
