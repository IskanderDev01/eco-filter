interface Filter {
    id: number;
    ordered_at: string;
    expiration_date: number;
    changed_at: string;
}

interface Comment {
    id: number;
    comment: string;
    created_at: string;
}

interface Order {
    id: number;
    status: string;
    created_at: string;
    updated_at: string;
    comments: Comment[];
    filters: Filter[]
}

export interface User {
    id: number;
    name: string;
    address: string;
    phone: string;
    orders: Order[]
}