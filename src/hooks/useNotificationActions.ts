import { useCallback } from 'react';
import { useNotifications } from '../context/NotificationContext';

export function useNotificationActions() {
  const { dispatch } = useNotifications();

  const addNotification = useCallback((
    type: 'success' | 'error' | 'warning' | 'info',
    title: string,
    message: string,
    options?: {
      duration?: number;
      action?: {
        label: string;
        onClick: () => void;
      };
    }
  ) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        type,
        title,
        message,
        duration: options?.duration || 5000,
        action: options?.action,
      },
    });
  }, [dispatch]);

  const success = useCallback((title: string, message: string, options?: { duration?: number; action?: { label: string; onClick: () => void } }) => {
    addNotification('success', title, message, options);
  }, [addNotification]);

  const error = useCallback((title: string, message: string, options?: { duration?: number; action?: { label: string; onClick: () => void } }) => {
    addNotification('error', title, message, options);
  }, [addNotification]);

  const warning = useCallback((title: string, message: string, options?: { duration?: number; action?: { label: string; onClick: () => void } }) => {
    addNotification('warning', title, message, options);
  }, [addNotification]);

  const info = useCallback((title: string, message: string, options?: { duration?: number; action?: { label: string; onClick: () => void } }) => {
    addNotification('info', title, message, options);
  }, [addNotification]);

  return {
    addNotification,
    success,
    error,
    warning,
    info,
  };
}