import api from './api.service';

export const save_tiles = async (link, tiles, donator) => {
    try {
        console.log(link);
        if (!link) {
            throw new Error('ID is required');
        }
        if (!Array.isArray(tiles) || tiles.length === 0) {
            throw new Error('Tiles array is required and cannot be empty');
        }

        const response = await api.post('/post/save_tiles', {
            link,
            tiles,
            donator: donator || 'ANON'
        });

        return response.data;
    } catch (error) {
        console.error('Error saving tiles:', error);

        if (error.response) {
            const errorMessage = error.response.data?.message || 'Failed to save tiles';

            switch (error.response.status) {
                case 404:
                    throw new Error('Donee not found');
                case 400:
                    throw new Error('Invalid tile data provided');
                default:
                    throw new Error(errorMessage);
            }
        } else if (error.request) {
            throw new Error('No response from server. Please try again.');
        } else {
            throw error;
        }
    }
};
