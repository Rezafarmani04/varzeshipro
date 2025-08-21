export default function BrandLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-500 text-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="text-3xl font-bold animate-bounce">🏀 Sportify</div>
        <div className="flex space-x-2">
          <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
          <span className="w-3 h-3 bg-white rounded-full animate-pulse delay-150"></span>
          <span className="w-3 h-3 bg-white rounded-full animate-pulse delay-300"></span>
        </div>
      </div>
    </div>
  );
}
