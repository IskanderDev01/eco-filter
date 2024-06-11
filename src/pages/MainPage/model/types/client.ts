export interface Filters {
    id: number;
    ordered_at: string;
    changed_at: string;
    status: string;
    expiration_date: number;
    remaining_days: number;
}

export interface Client {
    id: number;
    name: string;
    phone: string;
    address: string;
    created_at: string;
    status: string;
    description: string | null;
    category: string;
    filters: Filters[]
}

export interface ClientData {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    data: Client[];
}
