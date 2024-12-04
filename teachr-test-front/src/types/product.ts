export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    categoryId?: number;
    createdAt?: string;
    updatedAt?: string;
}
