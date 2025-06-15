import '@/styles/normalize.scss';
import '@/styles/variables.scss';
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import type { Metadata , Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { CacheCleanup } from '@/components/CacheCleanup';
import { Header } from '@/components/common/Header';
import { GlobalErrors } from '@/components/GlobalErrors';
import { GlobalLoader } from '@/components/GlobalLoader';
import styles from "@/styles/global.module.scss";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Github repo search",
    description: "Search for repositories in GitHub",
};

export const viewport: Viewport = {
    width: '320',
    initialScale: 1,
    maximumScale: 1,
    userScalable: true,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
            </head>

            <body className={`${geistSans.variable} ${geistMono.variable} ${styles.body}`}>
                <CacheCleanup />

                <Header />

                <MantineProvider>
                    <GlobalLoader />
                    <GlobalErrors />
                    {children}
                </MantineProvider>
            </body>
        </html>
    );
}
