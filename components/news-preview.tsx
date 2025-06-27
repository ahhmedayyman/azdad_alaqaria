"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"
import NewsCard from "@/components/news-card"
import SkeletonCard from "@/components/skeleton-card"
import { Button } from "@/components/ui/button"

const supabase = createClient(
  "https://wlbyylcjyaflboanixwr.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
)

export default function NewsPreview() {
  const [featuredNews, setFeaturedNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4)

      if (error) {
        console.error("فشل في جلب الأخبار:", error)
      } else {
        setFeaturedNews(data)
      }
      setLoading(false)
    }

    fetchNews()
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">آخر الأخبار</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ابق على اطلاع بأحدث أخبار العقارات ورؤى السوق
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : featuredNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
        </div>

        {!loading && (
          <div className="text-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
              <Link href="/news">عرض المزيد من الأخبار</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
