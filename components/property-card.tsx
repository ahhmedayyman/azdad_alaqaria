import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Square } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Property {
  id: number;
  title: string;
  type: "sale" | "rent" | "wanted";
  category: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  publishDate: string;
  images?: string[];
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden rounded hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      <div className="relative w-full h-48">
        <Image
          src={property.images?.[0] || "/placeholder.svg"}
          alt={property.title}
          fill
          className="object-cover"
        />
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-md">
          {property.type === "sale"
            ? "للبيع"
            : property.type === "rent"
            ? "للإيجار"
            : property.type === "wanted"
            ? "مطلوب"
            : property.type}
        </span>
      </div>

      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-primary mb-2 line-clamp-2">
          {property.title}
        </h3>

        <p className="text-xs text-gray-500 mb-4">
          {property.publishDate
            ? new Date(property.publishDate).toLocaleDateString("ar-SA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "غير متوفر"}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-5">
          <div className="flex items-center gap-1">
            <Bed size={16} />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={16} />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square size={16} />
            <span>{property.area}م²</span>
          </div>
        </div>

        <Button
          asChild
          className="w-full bg-accent hover:bg-accent/90 text-primary rounded-md"
        >
          <Link href={`/property/${property.id}`}>عرض التفاصيل</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
