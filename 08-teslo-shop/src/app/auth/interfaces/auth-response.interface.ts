import { User } from "./user.interface";

export interface AUthResponse {
    user: User;
    token: string;
}