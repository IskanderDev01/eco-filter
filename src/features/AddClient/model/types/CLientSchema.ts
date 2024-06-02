export interface ClientSchema {
    fullname: string,
    date: string;
    category: string;
    address: string;
    mobile: string
    comment: string;
    isLoading: boolean;
    error?: string;
}
