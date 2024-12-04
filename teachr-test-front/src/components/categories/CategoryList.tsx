import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, deleteCategory } from '../../store/categorySlice';
import { Category } from '../../types';
import { AppDispatch, RootState } from '../../store/store';
import CategoryForm from './CategoryForm';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNotification } from '../../contexts/NotificationContext';

const CategoryList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading } = useSelector((state: RootState) => state.categories);
    const [showForm, setShowForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
    const { showNotification } = useNotification();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleAddNew = () => {
        setSelectedCategory(undefined);
        setShowForm(true);
    };

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
            try {
                await dispatch(deleteCategory(id)).unwrap();
                showNotification('La catégorie a été supprimée avec succès', 'success');
            } catch (error: any) {
                showNotification(error.message || 'Une erreur est survenue lors de la suppression', 'error');
            }
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        setSelectedCategory(undefined);
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            <span className="ml-3 text-gray-300">Chargement...</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6 pt-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Liste des Catégories</h1>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddNew}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                        <FiPlus className="w-5 h-5" />
                        <span>Ajouter une catégorie</span>
                    </motion.button>
                </div>

                <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nom</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {categories.map((category: Category) => (
                                    <motion.tr 
                                        key={category.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        whileHover={{ backgroundColor: 'rgba(55, 65, 81, 1)' }}
                                        className="hover:bg-gray-700 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                            {category.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {category.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleEdit(category)}
                                                    className="text-blue-400 hover:text-blue-300"
                                                >
                                                    <FiEdit2 className="w-5 h-5" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleDelete(category.id)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    <FiTrash2 className="w-5 h-5" />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showForm && (
                <CategoryForm
                    category={selectedCategory}
                    onClose={handleFormClose}
                />
            )}
        </div>
    );
};

export default CategoryList;
