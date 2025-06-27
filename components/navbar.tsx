"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src="/logo.svg" alt="الشعار" width={120} height={40} className="h-10 w-auto" />
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="mr-10 flex items-baseline space-x-8 space-x-reverse">
              <Link href="/" className="text-primary hover:text-accent px-3 py-2 text-sm font-medium transition-colors">
                الرئيسية
              </Link>
              <Link
                href="/properties"
                className="text-primary hover:text-accent px-3 py-2 text-sm font-medium transition-colors"
              >
                العقارات
              </Link>
              <Link
                href="/news"
                className="text-primary hover:text-accent px-3 py-2 text-sm font-medium transition-colors"
              >
                الأخبار
              </Link>
              <Link
                href="/contact"
                className="text-primary hover:text-accent px-3 py-2 text-sm font-medium transition-colors"
              >
                اتصل بنا
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-primary hover:text-accent">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link href="/" className="text-primary hover:text-accent block px-3 py-2 text-base font-medium">
              الرئيسية
            </Link>
            <Link href="/properties" className="text-primary hover:text-accent block px-3 py-2 text-base font-medium">
              العقارات
            </Link>
            <Link href="/news" className="text-primary hover:text-accent block px-3 py-2 text-base font-medium">
              الأخبار
            </Link>
            <Link href="/contact" className="text-primary hover:text-accent block px-3 py-2 text-base font-medium">
              اتصل بنا
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
