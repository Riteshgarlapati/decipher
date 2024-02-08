import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import Head from "next/head";
import SessionProvider from "@/components/SessionProvider";

const jetBrains_mono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "700", "800"],
});

export const metadata = {
    title: "Decipher | OpenSys'24 | COSC",
    description: "COSC OpenSys'24",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <body className={jetBrains_mono.className}>
                <SessionProvider>{children}</SessionProvider>
            </body>
        </html>
    );
}
