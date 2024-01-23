class UserDto {
  id: number;
  username: string;
  email: string;
  role: string;
}
export class LoginUserDto {
  user: UserDto;
  token: string;
}
