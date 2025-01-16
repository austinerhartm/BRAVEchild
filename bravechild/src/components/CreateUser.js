//Lib imports
import React, { useState } from 'react';
import { registerUser } from '../services/registrationAuth';
import { useNavigate } from 'react-router';

//Style imports
import './CreateUser.css';


const CreateUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleCreateUser = async(e) => {
        e.preventDefault();
        const newErrors = {};

        if (Object.keys(newErrors).length === 0) {
            try {
                await registerUser({ username, email, password });
            } catch (err) {
                setErrors('Unable to register new user');
            }

            console.log('User created:', { username, email, password });
            alert('User created successfully!');
            navigate('/login');

        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="create-user-container">
            <h2>Create New User</h2>
            <form onSubmit={handleCreateUser}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    {errors.username && <p className="error-message">{errors.username}</p>}
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </label>
                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default CreateUser;
