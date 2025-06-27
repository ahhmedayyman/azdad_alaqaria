"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    image: "/placeholder.svg?height=600&width=1200",
    title: "اعثر على منزل أحلامك",
    subtitle: "اكتشف العقار المثالي في أبها",
  },
  {
    image: "/placeholder.svg?height=600&width=1200",
    title: "عقارات فاخرة",
    subtitle: "منازل وشقق راقية للبيع",
  },
  {
    image: "/placeholder.svg?height=600&width=1200",
    title: "فرص استثمارية",
    subtitle: "عوائد ممتازة على الاستثمارات العقارية",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{slides[currentSlide].title}</h1>
          <p className="text-xl md:text-2xl mb-8">{slides[currentSlide].subtitle}</p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-primary">
            <Link href="/properties">استكشف العقارات</Link>
          </Button>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-accent hover:bg-white/20"
      >
        <ChevronRight size={40} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-accent hover:bg-white/20"
      >
        <ChevronLeft size={40} />
      </Button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 space-x-reverse">
        {slides.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 p-0 rounded-full transition-colors ${
              index === currentSlide ? "bg-accent" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
