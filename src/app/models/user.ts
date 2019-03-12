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

export class UpdateCompanyProfileRequest {
  id: number;
  email: string;
  name: string;
  address: string;
  city: string;
  contactName: string;
  phoneNumber: string;
  website: string;
  description: string;
  status: string;
}

export class Company {
  id: number;
  email: string;
  name: string;
  address: string;
  city: string;
  contactName: string;
  phoneNumber: string;
  website: string;
  description: string;
  logoURL: string;
  coverURL: string;
  videoURL: string;
}