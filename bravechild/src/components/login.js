//Library imports
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { login_user } from '../services/login_auth';
import { logout_user } from '../services/logout';
import PropTypes from 'prop-types';

// Style import
import '../styles/Login.css';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (event) => {

        event.preventDefault();

        setError(null);
        try {
            const token = await login_user({ username, password });
            setToken(token);

        } catch (err) {
            console.log(err);
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
            <p></p>
            {error && <p>{error}</p>}
            <p>Don't have an account?</p>
            <Link to='/create-user'>
                <button className='create-user-button'>Create User</button>
            </Link>
        </div>
    );
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;