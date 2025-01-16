//Library imports
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { loginUser } from '../services/loginAuth';
import PropTypes from 'prop-types';

// Style import
import './login.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (event) => {

        event.preventDefault();

        setError(null);
        try {
          const token = await loginUser( { username, password } );

        } catch (err) {
          setError('Invalid credentials');
        }

    };

    return (
        <div className='login-container'>
            <h2> Login </h2>
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>

                <button type='submit'>Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
  );
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;