const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 

async function submitSponsor(sponsorData) {
    try {
        const response = await fetch(`${API_BASE_URL}/sponsor/donate`, {
            method: 'POST', 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sponsorData)
        });

        if (!response.ok) {
            throw new Error('Failed to submit donation'); 
        }

        return response.json(); 
    } catch (error) {
        console.error('Error in submit_sponsor:', error);
        throw error; 
    }
}

export { submit_sponsor }; 