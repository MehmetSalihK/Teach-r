import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import { FiHome, FiGrid, FiBox, FiLogOut, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNotification } from '../contexts/NotificationContext';

const Navigation: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const { showNotification } = useNotification();

    const handleLogout = () => {
        dispatch(logout());
        showNotification('Vous avez été déconnecté avec succès', 'success');
    };

    const isActiveRoute = (path: string) => {
        return location.pathname === path;
    };

    const navVariants = {
        hidden: { y: -100 },
        visible: { 
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    const linkVariants = {
        hover: { 
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };

    const logoVariants = {
        initial: { opacity: 0, x: -20 },
        animate: { 
            opacity: 1, 
            x: 0,
            transition: {
                duration: 0.5
            }
        },
        hover: { 
            scale: 1.1,
            rotate: [0, -5, 5, 0],
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <motion.nav 
            className="bg-gray-900 shadow-lg fixed w-full top-0 z-50"
            initial="hidden"
            animate="visible"
            variants={navVariants}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <motion.div
                            variants={logoVariants}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                        >
                            <Link to="/" className="flex items-center">
                                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                                    Teach'r
                                </span>
                            </Link>
                        </motion.div>

                        <motion.div variants={linkVariants} whileHover="hover">
                            <Link
                                to="/products"
                                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                    isActiveRoute('/products')
                                        ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                }`}
                            >
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <FiBox className="w-5 h-5 mr-2" />
                                </motion.div>
                                Produits
                            </Link>
                        </motion.div>

                        <motion.div variants={linkVariants} whileHover="hover">
                            <Link
                                to="/categories"
                                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                    isActiveRoute('/categories')
                                        ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                }`}
                            >
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <FiGrid className="w-5 h-5 mr-2" />
                                </motion.div>
                                Catégories
                            </Link>
                        </motion.div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300"
                            >
                                <FiLogOut className="w-5 h-5 mr-2" />
                                Déconnexion
                            </button>
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
                                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300`}
                                >
                                    <FiUser className="w-5 h-5 mr-2" />
                                    S'inscrire
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navigation;
