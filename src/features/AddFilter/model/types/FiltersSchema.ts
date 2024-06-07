export interface FilterSchema {
    user_id: number;
    category_id: number;
    address: string;
    isLoading: boolean;
    error?: string;
}
