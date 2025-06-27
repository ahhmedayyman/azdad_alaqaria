"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import PropertyCard from "@/components/property-card";
import { Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const supabase = createClient(
  "https://wlbyylcjyaflboanixwr.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation] = useState("أبها");
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 12;
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || property.type === selectedType;
    const matchesCategory =
      !selectedCategory || property.category === selectedCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    startIndex,
    startIndex + propertiesPerPage
  );

  const handleSearch = () => {
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("properties").select("*");
      if (error) console.error("خطأ أثناء جلب العقارات:", error);
      else setProperties(data);
      setLoading(false);
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-6">العقارات</h1>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <Label
                    htmlFor="search"
                    className="text-sm font-medium text-gray-700 mb-2"
                  >
                    البحث
                  </Label>
                  <div className="relative">
                    <Search
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <Input
                      id="search"
                      type="text"
                      placeholder="ابحث عن العقارات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="location"
                    className="text-sm font-medium text-gray-700 mb-2"
                  >
                    الموقع
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    value={selectedLocation}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    الفئة
                  </Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="جميع الفئات" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الفئات</SelectItem>
                      <SelectItem value="منزل">منزل</SelectItem>
                      <SelectItem value="شقة">شقة</SelectItem>
                      <SelectItem value="فيلا">فيلا</SelectItem>
                      <SelectItem value="مكتب">مكتب</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    النوع
                  </Label>
                  <div className="flex space-x-2 space-x-reverse">
                    {["sale", "rent", "wanted"].map((type) => (
                      <Button
                        key={type}
                        variant={selectedType === type ? "default" : "outline"}
                        size="sm"
                        onClick={() =>
                          setSelectedType(selectedType === type ? "" : type)
                        }
                      >
                        {type === "sale"
                          ? "للبيع"
                          : type === "rent"
                          ? "للإيجار"
                          : "مطلوب"}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-end h-full items-center lg:items-end">
                  <Button
                    onClick={handleSearch}
                    className="w-32 bg-accent hover:bg-accent/90 text-primary flex items-center justify-center gap-2"
                  >
                    <Filter size={16} className="ml-1" />
                    بحث
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-200 animate-pulse rounded-lg"
                ></div>
              ))
            : currentProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
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

        {!loading && filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              لا توجد عقارات تطابق معايير البحث.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
