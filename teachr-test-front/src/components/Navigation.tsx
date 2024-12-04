import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import { FiHome, FiGrid, FiBox, FiLogOut, FiUser } from 'react-icons/fi';

const Navigation: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const handleLogout = () => {
        dispatch(logout());
    };

    const isActiveRoute = (path: string) => {
        return location.pathname === path;
    };

    return (
        <nav className="bg-gray-900 shadow-lg fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                                Teach'r
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/"
                                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                        isActiveRoute('/') 
                                            ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600' 
                                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                    }`}
                                >
                                    <FiHome className="w-5 h-5 mr-2" />
                                    Accueil
                                </Link>

                                <Link
                                    to="/products"
                                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                        isActiveRoute('/products')
                                            ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600'
                                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                    }`}
                                >
                                    <FiBox className="w-5 h-5 mr-2" />
                                    Produits
                                </Link>

                                <Link
                                    to="/categories"
                                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                        isActiveRoute('/categories')
                                            ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600'
                                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                    }`}
                                >
                                    <FiGrid className="w-5 h-5 mr-2" />
                                    Catégories
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300"
                                >
                                    <FiLogOut className="w-5 h-5 mr-2" />
                                    Déconnexion
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                        isActiveRoute('/login')
                                            ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600'
                                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                    }`}
                                >
                                    <FiUser className="w-5 h-5 mr-2" />
                                    Connexion
                                </Link>
                                <Link
                                    to="/register"
                                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105`}
                                >
                                    <FiUser className="w-5 h-5 mr-2" />
                                    S'inscrire
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
