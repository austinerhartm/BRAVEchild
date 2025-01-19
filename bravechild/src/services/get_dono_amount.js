const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Define this in your .env file

// Function to fetch progress data
async function get_dono_amount() {
    try {
        const response = await fetch(`${API_BASE_URL}/fetch/progress`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch progress data');
        }

        return response.json();
    } catch (error) {
        console.error('Error in fetchProgress:', error);
        throw error;
    }
}

export { get_dono_amount };
