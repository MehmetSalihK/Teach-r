import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiRefreshCw } from 'react-icons/fi';
import { forgotPassword } from '../../services/api';

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
        <div className="min-h-screen bg-[#1a1d24] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#22252d] rounded-3xl p-8 shadow-xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#7c3aed] mb-2">Teach'r</h1>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <FiRefreshCw className="w-6 h-6 text-white" />
                        <h2 className="text-2xl font-semibold text-white">Réinitialiser le mot de passe</h2>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Entrez votre adresse email pour recevoir un lien de réinitialisation
                    </p>
                </div>

                {success ? (
                    <div className="bg-[#2a2d35] p-6 rounded-xl text-center">
                        <p className="text-green-400 mb-4">
                            Un email de réinitialisation a été envoyé à votre adresse email.
                        </p>
                        <Link
                            to="/login"
                            className="text-[#7c3aed] hover:text-[#9461ff] font-medium"
                        >
                            Retour à la connexion
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-[#2a2d35] rounded-xl text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <div>
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 bg-[#2a2d35] border-0 text-white rounded-xl focus:ring-2 focus:ring-[#7c3aed] placeholder-gray-400 text-sm"
                                    placeholder="votreemail@exemple.com"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-xl text-white bg-[#7c3aed] hover:bg-[#6d31e0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c3aed] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : "Réinitialiser le mot de passe"}
                            </button>
                        </div>

                        <div className="text-center mt-6">
                            <Link
                                to="/login"
                                className="text-[#7c3aed] hover:text-[#9461ff] font-medium"
                            >
                                Retour à la connexion
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
