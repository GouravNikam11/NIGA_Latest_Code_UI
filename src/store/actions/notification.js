import { ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR } from './types';

export const enqueueSnackbar = (notification = "Record saved successfully", messageSeverity = "success") => {
    const key = notification.options && notification.options.key;
    return {
        type: ENQUEUE_SNACKBAR,
        notification: {
            key: key || new Date().getTime() + Math.random(),
            messageSeverity: messageSeverity,
            notification: notification
        },
    };
};

export const closeSnackbar = key => ({
    type: CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const removeSnackbar = key => ({
    type: REMOVE_SNACKBAR,
    key,
});