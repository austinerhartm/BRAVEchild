const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // needs IP address of backend server

// takes in credentials from CreateUser and converts to to JSON formatted string
// returns status message from backend along with a message of completion or error
async function register_user(credentials) {
    return fetch(`${API_BASE_URL}/auth/registration`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            return response.json();
        });
}

export { register_user };