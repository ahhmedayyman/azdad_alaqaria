"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import {
  Bed,
  Bath,
  Square,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Share2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const supabase = createClient(
  "https://wlbyylcjyaflboanixwr.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export default function PropertyDetailsPage() {
  const params = useParams();
  const propertyId = params.id?.toString() || "";
  const [property, setProperty] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", propertyId)
        .single();

      if (error || !data) {
        console.error("فشل في جلب بيانات العقار:", error);
      } else {
        setProperty(data);
      }
    };

    if (propertyId) fetchProperty();
  }, [propertyId]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">
            العقار غير موجود
          </h1>
          <p className="text-gray-600">العقار الذي تبحث عنه غير موجود.</p>
        </div>
      </div>
    );
  }

  const images: string[] =
    Array.isArray(property.images) && property.images.length > 0
      ? property.images
      : ["/placeholder.svg"];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "sale":
        return "default";
      case "rent":
        return "secondary";
      case "wanted":
        return "outline";
      default:
        return "default";
    }
  };

  const getBadgeText = (type: string) => {
    switch (type) {
      case "sale":
        return "للبيع";
      case "rent":
        return "للإيجار";
      case "wanted":
        return "مطلوب";
      default:
        return type;
    }
  };

  publishDate: new Date().toISOString();

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer
        position="top-right"
        toastClassName="text-sm !rounded-lg !shadow-lg !px-4 !py-3 "
        style={{ marginTop: "65px", zIndex: 9999 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Images */}
          <div className="h-full flex flex-col">
            <Card className="overflow-hidden flex-grow">
              <div className="relative h-[450px]">
                <Image
                  src={images[currentImageIndex]}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <Badge
                  variant={getBadgeVariant(property.type)}
                  className="absolute top-4 right-4"
                >
                  {getBadgeText(property.type)}
                </Badge>

                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    >
                      <ChevronRight size={24} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    >
                      <ChevronLeft size={24} />
                    </Button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex space-x-2 space-x-reverse p-4 overflow-x-auto">
                  {images.map((image, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 p-0 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex
                          ? "border-primary"
                          : "border-gray-300"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${property.title} ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </Button>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Info & Buttons */}
          <div className="h-full">
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <h1 className="text-3xl font-bold text-primary mb-2">
                  {property.title}
                </h1>

                <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-4">
                  <div className="flex items-center">
                    <MapPin size={20} className="ml-2" />
                    <span>{property.location}</span>
                  </div>
                  <span className="text-sm text-gray-500">
  تاريخ النشر:{" "}
  {property.publishDate
    ? new Date(property.publishDate).toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "غير متوفر"}
</span>

                </div>

                <div className="flex items-center space-x-6 space-x-reverse mb-6">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center">
                      <Bed size={20} className="ml-2 text-primary" />
                      <span className="font-medium">
                        {property.bedrooms} غرف نوم
                      </span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Bath size={20} className="ml-2 text-primary" />
                    <span className="font-medium">
                      {property.bathrooms} حمامات
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Square size={20} className="ml-2 text-primary" />
                    <span className="font-medium">{property.area}م²</span>
                  </div>
                </div>

                {/* وصف العقار */}
                <div className="text-gray-700 leading-relaxed mb-6 break-words whitespace-pre-line">
                  {property.description}
                </div>

                {/* أزرار المشاركة والتواصل */}
                <div className="mt-auto flex flex-col gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("تم نسخ رابط العقار!");
                    }}
                  >
                    <Share2 className="ml-2" size={18} />
                    مشاركة العقار
                  </Button>

                  <Button
                    className="bg-accent hover:bg-accent/90 text-primary"
                    asChild
                  >
                    <a href="tel:+966551231236">تواصل عبر الهاتف</a>
                  </Button>

                  <Button
                    className="bg-primary hover:bg-primary/90 text-white"
                    asChild
                  >
                    <a
                      href="https://wa.me/966551231236"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      تواصل عبر الواتساب
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* الخريطة أسفل الصفحة بعرض كامل */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>الموقع على الخريطة</CardTitle>
          </CardHeader>
          <CardContent>
            <a
              href={property.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-64 rounded-lg overflow-hidden relative group"
            >
              <Image
                src="/map-preview.jpg"
                alt="خريطة الموقع"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition">
                <MapPin size={24} className="text-white mr-2" />
                <span className="text-white font-semibold">
                  عرض على الخريطة
                </span>
              </div>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
