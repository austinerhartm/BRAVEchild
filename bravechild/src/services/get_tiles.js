const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Define this in your .env file

// Function to fetch tiles already picked for children
async function get_tiles(childId) {
    try {
        const response = await fetch(`${API_BASE_URL}/fetch/tiles/${childId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch progress data');
        }
        const data = await response.json();
        return data.tileData.blockedTiles.map(tile => tile.selected_tile);
    } catch (error) {
        console.error('Error in fetchProgress:', error);
        throw error;
    }
}

export { get_tiles };