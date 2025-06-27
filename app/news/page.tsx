"use client"

import { useState, useEffect } from "react"
import NewsCard from "@/components/news-card"
import { Button } from "@/components/ui/button"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://wlbyylcjyaflboanixwr.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
)

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const articlesPerPage = 12
  const totalPages = Math.ceil(articles.length / articlesPerPage)
  const startIndex = (currentPage - 1) * articlesPerPage
  const currentArticles = articles.slice(startIndex, startIndex + articlesPerPage)

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("فشل في جلب الأخبار:", error)
      } else {
        setArticles(data)
      }

      setLoading(false)
    }

    fetchArticles()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4">آخر الأخبار</h1>
          <p className="text-gray-600 max-w-2xl">
            ابق على اطلاع بأحدث أخبار العقارات ورؤى السوق واتجاهات الصناعة.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
              ))
            : currentArticles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center space-x-2 space-x-reverse">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>
        )}

        {!loading && currentArticles.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            لا توجد أخبار متاحة حالياً.
          </div>
        )}
      </div>
    </div>
  )
}
