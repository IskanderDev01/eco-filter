export interface Users {
    name: string,
    address: string;
    phone: string;
    category_id: number;
    expiration_date?: Array<string>;
}