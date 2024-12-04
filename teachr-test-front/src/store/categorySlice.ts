import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '../types';
import { getCategories, createCategory as apiCreateCategory, updateCategory as apiUpdateCategory, deleteCategory as apiDeleteCategory } from '../services/api';

interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null
};

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const response = await getCategories();
        return response;
    }
);

export const createCategory = createAsyncThunk(
    'categories/createCategory',
    async (categoryData: Partial<Category>) => {
        const response = await apiCreateCategory(categoryData);
        return response;
    }
);

export const updateCategory = createAsyncThunk(
    'categories/updateCategory',
    async ({ id, data }: { id: number; data: Partial<Category> }) => {
        const response = await apiUpdateCategory(id, data);
        return response;
    }
);

export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (id: number) => {
        await apiDeleteCategory(id);
        return id;
    }
);

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Une erreur est survenue';
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.categories.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(c => c.id !== action.payload);
            });
    }
});

export default categorySlice.reducer;
