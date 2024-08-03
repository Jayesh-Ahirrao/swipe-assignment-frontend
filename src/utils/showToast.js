import toast from 'react-hot-toast';

/**
 * the second arg is optional which by default is error
 */
const showToast = (message, type = 'error', id) => {
    if (type === 'error') {
        toast.error(message);
    } else if (type === 'success') {
        toast.success(message);
    } else if (type === 'info') {
        toast(message);
    }

    return id;
};

export default showToast;