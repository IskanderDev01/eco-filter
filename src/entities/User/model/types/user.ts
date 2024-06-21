export interface User {
    id?: number;
    name?: string;
    address?: string;
    phone?: string;
    description?: string;
}
export interface UserShema {
    data?: User;
    form?: User;
    isLoading: boolean;
    error?: string;
}
