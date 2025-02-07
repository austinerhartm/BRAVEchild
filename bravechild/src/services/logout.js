const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

async function logout_user(credentials) {
    return fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            return response.json();
        });
}

export { logout_user };