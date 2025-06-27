"use client";
import { createClient } from "@supabase/supabase-js";
import type React from "react";
import { useEffect, useState } from "react";
import { Plus, Newspaper, Building2 } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const supabase = createClient(
  "https://wlbyylcjyaflboanixwr.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

type PropertyType = "sale" | "rent" | "wanted";

interface Property {
  id: number;
  title: string;
  type: PropertyType;
  category: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  description: string;
  mapLink: string;
  images?: string[];
  publishDate?: string;
}

interface Article {
  id: string;
  title: string;
  content: string;
  image: string;
  created_at: string;
}

export default function AdminPanel() {
  const [tab, setTab] = useState("properties");
  const [properties, setProperties] = useState<Property[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [propertyForm, setPropertyForm] = useState({
    title: "",
    type: "sale",
    category: "منزل",
    bedrooms: 1,
    bathrooms: 1,
    area: 100,
    location: "",
    description: "",
    mapLink: "",
  });
  const [newsForm, setNewsForm] = useState({
    title: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    supabase
      .from("properties")
      .select("*")
      .then(({ data }) => setProperties(data || []));
  }, []);
  useEffect(() => {
    supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setArticles(data || []));
  }, []);

  const handlePropertySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const files = (e.target as HTMLFormElement).propertyImages?.files;
    let imgs: string[] = [];
    if (files)
      for (const file of files) {
        const path = `property-${Date.now()}/${file.name}`;
        await supabase.storage.from("images").upload(path, file);
        const { data } = supabase.storage.from("images").getPublicUrl(path);
        if (data?.publicUrl) imgs.push(data.publicUrl);
      }
    const { data } = await supabase
      .from("properties")
      .insert([
        {
          ...propertyForm,
          images: imgs,
          publishDate: new Date().toISOString(),
        },
      ])
      .select("*");
    if (data) setProperties((p) => [...p, data[0]]);
    toast.success("تم إضافة العقار بنجاح");
    setPropertyForm({
      title: "",
      type: "sale",
      category: "منزل",
      bedrooms: 1,
      bathrooms: 1,
      area: 100,
      location: "",
      description: "",
      mapLink: "",
    });
  };

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = (e.target as HTMLFormElement).newsImage?.files?.[0];
    let img = "";
    if (file) {
      const path = `news-${Date.now()}/${file.name}`;
      await supabase.storage.from("images").upload(path, file);
      const { data } = supabase.storage.from("images").getPublicUrl(path);
      if (data?.publicUrl) img = data.publicUrl;
    }
    const { data } = await supabase
      .from("news")
      .insert([
        { title: newsForm.title, content: newsForm.content, image: img },
      ])
      .select("*");
    if (data) setArticles((a) => [data[0], ...a]);
    toast.success("تم إضافة المقال بنجاح");
    setNewsForm({ title: "", content: "", image: "" });
  };

  const [loggedIn, setLoggedIn] = useState(true); // يبدأ مسجل دخول، يمكن تغيير القيمة للعرض

if (!loggedIn) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="p-6 space-y-4 w-80">
        <CardHeader>
          <CardTitle>تسجيل الدخول</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="text" placeholder="اسم المستخدم" />
          <Input type="password" placeholder="كلمة المرور" />
          <Button
            className="w-full bg-[${brandBlue}] text-white hover:bg-[${brandBlue}]"
            onClick={() => setLoggedIn(true)}
          >
            دخول
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

const [oldPassword, setOldPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [showOld, setShowOld] = useState(false);
const [showNew, setShowNew] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);

const handlePasswordChange = () => {
  if (newPassword.length < 6) {
    toast.error("كلمة المرور الجديدة يجب ألا تقل عن 6 أحرف");
    return;
  }
  if (newPassword !== confirmPassword) {
    toast.error("تأكيد كلمة المرور غير مطابق");
    return;
  }
  if (!oldPassword) {
    toast.error("يرجى إدخال كلمة المرور الحالية");
    return;
  }

  // هنا يمكنك ربط التحديث بحساب Supabase أو API خارجي حسب طبيعة المشروع
  toast.success("تم تحديث كلمة المرور بنجاح");
  
  setOldPassword("");
  setNewPassword("");
  setConfirmPassword("");
};


  return (
    <div className="min-h-screen bg-gray-50 flex text-right text-[${brandBlue}]">
      <ToastContainer position="top-center" rtl autoClose={3000} />
      <div className="w-64 bg-white border-l p-6 space-y-4">
        <Button
  variant={tab === "properties" ? "default" : "outline"}
  onClick={() => setTab("properties")}
  className="w-full"
>
  جميع العقارات
</Button>
<Button
  variant={tab === "add-property" ? "default" : "outline"}
  onClick={() => setTab("add-property")}
  className="w-full"
>
  إضافة عقار
</Button>
<Button
  variant={tab === "news" ? "default" : "outline"}
  onClick={() => setTab("news")}
  className="w-full"
>
  جميع الأخبار
</Button>
<Button
  variant={tab === "add-news" ? "default" : "outline"}
  onClick={() => setTab("add-news")}
  className="w-full"
>
  إضافة خبر
</Button>
<Button
  variant={tab === "settings" ? "default" : "outline"}
  onClick={() => setTab("settings")}
  className="w-full"
>
  الإعدادات
</Button>
<Button
  variant={tab === "logout" ? "default" : "outline"}
  onClick={() => setTab("logout")}
  className="w-full"
>
  تسجيل الخروج
</Button>

      </div>

      <div className="flex-1 p-6 space-y-6">
        {tab === "properties" && (
          <Card>
            <CardHeader>
              <CardTitle>العقارات الحالية</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {properties.map((prop) => (
                <Card key={prop.id} className="overflow-hidden">
                  {prop.images?.length && (
                    <Swiper
                      modules={[Navigation]}
                      navigation
                      spaceBetween={10}
                      slidesPerView={1}
                      className="h-48"
                    >
                      {prop.images.map((img, i) => (
                        <SwiperSlide key={i}>
                          <img
                            src={img}
                            alt=""
                            className="w-full h-48 object-cover"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                  <CardHeader>
                    <CardTitle>{prop.title}</CardTitle>
                    <p>{prop.location}</p>
                  </CardHeader>
                  <CardContent>
                    <p>
                      النوع: {prop.type} - الفئة: {prop.category} - غرف:{" "}
                      {prop.bedrooms} - حمامات: {prop.bathrooms} - المساحة:{" "}
                      {prop.area}م²
                    </p>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {tab === "add-property" && (
          <Card>
            <CardHeader>
              <CardTitle>إضافة عقار جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handlePropertySubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <Label>العنوان</Label>
                  <Input
                    required
                    value={propertyForm.title}
                    onChange={(e) =>
                      setPropertyForm({
                        ...propertyForm,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>النوع</Label>
                  <Select
                    value={propertyForm.type}
                    onValueChange={(v) =>
                      setPropertyForm({
                        ...propertyForm,
                        type: v as PropertyType,
                      })
                    }
                  >
                    <SelectTrigger />
                    <SelectContent>
                      <SelectItem value="sale">للبيع</SelectItem>
                      <SelectItem value="rent">للإيجار</SelectItem>
                      <SelectItem value="wanted">مطلوب</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>الفئة</Label>
                  <Select
                    value={propertyForm.category}
                    onValueChange={(v) =>
                      setPropertyForm({ ...propertyForm, category: v })
                    }
                  >
                    <SelectTrigger />
                    <SelectContent>
                      <SelectItem value="منزل">منزل</SelectItem>
                      <SelectItem value="شقة">شقة</SelectItem>
                      <SelectItem value="فيلا">فيلا</SelectItem>
                      <SelectItem value="مكتب">مكتب</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>الموقع</Label>
                  <Input
                    required
                    value={propertyForm.location}
                    onChange={(e) =>
                      setPropertyForm({
                        ...propertyForm,
                        location: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>غرف النوم</Label>
                  <Input
                    type="number"
                    min={0}
                    value={propertyForm.bedrooms}
                    onChange={(e) =>
                      setPropertyForm({
                        ...propertyForm,
                        bedrooms: +e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>الحمامات</Label>
                  <Input
                    type="number"
                    min={1}
                    value={propertyForm.bathrooms}
                    onChange={(e) =>
                      setPropertyForm({
                        ...propertyForm,
                        bathrooms: +e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>المساحة (م²)</Label>
                  <Input
                    type="number"
                    min={1}
                    value={propertyForm.area}
                    onChange={(e) =>
                      setPropertyForm({
                        ...propertyForm,
                        area: +e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>رابط الخريطة</Label>
                  <Input
                    value={propertyForm.mapLink}
                    onChange={(e) =>
                      setPropertyForm({
                        ...propertyForm,
                        mapLink: e.target.value,
                      })
                    }
                    placeholder="https://maps.google.com/..."
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>الوصف</Label>
                  <Textarea
                    required
                    value={propertyForm.description}
                    onChange={(e) =>
                      setPropertyForm({
                        ...propertyForm,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>رفع الصور</Label>
                  <Input
                    id="propertyImages"
                    name="propertyImages"
                    type="file"
                    multiple
                    accept="image/*"
                  />
                </div>
                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    className="text-white" variant="default"
                  >
                    إضافة العقار
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {tab === "news" && (
          <Card>
            <CardHeader>
              <CardTitle>الأخبار الحالية</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map((art) => (
                <div key={art.id} className="border p-4 space-y-2">
                  <h3 className="font-bold">{art.title}</h3>
                  {art.image && (
                    <img
                      src={art.image}
                      alt=""
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <p className="text-sm text-gray-500">
                    {new Date(art.created_at).toLocaleDateString()}
                  </p>
                  <p>{art.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {tab === "add-news" && (
          <Card>
            <CardHeader>
              <CardTitle>إضافة خبر جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNewsSubmit} className="space-y-4">
                <div>
                  <Label>العنوان</Label>
                  <Input
                    required
                    value={newsForm.title}
                    onChange={(e) =>
                      setNewsForm({ ...newsForm, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>رفع صورة</Label>
                  <Input
                    id="newsImage"
                    name="newsImage"
                    type="file"
                    accept="image/*"
                  />
                </div>
                <div>
                  <Label>المحتوى</Label>
                  <Textarea
                    required
                    value={newsForm.content}
                    onChange={(e) =>
                      setNewsForm({ ...newsForm, content: e.target.value })
                    }
                  />
                </div>
                <Button
                  type="submit"
                  className="text-white" variant="default"
                >
                  إضافة الخبر
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {tab === "settings" && (
  <Card>
    <CardHeader>
      <CardTitle>إعدادات الحساب</CardTitle>
    </CardHeader>
    <CardContent>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 max-w-md">
        <div>
          <Label>كلمة المرور الحالية</Label>
          <div className="relative">
            <Input
              type={showOld ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <span
              className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowOld(!showOld)}
            >
              {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        <div>
          <Label>كلمة المرور الجديدة</Label>
          <div className="relative">
            <Input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
            />
            <span
              className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        <div>
          <Label>تأكيد كلمة المرور</Label>
          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        <Button
          type="submit"
          className="text-white" variant="default"
          onClick={handlePasswordChange}
        >
          تحديث كلمة المرور
        </Button>
      </form>
    </CardContent>
  </Card>
)}


        {tab === "logout" && (
          <Card>
            <CardHeader>
              <CardTitle>تأكيد تسجيل الخروج</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>هل أنت متأكد أنك تريد تسجيل الخروج؟</p>
              <div className="flex gap-4">
                <Button
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={() => setLoggedIn(false)}
                >
                  نعم، تسجيل الخروج
                </Button>
                <Button variant="outline" onClick={() => setTab("properties")}>
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
