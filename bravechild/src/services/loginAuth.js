
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // needs to be defined in environment variable, IP address of auth server


// function takes in credentials from login and turns them into a JSON formated string
// returns both the status response from the auth server and a token if user credentials are valid
async function loginUser(credentials) {
    return fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      });
  }
  
  export { loginUser };
  