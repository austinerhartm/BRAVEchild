import api from './api.service';

export const fetch_donees = async () => {
	try {
		const response = await api.get('/fetch/donees');

		if (response.data.success) {
			return { success: true, data: response.data };
		}

		return { success: false, message: response.data.message };
	} catch (error) {
		console.error('Error:', error);
		return { success: false, message: error.response?.data?.message };
	}
};