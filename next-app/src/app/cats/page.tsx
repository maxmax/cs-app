import type { Metadata } from 'next';
import Link from '@/components/Link';
import Image from '@/components/Image';
import CreateCat from '@/components/Buttons/CreateCat';
import { getCats } from '@/lib/cats';
import { CatDataProps } from '@/lib/cats/types';

export const metadata: Metadata = {
  title: 'Cats',
  description: 'Cats collection',
};

export default async function Cats() {
  const data: CatDataProps[] = await getCats();

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-24">
          <h2 className="text-2xl font-bold text-gray-900">Cats</h2>
          <CreateCat />
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
        </div>
      </div>
    </div>
  );
}
