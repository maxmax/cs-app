import { getUserServerSession } from '@/lib/auth';
import { getUserSlug } from '@/lib/users';
import Image from '@/components/Image';
import Link from '@/components/Link';

export default async function Profile({ params }: { params: { id: string } }) {

  const defaultImage = '/default-portrait.jpg';

  const session = await getUserServerSession();

  if (!session || !("apiToken" in session) || !session?.user?.id) {
    return null;
  }

  const user = await getUserSlug(params.id, session.apiToken);

  const isMyProfile = user.id == session?.user?.id;

  return (
    <div className="min-h-screen bg-gray-100 flex py-8 items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl flex">
        <div className="flex-shrink-0 mr-8">
          <Image
            src={user.imgUrl || defaultImage}
            alt="Profile"
            className="h-60 w-50 rounded-full object-cover object-center rounded-full"
            width={240}
            height={240}
            style={{objectFit: "cover"}}
          />
          {isMyProfile &&
            <div className="flex justify-center">
              <Link
                href={`/profile/settings`}
                className="mt-5 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-300 active:bg-indigo-800"
              >
                Settings
              </Link>
            </div>
          }
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{user.name || user.username}</h1>
          <p className="text-gray-600 mb-4">{user.email}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">First Name:</p>
              <p>{user.firstName || 'N/A'}</p>
            </div>
            <div>
              <p className="font-semibold">Last Name:</p>
              <p>{user.lastName || 'N/A'}</p>
            </div>
            <div>
              <p className="font-semibold">Company:</p>
              <p>{user.company || 'N/A'}</p>
            </div>
            <div>
              <p className="font-semibold">Contacts:</p>
              <p>{user.contacts || 'N/A'}</p>
            </div>
          </div>
          <div className="mt-4">
            <div>
              <p className="font-semibold">About:</p>
              <p>{user.about || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
