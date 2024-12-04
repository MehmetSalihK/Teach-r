import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';

interface NotificationProps {
    message: string;
    type: 'success' | 'error' | 'info';
    onClose: () => void;
    duration?: number;
}

const Notification: React.FC<NotificationProps> = ({ 
    message, 
    type, 
    onClose, 
    duration = 5000 
}) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <FiCheck className="w-5 h-5" />;
            case 'error':
                return <FiAlertCircle className="w-5 h-5" />;
            default:
                return <FiAlertCircle className="w-5 h-5" />;
        }
    };

    const getColors = () => {
        switch (type) {
            case 'success':
                return 'bg-green-800 text-green-100';
            case 'error':
                return 'bg-red-800 text-red-100';
            default:
                return 'bg-blue-800 text-blue-100';
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50, x: 50 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: 50, x: 50 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                }}
                className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${getColors()} min-w-[300px] max-w-md`}
            >
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                        {getIcon()}
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">
                            {message}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex-shrink-0 ml-4 text-gray-300 hover:text-white transition-colors"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>
                <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-white bg-opacity-30"
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: duration / 1000, ease: "linear" }}
                />
            </motion.div>
        </AnimatePresence>
    );
};

export default Notification;
