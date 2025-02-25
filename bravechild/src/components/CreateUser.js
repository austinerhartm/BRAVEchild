import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register_user } from '../services/registration_auth';

import {
    Box,
    Button,
    CssBaseline,
    TextField,
    Typography,
    Stack,
    Card,
    FormControl,
    FormLabel,
    CircularProgress,
    Alert
} from '@mui/material';

import '../styles/CreateUser.css';

const CreateUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validateInputs = () => {
        const newErrors = {};

        if (!username.trim()) {
            newErrors.username = "Username is required";
        } else if (username.length < 3) {
            newErrors.username = "Username must be at least 3 characters";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        return newErrors;
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        const newErrors = validateInputs();

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            try {
                await register_user({ username, email, password });
                navigate('/login');
            } catch (err) {
                setErrors({
                    general: err.message || 'Unable to register new user'
                });
            } finally {
                setIsLoading(false);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <>
            <CssBaseline />
            <Stack className="create-user-container" direction="column" justifyContent="space-between">
                <Card className="create-user-card" variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        className="create-user-title"
                    >
                        Create New User
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleCreateUser}
                        noValidate
                        className="create-user-form"
                    >
                        <FormControl>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <TextField
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                autoComplete="username"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                error={!!errors.username}
                                helperText={errors.username}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                autoComplete="email"
                                required
                                fullWidth
                                variant="outlined"
                                error={!!errors.email}
                                helperText={errors.email}
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
                                autoComplete="new-password"
                                required
                                fullWidth
                                variant="outlined"
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                        </FormControl>

                        {errors.general && (
                            <Alert severity="error" variant="outlined">
                                {errors.general}
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Create User'}
                        </Button>
                    </Box>
                </Card>
            </Stack>
        </>
    );
};

export default CreateUser;