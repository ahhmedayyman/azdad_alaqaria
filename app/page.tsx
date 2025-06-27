import HeroSection from "@/components/hero-section"
import CategoriesSection from "@/components/categories-section"
import PropertiesPreview from "@/components/properties-preview"
import NewsPreview from "@/components/news-preview"

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <PropertiesPreview />
      <NewsPreview />
    </div>
  )
}
