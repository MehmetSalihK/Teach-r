import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiRefreshCw } from 'react-icons/fi';
import { forgotPassword } from '../../services/api';
import { motion } from 'framer-motion';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await forgotPassword(email);
            setSuccess(true);
        } catch (err) {
            setError('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setLoading(false);
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
                        Mot de passe oublié
                    </motion.h2>
                    <motion.p 
                        initial={{ y: 20, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        transition={{ delay: 0.6 }}
                        className="text-gray-400 text-sm"
                    >
                        Entrez votre email pour réinitialiser votre mot de passe
                    </motion.p>
                </motion.div>

                {success ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center"
                    >
                        <div className="mb-4 p-4 bg-green-500 bg-opacity-10 border border-green-500 text-green-500 rounded-xl">
                            Un email de réinitialisation a été envoyé à votre adresse email.
                        </div>
                        <Link 
                            to="/login"
                            className="text-[#7c3aed] hover:text-[#9461ff] transition-colors"
                        >
                            Retour à la connexion
                        </Link>
                    </motion.div>
                ) : (
                    <motion.form 
                        initial={{ y: 20, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        transition={{ delay: 0.7 }}
                        onSubmit={handleSubmit} 
                        className="space-y-6"
                    >
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-4 bg-[#2a2d35] rounded-xl text-red-400 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 bg-[#2a2d35] border-0 text-white rounded-xl focus:ring-2 focus:ring-[#7c3aed] placeholder-gray-400 text-sm"
                                    placeholder="votreemail@exemple.com"
                                    required
                                />
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
                                <FiRefreshCw className="h-5 w-5 animate-spin" />
                            ) : (
                                "Réinitialiser le mot de passe"
                            )}
                        </motion.button>

                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ delay: 0.9 }}
                            className="text-center mt-6"
                        >
                            <Link 
                                to="/login" 
                                className="text-[#7c3aed] hover:text-[#9461ff] transition-colors"
                            >
                                Retour à la connexion
                            </Link>
                        </motion.div>
                    </motion.form>
                )}
            </motion.div>
        </motion.div>
    );
};

export default ForgotPassword;
