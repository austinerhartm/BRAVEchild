import api from './api.service';

export const get_tiles = async (childId) => {
    try {
        if (childId === undefined || childId === null) {
            throw new Error('Child ID is required');
        }

        const response = await api.get(`/fetch/tiles/${childId}`);

        if (response.data?.tileData?.blockedTiles) {
            return response.data.tileData.blockedTiles.map(tile => tile.selected_tile);
        } else {
            throw new Error('Invalid tile data structure received');
        }
    } catch (error) {
        console.error('Error fetching tiles:', error);
        if (error.response) {
            throw new Error(error.response.data.message || 'Failed to fetch tiles');
        } else if (error.request) {
            throw new Error('No response received from server');
        } else {
            throw error;
        }
    }
};