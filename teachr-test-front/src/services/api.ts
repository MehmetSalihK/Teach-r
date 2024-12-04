import axios from 'axios';
import { 
    LoginCredentials, 
    RegisterCredentials,
    AuthResponse,
    User, 
    Category, 
    Product, 
    PaginatedResponse
} from '../types';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth endpoints
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
        const { data } = await api.post<AuthResponse>('/login', {
            email: credentials.email,
            password: credentials.password
        });
        
        if (data.token) {
            localStorage.setItem('token', data.token);
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        }
        return data;
    } catch (error: any) {
        console.error('Login error:', error.response?.data);
        const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Une erreur est survenue lors de la connexion';
        throw new Error(errorMessage);
    }
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    try {
        const { data } = await api.post<AuthResponse>('/register', {
            email: credentials.email,
            password: credentials.password
        });
        
        if (data.token) {
            localStorage.setItem('token', data.token);
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        }
        return data;
    } catch (error: any) {
        console.error('Register error:', error.response?.data);
        const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Une erreur est survenue lors de l\'inscription';
        throw new Error(errorMessage);
    }
};

export const resetPassword = async (token: string, password: string): Promise<{ message: string }> => {
    try {
        const { data } = await api.post('/reset-password', { token, password });
        return data;
    } catch (error: any) {
        throw new Error('Une erreur est survenue lors de la réinitialisation du mot de passe');
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
};

export const forgotPassword = async (email: string): Promise<{ message: string }> => {
    const { data } = await api.post('/forgot-password', { email });
    return data;
};

// Products endpoints
export const getProducts = async (params: {
    page?: number;
    limit?: number;
    search?: string;
    category?: number;
}): Promise<PaginatedResponse<Product>> => {
    const { data } = await api.get('/products', { params });
    return data;
};

export const getProduct = async (id: number): Promise<Product> => {
    const { data } = await api.get(`/products/${id}`);
    return data;
};

export const createProduct = async (product: Partial<Product>): Promise<Product> => {
    const { data } = await api.post('/products', product);
    return data;
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
    const { data } = await api.put(`/products/${id}`, product);
    return data;
};

export const deleteProduct = async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
};

// Categories endpoints
export const getCategories = async (): Promise<Category[]> => {
    const { data } = await api.get('/categories');
    return data;
};

export const getCategory = async (id: number): Promise<Category> => {
    const { data } = await api.get(`/categories/${id}`);
    return data;
};

export const createCategory = async (category: Partial<Category>): Promise<Category> => {
    try {
        const { data } = await api.post('/categories', category);
        return data;
    } catch (error: any) {
        console.error('Create category error:', error.response?.data);
        const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de la création de la catégorie';
        throw new Error(errorMessage);
    }
};

export const updateCategory = async (id: number, category: Partial<Category>): Promise<Category> => {
    const { data } = await api.put(`/categories/${id}`, category);
    return data;
};

export const deleteCategory = async (id: number): Promise<void> => {
    try {
        await api.delete(`/categories/${id}`);
    } catch (error: any) {
        if (error.response?.status === 400) {
            throw new Error('Cette catégorie contient des produits. Veuillez d\'abord supprimer ou déplacer les produits associés avant de supprimer la catégorie.');
        }
        throw new Error('Une erreur est survenue lors de la suppression de la catégorie');
    }
};
