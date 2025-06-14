import React, { useEffect, useState } from 'react';
import { NotificationToast } from './NotificationToast';
import { useNotifications, Notification } from '../context/NotificationContext';

export function NotificationManager() {
  const { state, dispatch } = useNotifications();
  const [toastNotifications, setToastNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Show new notifications as toasts
    const newNotifications = state.notifications.filter(
      notification => !toastNotifications.some(toast => toast.id === notification.id)
    );

    if (newNotifications.length > 0) {
      setToastNotifications(prev => [...prev, ...newNotifications]);
    }
  }, [state.notifications, toastNotifications]);

  const handleCloseToast = (id: string) => {
    setToastNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-3 pointer-events-none">
      {toastNotifications.map((notification) => (
        <div key={notification.id} className="pointer-events-auto">
          <NotificationToast
            notification={notification}
            onClose={() => handleCloseToast(notification.id)}
          />
        </div>
      ))}
    </div>
  );
}