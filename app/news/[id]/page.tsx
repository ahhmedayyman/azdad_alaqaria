"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const supabase = createClient(
  "https://wlbyylcjyaflboanixwr.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export default function NewsArticlePage() {
  const params = useParams();
  const articleId = params.id?.toString() || "";
  const [article, setArticle] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", articleId)
        .single();

      if (error) {
        console.error("فشل في جلب المقال:", error);
        setArticle(null);
      } else {
        setArticle(data);
      }

      setLoading(false);
    };

    if (articleId) fetchArticle();
  }, [articleId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">المقال غير موجود</h1>
          <p className="text-gray-600">المقال الذي تبحث عنه غير موجود.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="overflow-hidden">
          <CardHeader>
            <div className="relative h-96 w-full">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-primary mb-2">{article.title}</h1>
            <div className="flex items-center text-gray-500 mb-4">
              <Calendar size={20} className="ml-2" />
              <span>
                {article.created_at
                  ? new Date(article.created_at).toLocaleDateString("ar-SA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "غير متوفر"}
              </span>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {article.content}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
