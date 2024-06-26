import { Client } from './client';

export interface AllClientsSchema {
    isLoading?: boolean;
    error?: string;
    days: string;
    clients: Client[];
    search: string;
    total: number;
    sortBy: string;
    per_page: number;
    current_page: number;
    last_page: number;
}
