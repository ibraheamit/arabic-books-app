export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      <p className="text-primary-600 font-medium">جاري التحميل...</p>
    </div>
  );
}

export function BookCardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden border border-primary-50 w-full animate-pulse">
      <div className="aspect-[2/3] w-full bg-gray-200"></div>
      <div className="p-3 md:p-4 flex flex-col flex-grow">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="mt-auto h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
}
