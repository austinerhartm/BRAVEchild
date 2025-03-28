import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login_user } from '../services/login_auth';

import {
    Box,
    Button,
    CssBaseline,
    TextField,
    Link,
    Typography,
    Stack,
    Card,
    FormControl,
    FormLabel,
    CircularProgress,
    Alert
} from '@mui/material';

import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const result = await login_user(username, password);
            if (result.success) {
                navigate('/', { replace: true });
            } else {
                setError(result.message || 'Invalid credentials');
            }
        } catch (err) {
            console.error(err);
            setError('Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <CssBaseline />
            <Stack className="login-container" direction="column" justifyContent="space-between">
                <Card className="login-card" variant="outlined">
                    <Typography component="h1" variant="h4" className="login-title">
                        Sign in
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleLogin}
                        noValidate
                        className="login-form"
                    >
                        <FormControl>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <TextField
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                autoComplete="username"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                error={!!error}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="******"
                                autoComplete="current-password"
                                required
                                fullWidth
                                variant="outlined"
                                error={!!error}
                            />
                        </FormControl>

                        {error && (
                            <Alert severity="error" variant="outlined">
                                {error}
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Sign in'}
                        </Button>
                    </Box>

                    <Box className="signup-section">
                        <Typography>
                            Don't have an account?{' '}
                            <Link
                                href="/create-user"
                                color="primary"
                                underline="hover"
                            >
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </Stack>

            <div className="footer">
                <div className="footer-section">
                    <h2>Contact Us</h2>
                    <p>Email: BRAVEbfchild@gmail.com</p>
                    <p>Phone: (318) 840-7091</p>
                    <p>Address: 66 Mengle Road Rayville, LA 71269</p>
                </div>

                <div className="footer-section">
                    <h2>Quick Links</h2>
                    <p><a href="/">Home</a></p>
                    <p><a href="/learn-more">About Us</a></p>
                    <p><a href="#services">Services</a></p>
                </div>

                <div className="footer-section">
                    <h2>Follow Us</h2>
                    <div className="footer-social-icons">
                        <img src="/BRAVEFacebookIcon.png" alt="Facebook" />
                        <img src="/BRAVEInstagramIcon.png" alt="Instagram" />
                        <img src="/BRAVETwitterIcon.png" alt="Twitter" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;