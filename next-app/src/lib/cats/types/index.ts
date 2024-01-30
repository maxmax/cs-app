export interface CreateCatDataProps {
  name: string;
  imgUrl: string;
  content: string;
  breed: string;
  age: number;
}

export interface UpdateCatDataProps extends CreateCatDataProps {}

export interface CatDataProps {
  id: number;
  name: string;
  imgUrl: string;
  content: string;
  breed: string;
  age: number;
}

export interface GetCatDataProps {
  cats: CatDataProps[];
  breed: string;
  totalPages: number;
}
