"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    alert("شكراً لرسالتك! سنتواصل معك قريباً.")
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary mb-4">اتصل بنا</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">تواصل مع فريقنا لأي استفسارات حول العقارات أو خدماتنا.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>أرسل لنا رسالة</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">الاسم *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="اسمك الكامل"
                  />
                </div>

                <div>
                  <Label htmlFor="email">البريد الإلكتروني *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+966 00 000 0000"
                  />
                </div>

                <div>
                  <Label htmlFor="message">الرسالة *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="أخبرنا عن استفسارك..."
                  />
                </div>

                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-primary">
                  إرسال الرسالة
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>تواصل معنا</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="flex items-start">
                  <div className="bg-accent/10 p-3 rounded-lg ml-4">
                    <Phone className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">الهاتف</h3>
                    <p className="text-gray-600">+966 55 123 1236</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-accent/10 p-3 rounded-lg ml-4">
                    <Mail className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">البريد الإلكتروني</h3>
                    <p className="text-gray-600">info@realestate.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-accent/10 p-3 rounded-lg ml-4">
                    <MapPin className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">العنوان</h3>
                    <p className="text-gray-600">أبها - المحالة - حي المشارف</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ساعات العمل</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">الأحد - الخميس</span>
                    <span className="font-medium">9:00 ص - 6:00 م</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الجمعة</span>
                    <span className="font-medium">2:00 م - 6:00 م</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">السبت</span>
                    <span className="font-medium">مغلق</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
