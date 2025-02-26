const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 

async function submit_sponsor(sponsorData) {
    
    const donorData = {
        user_id: 6, 
        amount: sponsorData.selectedAmount || sponsorData.customAmount, 
        for_child: "all", 
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/sponsor/donate`, {
            method: 'POST', 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(donorData)
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