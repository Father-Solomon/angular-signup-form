export interface IUser {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  permissions?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
