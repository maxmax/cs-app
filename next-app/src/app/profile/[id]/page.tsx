import { getUserServerSession } from '@/lib/auth';
import { getUserSlug } from '@/lib/users';
import Image from '@/components/Image';
import UpdateUser from '@/components/Buttons/UpdateUser';

export default async function Profile({ params }: { params: { id: string } }) {

  const session = await getUserServerSession();

  if (!session || !("apiToken" in session) || !session?.user?.id) {
    return null;
  }

  //TODO: change tu public profile or create a separate page for a public profile, we’ll think about it later
  const user = await getUserSlug(params.id, session.apiToken);

  const isMyProfile = user.id == session?.user?.id;

  return (
    <div className="min-h-screen bg-gray-100 flex py-8 items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl flex">
        <div className="flex-shrink-0 mr-8">
          <Image
            src={user.image || 'https://upload.wikimedia.org/wikipedia/commons/3/35/Maine_coon_profile.jpg'} // Укажите путь к изображению профиля или используйте изображение по умолчанию
            alt="Profile"
            className="h-50 w-50 rounded-full"
            width={220}
            height={200}
          />
          {isMyProfile &&
            <div className="flex justify-center">
              <UpdateUser id={user.id ?? 0} apiToken={session.apiToken as string} />
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
