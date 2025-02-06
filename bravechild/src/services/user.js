const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // needs IP address of backend server

const fetch_user = async () => {
    let token = sessionStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/fetch/user`, {
        method: 'GET',
        withCredntials: true,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status === 401) {
        // Try refreshing the token
        const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const refreshData = await refreshResponse.json();

        if (refreshData.success) {
            console.log("THIS IS BEING RUN");
            return fetch(`${API_BASE_URL}/fetch/user`, {
                method: 'GET',
                withCredntials: true,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            window.location.href = '/login'; // Redirect to login if refresh fails
        }
    }

    return response;
};

export { fetch_user };