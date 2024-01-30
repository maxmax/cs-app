import type { Metadata } from 'next';
// import { Suspense } from 'react';
import CreateCat from '@/components/Buttons/CreateCat';
import { getCats } from '@/lib/cats';
import { GetCatDataProps, CatDataProps } from '@/lib/cats/types';
import Search from '@/ui/search';
import Pagination from '@/ui/pagination';
import Link from '@/components/Link';
import Image from '@/components/Image';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Cats',
  description: 'Cats collection',
};

export default async function Cats({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const data: GetCatDataProps = await getCats(query, currentPage);

  // await new Promise((resolve) => setTimeout(resolve, 4000));

  return (
    <>
      <PageHeader title={'Cats'} />
      <div className="flex items-center justify-between gap-2">
        <Search placeholder="Search by breed..." />
        <CreateCat />
      </div>
      <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
        {data.cats.map((cat: CatDataProps) => (
          <div key={cat.id} className="group relative pb-8">
            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
              <Image
                src={cat.imgUrl}
                alt={cat.name}
                className="h-full w-full object-cover object-center"
                width={400}
                height={266}
              />
            </div>
            <h3 className="mt-6 text-sm text-gray-500">
              <Link href={`/cats/${cat.id}`}>
                <span className="absolute inset-0"></span>
                {cat.name}
              </Link>
            </h3>
            <p className="text-base font-semibold text-gray-900">{cat.breed}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={data.totalPages} />
      </div>
    </>
  );
}
