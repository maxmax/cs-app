export class GetCatsDto {
  readonly name?: string;
  readonly breed?: string;
  readonly imgUrl?: string;
  readonly content?: string;
  readonly age?: number;
  readonly createdAt?: string;
  readonly order: 'ASC' | 'DESC';
}
