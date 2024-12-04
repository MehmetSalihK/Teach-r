import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';
import { getProducts, createProduct as apiCreateProduct, updateProduct as apiUpdateProduct, deleteProduct as apiDeleteProduct } from '../services/api';

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

interface FetchProductsParams {
    page?: number;
    limit?: number;
    search?: string;
    category?: number;
}

interface UpdateProductParams {
    id: number;
    data: Partial<Product>;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (params: FetchProductsParams) => {
        const response = await getProducts(params);
        return response;
    }
);

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (productData: Partial<Product>) => {
        const response = await apiCreateProduct(productData);
        return response;
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, data }: UpdateProductParams) => {
        const response = await apiUpdateProduct(id, data);
        return response;
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id: number) => {
        await apiDeleteProduct(id);
        return id;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.items;
                state.total = action.payload.total;
                state.page = action.payload.page;
                state.limit = action.payload.limit;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Une erreur est survenue';
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p.id !== action.payload);
            });
    }
});

export default productSlice.reducer;
