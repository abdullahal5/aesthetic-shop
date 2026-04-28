export default function ShopSkeleton() {
  return (
    <>
      {/* Skeleton for products count */}
      <div className="mb-6">
        <div className="h-5 w-32 bg-stone-200 rounded animate-pulse" />
      </div>

      {/* Skeleton grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-stone-100 overflow-hidden"
          >
            {/* Image skeleton */}
            <div className="aspect-square bg-stone-100 animate-pulse" />

            {/* Content skeleton */}
            <div className="p-4 space-y-3">
              <div className="h-4 bg-stone-200 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-stone-200 rounded animate-pulse w-1/2" />
              <div className="flex items-center justify-between pt-2">
                <div className="h-5 bg-stone-200 rounded animate-pulse w-20" />
                <div className="h-8 w-8 bg-stone-200 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
