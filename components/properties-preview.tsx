"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PropertyCard from "@/components/property-card";
import SkeletonCard from "@/components/skeleton-card";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://wlbyylcjyaflboanixwr.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export default function PropertiesPreview() {
  const [featuredProperties, setFeaturedProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("publishDate", { ascending: false })
        .limit(4);

      if (error) {
        console.error("❌ خطأ في جلب العقارات المميزة:", error.message);
      } else {
        setFeaturedProperties(data || []);
      }
      setLoading(false);
    };

    fetchFeatured();
  }, []);

  return (
    <section className="py-16 bg-slate-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
        العقارات المميزة
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
        اكتشف مجموعتنا المختارة بعناية من العقارات التي تلبي احتياجاتك.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        : featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
    </div>

    {!loading && (
      <div className="text-center">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-base rounded-md">
          <Link href="/properties">عرض المزيد من العقارات</Link>
        </Button>
      </div>
    )}
  </div>
</section>

  );
}
