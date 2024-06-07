import { User } from './user';

export interface UserSchema {
    isLoading?: boolean;
    error?: string;
    id: number;
    user: User;
}
