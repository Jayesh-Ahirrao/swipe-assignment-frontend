import toast from 'react-hot-toast';

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