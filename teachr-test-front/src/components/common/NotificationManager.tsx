import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Notification from './Notification';

export interface NotificationItem {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

interface NotificationManagerProps {
    notifications: NotificationItem[];
    removeNotification: (id: string) => void;
}

const NotificationManager: React.FC<NotificationManagerProps> = ({
    notifications,
    removeNotification,
}) => {
    return (
        <div className="fixed bottom-0 right-0 p-4 space-y-4 z-50">
            <AnimatePresence>
                {notifications.map((notification) => (
                    <Notification
                        key={notification.id}
                        message={notification.message}
                        type={notification.type}
                        onClose={() => removeNotification(notification.id)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default NotificationManager;
