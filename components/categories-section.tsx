import { Home, Building, Building2, Briefcase } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    icon: Home,
    title: "منازل خاصة",
    description: "منازل عائلية جميلة",
  },
  {
    icon: Building,
    title: "شقق",
    description: "معيشة عصرية في الشقق",
  },
  {
    icon: Building2,
    title: "فلل",
    description: "عقارات فلل فاخرة",
  },
  {
    icon: Briefcase,
    title: "مكاتب",
    description: "مساحات مكتبية تجارية",
  },
]

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">فئات العقارات</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            استكشف مجموعتنا المتنوعة من العقارات للعثور على المطابقة المثالية لاحتياجاتك
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow text-center">
                <CardContent className="p-6">
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-accent" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
