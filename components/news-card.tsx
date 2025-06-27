import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Article {
  id: number
  title: string
  excerpt: string
  publishDate: string
  image: string
}

interface NewsCardProps {
  article: Article
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Image
        src={article.image || "/placeholder.svg"}
        alt={article.title}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />

      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-sm text-gray-500 mb-3">{article.publishDate}</p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>

        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-primary">
          <Link href={`/news/${article.id}`}>اقرأ المزيد</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
