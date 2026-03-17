/* ============================================================
   LOADING STATE for Data Fetching page
   ============================================================
   
   This file is automatically shown by Next.js while the 
   data-fetching/page.tsx is loading its data.
   
   BEST PRACTICE: Use skeleton screens (gray placeholder boxes)
   instead of spinners — they feel faster to users!
   ============================================================ */

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="animate-pulse space-y-6">
        {/* Title skeleton */}
        <div className="h-9 bg-gray-200 dark:bg-gray-800 rounded-lg w-64" />
        <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-96" />
        
        {/* Cards skeleton */}
        <div className="space-y-4 mt-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-800"
            >
              <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3 mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
