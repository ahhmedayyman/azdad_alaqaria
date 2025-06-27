import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import WhatsAppFloat from "@/components/whatsapp-float"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;


export const metadata: Metadata = {
  title: "ازداد العقارية",
  description: "اكتشف أفضل العقارات للبيع والإيجار في أبها",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="ar" dir="rtl">
      <body className="font-jf">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <ToastContainer position="top-center" autoClose={3000} rtl />
      </body>
    </html>
  )
}
