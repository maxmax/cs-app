export default function SkeletonCharts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white border border-gray-200 p-4 mt-5">
        <div className="relative h-80 w-full overflow-hidden">
          <div className="h-80 bg-gray-100" />
        </div>
      </div>
      <div className="bg-white border border-gray-200 p-4 mt-5">
        <div className="relative h-80 w-full overflow-hidden">
          <div className="h-80 bg-gray-100" />
        </div>
      </div>
    </div>
  );
}