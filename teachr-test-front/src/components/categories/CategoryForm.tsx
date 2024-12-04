import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { createCategory, updateCategory } from '../../store/categorySlice';
import { Category } from '../../types';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useNotification } from '../../contexts/NotificationContext';

interface CategoryFormProps {
    category?: Category;
    onClose: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [error, setError] = useState<string | null>(null);
    const { showNotification } = useNotification();
    const [formData, setFormData] = useState({
        name: category?.name || '',
        description: category?.description || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            if (category) {
                await dispatch(updateCategory({
                    id: category.id,
                    data: formData,
                })).unwrap();
                showNotification('La catégorie a été modifiée avec succès', 'success');
            } else {
                await dispatch(createCategory(formData)).unwrap();
                showNotification('La catégorie a été créée avec succès', 'success');
            }
            onClose();
        } catch (error: any) {
            const errorMessage = error?.message || 'Une erreur est survenue lors de la sauvegarde';
            showNotification(errorMessage, 'error');
        }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        },
        exit: { 
            opacity: 0, 
            scale: 0.8,
            transition: {
                duration: 0.2,
                ease: "easeIn"
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div 
                className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white">
                            {category ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
                        </h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-300 transition-colors"
                        >
                            <FiX className="w-6 h-6" />
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-900 border border-red-800 text-red-100 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                                Nom de la catégorie
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                required
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {category ? 'Mettre à jour' : 'Créer'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default CategoryForm;
