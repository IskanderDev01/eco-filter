interface Filters {
    id: number;
    ordered_at: string;
    changed_at: string;
    expiration_date: string;
}

interface Comments {
    id: number;
    comment: string;
    created_at: string;
}

interface Category {
    id: number;
    name: string;
}

interface Orders {
    id: number;
    category: Category;
    address: string;
    created_at: string;
    comments: Comments[];
    filters: Filters[];
}

export interface Client {
    id: number;
    name: string;
    phone: string;
    address: string;
    created_at: string;
    orders: Orders[];
}

export interface ClientData {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    data: Client[];
}
