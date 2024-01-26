import { Metadata, ResolvingMetadata } from 'next';
import Image from '@/components/Image';
import DeleteCat from '@/components/Buttons/DeleteCat';
import { getCat } from '@/lib/cats';
import { CatDataProps } from '@/lib/cats/types';

type MetadataProps = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const cat: CatDataProps = await getCat(params.slug);

  return {
    title: cat.name,
    description: cat.breed
  }
}

export default async function Article({ params }: { params: { slug: string } }) {
  const cat: CatDataProps = await getCat(params.slug);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto mt-8 flex py-16 sm:py-24 lg:py-24">
        <div className="w-1/2 pr-8">
          <div className="relative h-80 w-full overflow-hidden rounded-lg">
            <Image
              src={cat.imgUrl}
              alt={cat.name}
              className="h-full w-full object-cover object-center"
              width={400}
              height={266}
            />
          </div>
        </div>
        <div className="w-1/2">
          <h1 className="text-3xl font-bold mb-4">{cat.name}</h1>
          <p className="text-base font-semibold mb-4">{cat.breed}</p>
          <p className="text-gray-500 mb-4">Age: {cat.age}</p>
          <p className="text-lg mb-4">{cat.content}</p>
          <DeleteCat id={cat.id} />
        </div>
      </div>
    </div>
  );
}
