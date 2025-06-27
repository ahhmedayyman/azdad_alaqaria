export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm">ازداد العقارية. جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
