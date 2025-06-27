export default function SkeletonCard() {
  return (
    <div className="animate-pulse space-y-4 p-4 border rounded-xl bg-white shadow">
      <div className="h-40 bg-gray-200 rounded-lg w-full" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  )
}
