import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, deleteCategory } from '../../store/categorySlice';
import { Category } from '../../types';
import { AppDispatch, RootState } from '../../store/store';

const CategoryList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading, error } = useSelector((state: RootState) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            <span className="ml-3 text-gray-300">Chargement...</span>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="bg-red-900 text-red-100 p-4 rounded-lg shadow-lg">
                <p className="font-medium">Erreur:</p>
                <p>{error}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6 pt-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Liste des Catégories</h1>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                    <p className="text-gray-300">Liste des catégories à venir...</p>
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
