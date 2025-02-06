const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // needs to be defined in environment variable, IP address of auth server


// Function will save tiles selected by donator
async function save_tiles(childId, tileNumber) {
    return fetch(`${API_BASE_URL}/auth/save_tiles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(childId, tileNumber)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Server issue occured');
            }
            return response.json();
        });
}

export { save_tiles };