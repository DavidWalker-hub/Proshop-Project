import { IUser } from "../../server/models/userModel";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}