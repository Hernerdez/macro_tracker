export function LoadingFallback() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }
  
  export function CardLoadingSkeleton() {
    return (
      <div className="w-80 h-80 p-8 bg-white rounded-2xl shadow-lg animate-pulse">
        <div className="h-full flex flex-col justify-center items-center text-center space-y-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-12 bg-gray-200 rounded w-32"></div>
          <div className="h-16 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-40"></div>
        </div>
      </div>
    )
  }