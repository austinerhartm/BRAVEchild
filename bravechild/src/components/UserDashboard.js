import React, { useEffect, useState } from 'react';
import { fetch_user } from '../services/user.js';

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [totalDonations, setTotalDonations] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                setLoading(true);
                const data = await fetch_user();
                console.log('Received data:', data);

                if (data && data.success === true) {
                    setUser(data.user || null);
                    const donationAmount = parseFloat(data.totalDonations) || 0;
                    setTotalDonations(donationAmount);
                    setError(null);
                } else {
                    setError(data?.message || 'Failed to load user data');
                    setUser(null);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message || 'Error loading user data');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getUserData();
    }, []);

    const formatDonation = (amount) => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount)) {
            return '0.00';
        }
        return numAmount.toFixed(2);
    };

    if (loading) {
        return (
            <div className="dashboard-container">
                <p>Loading user data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-container">
                <p className="error-message">Error: {error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="retry-button"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="dashboard-container">
                <p>No user data available. Please try logging in again.</p>
                <button
                    onClick={() => window.location.href = '/login'}
                    className="login-button"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <h2>Welcome, {user.username}!</h2>
            <div className="user-info">
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="donation-info">
                <h3>Your Total Donations</h3>
                <p>${formatDonation(totalDonations)}</p>
            </div>
        </div>
    );
};

export default UserDashboard;