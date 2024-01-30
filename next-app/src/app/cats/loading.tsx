import PageHeader from '@/components/PageHeader';
import { SkeletonCard } from '@/ui/skeleton-card';

export default function Loading() {
  return (
    <div className="space-y-4">
			<PageHeader title={'Loading...'} />
			<div className="pt-16">
				<div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
					<SkeletonCard isLoading={true} />
					<SkeletonCard isLoading={true} />
					<SkeletonCard isLoading={true} />
				</div>
			</div>
    </div>
  );
}