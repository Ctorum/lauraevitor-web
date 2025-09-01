import type React from "react";
import "./globals.css";
import {
    Inter,
    Playfair_Display,
    Great_Vibes,
    Noto_Sans,
    Dancing_Script,
} from "next/font/google";
import { ThemeProvider } from "../components/theme-provider";
import Header from "../components/header";
import QueryContextProvider from "@/contexts/query.context";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
});
const greatVibes = Great_Vibes({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-great-vibes",
});

const notoSans = Noto_Sans({
    subsets: ["latin"],
    variable: "--font-noto-sans",
});

const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-dancing-script",
});

export const metadata = {
    title: "Vitor & Laura",
    description: "Junte-se a nós para celebrar o casamento de Vitor e Laura",
    generator: "v0.dev",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} ${notoSans.variable} ${dancingScript.variable} font-sans w-full flex items-center justify-center`}
            >
                <div className="w-full max-w-[2100px] ">
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                    >
                        <Header />
                        <QueryContextProvider>
                            <main className="w-full h-screen">{children}</main>
                        </QueryContextProvider>
                    </ThemeProvider>
                </div>
            </body>
        </html>
    );
}
