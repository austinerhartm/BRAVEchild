import api from './api.service';

export const remove_donee = async (name) => {
    try {
        const response = await api.post('/post/remove_donee', { name });

        if (response.data.success) {
            return { success: true };
        }

        return { success: false, message: response.data.message };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: error.response?.data?.message };
    }
};