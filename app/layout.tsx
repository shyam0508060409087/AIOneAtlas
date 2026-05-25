import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import AmbientBackground from "@/components/ui/AmbientBackground";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "OneAtlas — Build apps at the speed of thought",
  description:
    "OneAtlas turns plain English into fully-functional apps — AI-designed schemas, edge deployment, and built-in auth. From idea to live in 60 seconds.",
  keywords: ["AI app builder", "no-code", "Next.js", "Cloudflare", "Neon DB"],
  openGraph: {
    title: "OneAtlas — Build apps at the speed of thought",
    description: "From idea to deployed app in 60 seconds with AI.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <ToastProvider>
          <AmbientBackground />
          <Navbar />
          <main style={{ position: "relative", zIndex: 1 }}>
            {children}
          </main>
        </ToastProvider>
      </body>
    </html>
  );
}
