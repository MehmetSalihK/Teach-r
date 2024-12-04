import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, updateProduct, createProduct } from '../../store/productSlice';
import { fetchCategories } from '../../store/categorySlice';
import { Product, Category } from '../../types';
import { AppDispatch, RootState } from '../../store/store';
import { useNotification } from '../../contexts/NotificationContext';
import ProductForm from './ProductForm';

const ProductList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error, page, limit, total, totalPages } = useSelector((state: RootState) => state.products);
    const { categories } = useSelector((state: RootState) => state.categories);
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
    const { showNotification } = useNotification();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchProducts({
            page: currentPage,
            limit: 10,
            search: searchTerm,
            category: selectedCategory
        }));
    }, [dispatch, currentPage, searchTerm, selectedCategory]);

    const handleAddNew = () => {
        setSelectedProduct(undefined);
        setShowForm(true);
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            try {
                await dispatch(deleteProduct(id)).unwrap();
                showNotification('Le produit a été supprimé avec succès', 'success');
            } catch (error: any) {
                const errorMessage = error?.message || 'Une erreur est survenue lors de la suppression';
                showNotification(errorMessage, 'error');
            }
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        setSelectedProduct(undefined);
    };

    const handleFormSubmit = async (productData: Partial<Product>) => {
        try {
            if (selectedProduct) {
                await dispatch(updateProduct({ id: selectedProduct.id, data: productData })).unwrap();
                showNotification('Le produit a été modifié avec succès', 'success');
            } else {
                await dispatch(createProduct(productData)).unwrap();
                showNotification('Le produit a été créé avec succès', 'success');
            }
            handleFormClose();
        } catch (error: any) {
            const errorMessage = error?.message || 'Une erreur est survenue';
            showNotification(errorMessage, 'error');
        }
    };

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
                    <h1 className="text-3xl font-bold text-white">Liste des Produits</h1>
                    <button
                        onClick={handleAddNew}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                    >
                        Ajouter un produit
                    </button>
                </div>

                {/* Filtres */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Rechercher un produit..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <select
                        value={selectedCategory || ''}
                        onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : undefined)}
                        className="bg-gray-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                        <option value="">Toutes les catégories</option>
                        {categories.map((category: Category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Liste des produits */}
                <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nom</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Prix</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Catégorie</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {products.map((product: Product) => (
                                    <tr key={product.id} className="hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.price}€</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {categories.find(c => c.id === product.category?.id)?.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="text-indigo-400 hover:text-indigo-300 mr-3"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 flex justify-center">
                        <nav className="flex items-center space-x-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 rounded-md ${
                                        currentPage === page
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </nav>
                    </div>
                )}
            </div>

            {/* Modal du formulaire */}
            {showForm && (
                <ProductForm
                    product={selectedProduct}
                    onClose={handleFormClose}
                    onSubmit={handleFormSubmit}
                    categories={categories}
                />
            )}
        </div>
    );
};

export default ProductList;
