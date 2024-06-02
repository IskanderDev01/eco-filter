import { Client } from './client'

export interface AllClientsSchema {
    isLoading?: boolean;
    error?: string;
    days: string;
    clients: Client[];
    search: string;
}