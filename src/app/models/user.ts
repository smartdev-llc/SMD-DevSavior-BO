export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
}

export enum Role {
  Admin = 'admin',
  Student = 'student',
  Company = 'company'
}
