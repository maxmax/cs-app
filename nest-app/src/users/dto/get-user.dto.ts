export class GetUserDto {
  id: number;
  username: string;
  email: string;
  role: string;
  imgUrl?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  contacts?: string;
  about?: string;
}
