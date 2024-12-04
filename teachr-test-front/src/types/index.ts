// Category Types
export interface Category {
    id: number;
    name: string;
    description?: string;
    products?: Product[];
}

export interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

// Product Types
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: Category;
}

export interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Pagination Types
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Auth Types
export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    username?: string; // Optional username
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}