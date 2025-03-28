import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Box,
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    Divider,
    Alert,
    CircularProgress,
    FormControl,
    FormLabel
} from '@mui/material';
import {
    Home as HomeIcon,
    Send as SendIcon,
    CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { save_tiles } from '../services/save_tiles';

import '../styles/NumbersDonationForm.css';

import cashappImg from '../imgs/cashapp.png';
import venmoImg from '../imgs/venmo.png';
import squareImg from '../imgs/square.png';

const NumbersDonationForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedTiles, totalSum, linkId } = location.state || {};

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        billingAddress: '',
        donationAmount: !totalSum ? '' : totalSum.toString()
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const validateForm = () => {
        const errors = {};

        if (!formData.firstName.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
        if (!formData.email.trim()) errors.email = 'Email is required';
        if (!formData.address.trim()) errors.address = 'Address is required';
        if (!formData.billingAddress.trim()) errors.billingAddress = 'Billing address is required';

        return Object.keys(errors).length === 0 ? null : errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const errors = validateForm();
        if (errors) {
            setError('Please fill out all required fields correctly.');
            return;
        }

        setIsSubmitting(true);

        try {
            await save_tiles(linkId, selectedTiles, formData.firstName + ' ' + formData.lastName, formData.donationAmount);

            setSuccess(true);
            setTimeout(() => {
                navigate('/', { replace: true });
            }, 3000);
        } catch (error) {
            console.error('Error processing donation:', error);
            if (error.response?.data?.takenTiles) {
                setError(`Some tiles are no longer available: ${error.response.data.takenTiles.join(', ')}`);
            } else {
                setError(error.message || 'Error processing donation. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!selectedTiles || !linkId) {
        return (
            <Container maxWidth="md" className="numbers-donation-container">
                <Paper elevation={3} className="numbers-donation-paper">
                    <Alert severity="warning">
                        Please select donation amounts before proceeding to checkout.
                    </Alert>
                    <Box mt={2}>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<HomeIcon />}
                            onClick={() => navigate('/')}
                        >
                            Return to Homepage
                        </Button>
                    </Box>
                </Paper>
            </Container>
        );
    }

    if (success) {
        return (
            <Container maxWidth="md" className="numbers-donation-container">
                <Paper elevation={3} className="numbers-donation-paper">
                    <Box textAlign="center" p={3}>
                        <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                        <Typography variant="h4" gutterBottom>Thank You!</Typography>
                        <Typography variant="body1">
                            Your donation has been processed successfully. You will be redirected to the homepage shortly.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" className="numbers-donation-container">
            <Paper elevation={3} className="numbers-donation-paper">
                <Box className="donation-header">
                    <Typography variant="h4" component="h1" color="primary" className="donation-title">
                        Complete Your Donation
                    </Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<HomeIcon />}
                        onClick={() => navigate('/')}
                        className="home-button"
                    >
                        Return Home
                    </Button>
                </Box>

                <Card className="donation-summary-card">
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Donation Summary</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2">Selected Numbers:</Typography>
                                <Typography variant="body1" fontWeight="bold">
                                    {selectedTiles.join(', ')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2">Total Donation Amount:</Typography>
                                <Typography variant="h5" color="primary" fontWeight="bold">
                                    ${totalSum}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {error && (
                    <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="donation-form">
                    <Typography variant="h6" className="form-section-title">
                        Personal Information
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="firstName">First Name</FormLabel>
                                <TextField
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                                <TextField
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <TextField
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Typography variant="h6" className="form-section-title">
                        Address Information
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="address">Address</FormLabel>
                                <TextField
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="billingAddress">Billing Address</FormLabel>
                                <TextField
                                    id="billingAddress"
                                    name="billingAddress"
                                    value={formData.billingAddress}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="donationAmount">Donation Amount ($)</FormLabel>
                                <TextField
                                    id="donationAmount"
                                    name="donationAmount"
                                    type="text"
                                    value={formData.donationAmount}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        readOnly: true
                                    }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Typography variant="h6" className="form-section-title">
                        Payment Methods
                    </Typography>

                    <div className="payment-options">
                        <img src={cashappImg} alt="CashApp" className="payment-image" />
                        <img src={venmoImg} alt="Venmo" className="payment-image" />
                        <img src={squareImg} alt="Square" className="payment-image" />
                    </div>

                    <Box className="form-actions">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={isSubmitting}
                            startIcon={isSubmitting ? <CircularProgress size={20} /> : <SendIcon />}
                        >
                            {isSubmitting ? 'Processing...' : 'Complete Donation'}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default NumbersDonationForm;