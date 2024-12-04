import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { AppDispatch } from '../../store/store';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';

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

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const formVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.3 }
        }
    };

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            await dispatch(login(formData)).unwrap();
            navigate('/');
        } catch (err) {
            setErrors(prev => ({
                ...prev,
                general: 'Email ou mot de passe incorrect'
            }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            className="min-h-screen bg-gradient-to-br from-[#1a1d24] to-[#20232a] flex flex-col items-center justify-center p-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="w-full max-w-md">
                <motion.div 
                    className="bg-[#22252d]/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/5"
                    variants={formVariants}
                >
                    <motion.div className="text-center mb-8" variants={itemVariants}>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#9461ff] text-transparent bg-clip-text mb-2">
                            Teach'r
                        </h1>
                        <h2 className="text-2xl font-semibold text-white mb-2">Connexion</h2>
                        <p className="text-gray-400 text-sm">
                            Bienvenue sur votre plateforme d'apprentissage
                        </p>
                    </motion.div>

                    {showSuccessMessage && location.state?.message && (
                        <motion.div 
                            className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {location.state.message}
                        </motion.div>
                    )}

                    <motion.form onSubmit={handleSubmit} className="space-y-6" variants={formVariants}>
                        {errors.general && (
                            <motion.div 
                                className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                                variants={itemVariants}
                            >
                                {errors.general}
                            </motion.div>
                        )}

                        <motion.div variants={itemVariants}>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="h-5 w-5 text-gray-400 group-focus-within:text-[#7c3aed]" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 bg-[#2a2d35] border-2 border-transparent text-white rounded-xl focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent placeholder-gray-400 text-sm transition-all duration-200"
                                    placeholder="votreemail@exemple.com"
                                />
                            </div>
                            {errors.email && (
                                <motion.p 
                                    className="mt-2 text-sm text-red-400"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {errors.email}
                                </motion.p>
                            )}
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Mot de passe
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-[#7c3aed]" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-10 py-3 bg-[#2a2d35] border-2 border-transparent text-white rounded-xl focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent placeholder-gray-400 text-sm transition-all duration-200"
                                    placeholder="Votre mot de passe"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors duration-200" />
                                    ) : (
                                        <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors duration-200" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <motion.p 
                                    className="mt-2 text-sm text-red-400"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {errors.password}
                                </motion.p>
                            )}
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Link 
                                to="/forgot-password" 
                                className="text-sm text-[#7c3aed] hover:text-[#9461ff] transition-colors duration-200"
                            >
                                Mot de passe oublié ?
                            </Link>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-[#7c3aed] to-[#9461ff] hover:from-[#6d31e0] hover:to-[#854fff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c3aed] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : "Se connecter"}
                            </button>
                        </motion.div>

                        <motion.div className="text-center mt-6" variants={itemVariants}>
                            <p className="text-sm text-gray-400">
                                Pas encore de compte ?{' '}
                                <Link 
                                    to="/register" 
                                    className="font-medium text-[#7c3aed] hover:text-[#9461ff] transition-colors duration-200"
                                >
                                    S'inscrire
                                </Link>
                            </p>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Login;
