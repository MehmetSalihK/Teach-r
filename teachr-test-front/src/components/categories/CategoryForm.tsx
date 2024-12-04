import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { createCategory, updateCategory } from '../../store/categorySlice';
import { Category } from '../../types';

interface CategoryFormProps {
    category?: Category | null;
    onClose: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
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
        try {
            if (category) {
                await dispatch(updateCategory({
                    id: category.id,
                    data: formData,
                })).unwrap();
            } else {
                await dispatch(createCategory(formData)).unwrap();
            }
            onClose();
        } catch (error) {
            console.error('Failed to save category:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        {category ? 'Edit Category' : 'Add New Category'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="label">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                className="input"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="label">
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                rows={3}
                                className="input"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                {category ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryForm;
