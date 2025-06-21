import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MCIM - Minecraft Mod Information Mirror",
  description: "为中国大陆用户提供稳定、快速的 Minecraft Mod 信息镜像服务。支持 Modrinth 和 CurseForge API，完全兼容官方接口。",
  keywords: ["Minecraft", "Mod", "API", "Mirror", "Modrinth", "CurseForge", "中国镜像"],
  authors: [{ name: "MCIM Team" }],
  icons: {
    icon: "/avatar.png",
    shortcut: "/avatar.png",
    apple: "/avatar.png",
  },
  openGraph: {
    title: "MCIM - Minecraft Mod Information Mirror",
    description: "为中国大陆用户提供稳定、快速的 Minecraft Mod 信息镜像服务",
    type: "website",
    url: "https://mcimirror.top",
  },
  twitter: {
    card: "summary_large_image",
    title: "MCIM - Minecraft Mod Information Mirror",
    description: "为中国大陆用户提供稳定、快速的 Minecraft Mod 信息镜像服务",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
