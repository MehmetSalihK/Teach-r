import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { AppDispatch } from '../../store/store';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNotification } from '../../contexts/NotificationContext';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const { showNotification } = useNotification();

    React.useEffect(() => {
        const message = location.state?.message;
        if (message) {
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 5000);
        }
    }, [location.state]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.email.trim()) {
            newErrors.email = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email invalide';
        }

        if (!formData.password) {
            newErrors.password = 'Le mot de passe est requis';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        try {
            await dispatch(login({
                email: formData.get('email') as string,
                password: formData.get('password') as string
            })).unwrap();
            showNotification('Connexion réussie', 'success');
            navigate('/');
        } catch (error: any) {
            const errorMessage = error?.message || 'Erreur lors de la connexion';
            showNotification(errorMessage, 'error');
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#1a1d24] flex flex-col items-center justify-center p-4"
        >
            <motion.div 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ delay: 0.2 }}
                className="w-full max-w-md bg-[#22252d] rounded-3xl p-8 shadow-xl"
            >
                <motion.div 
                    initial={{ y: 20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ delay: 0.3 }}
                    className="text-center mb-8"
                >
                    <motion.h1 
                        initial={{ scale: 0.9 }} 
                        animate={{ scale: 1 }} 
                        transition={{ delay: 0.4 }}
                        className="text-4xl font-bold text-[#7c3aed] mb-2"
                    >
                        Teach'r
                    </motion.h1>
                    <motion.h2 
                        initial={{ y: 20, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        transition={{ delay: 0.5 }}
                        className="text-2xl font-semibold text-white mb-2"
                    >
                        Connexion
                    </motion.h2>
                </motion.div>

                {showSuccessMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 p-4 bg-green-500 bg-opacity-10 border border-green-500 text-green-500 rounded-xl text-sm"
                    >
                        {location.state?.message}
                    </motion.div>
                )}

                <motion.form 
                    initial={{ y: 20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ delay: 0.6 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                >
                    {errors.general && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-4 bg-[#2a2d35] rounded-xl text-red-400 text-sm"
                        >
                            {errors.general}
                        </motion.div>
                    )}

                    <motion.div 
                        initial={{ x: -20, opacity: 0 }} 
                        animate={{ x: 0, opacity: 1 }} 
                        transition={{ delay: 0.7 }}
                    >
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-3 bg-[#2a2d35] border-0 text-white rounded-xl focus:ring-2 focus:ring-[#7c3aed] placeholder-gray-400 text-sm"
                                placeholder="votreemail@exemple.com"
                            />
                        </div>
                        {errors.email && (
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-2 text-sm text-red-400"
                            >
                                {errors.email}
                            </motion.p>
                        )}
                    </motion.div>

                    <motion.div 
                        initial={{ x: -20, opacity: 0 }} 
                        animate={{ x: 0, opacity: 1 }} 
                        transition={{ delay: 0.8 }}
                    >
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                            Mot de passe
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-10 py-3 bg-[#2a2d35] border-0 text-white rounded-xl focus:ring-2 focus:ring-[#7c3aed] placeholder-gray-400 text-sm"
                                placeholder="Votre mot de passe"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                                ) : (
                                    <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-2 text-sm text-red-400"
                            >
                                {errors.password}
                            </motion.p>
                        )}
                    </motion.div>

                    <motion.div 
                        initial={{ y: 20, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        transition={{ delay: 0.9 }}
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-[#7c3aed] focus:ring-[#7c3aed] border-gray-600 rounded bg-[#2a2d35]"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                                Se souvenir de moi
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link to="/forgot-password" className="font-medium text-[#7c3aed] hover:text-[#9461ff]">
                                Mot de passe oublié ?
                            </Link>
                        </div>
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-xl text-white bg-[#7c3aed] hover:bg-[#6d31e0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c3aed] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : "Se connecter"}
                    </motion.button>

                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ delay: 1 }}
                        className="text-center mt-6"
                    >
                        <p className="text-sm text-gray-400">
                            Pas encore de compte ?{' '}
                            <Link to="/register" className="font-medium text-[#7c3aed] hover:text-[#9461ff]">
                                Créer un compte
                            </Link>
                        </p>
                    </motion.div>
                </motion.form>
            </motion.div>
        </motion.div>
    );
};

export default Login;
