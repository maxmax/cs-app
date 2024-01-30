import PageHeader from '@/components/PageHeader';
import { SkeletonCard } from '@/ui/skeleton-card';

export default function Loading() {
  return (
    <div className="container mx-auto mt-8 flex py-16 sm:py-24 lg:py-24">
      <div className="w-1/2 pr-8">
        <div className="relative h-80 w-full overflow-hidden rounded-lg">
					<div className="h-80 rounded-lg bg-gray-300" />
        </div>
      </div>
      <div className="w-1/2">
				<div className="h-20 rounded-lg bg-gray-300 mb-4" />
				<div className="h-20 w-11/12 rounded-lg bg-gray-300 mb-4" />
				<div className="h-40 w-8/12 rounded-lg bg-gray-300" />
      </div>
    </div>
  );
}