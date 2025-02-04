import React, { useEffect, useState } from 'react';
import { fetch_user } from '../services/user.js';

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [totalDonations, setTotalDonations] = useState(0);

    useEffect(() => {
        // Define an async function inside useEffect
        const getUserData = async () => {
            try {
                const userData = await fetch_user();
                if (userData && userData.success) {
                    setUser(userData.user);
                    setTotalDonations(userData.totalDonations || 0);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        getUserData();
    }, []);

    if (!user) {
        return <div className="dashboard-container">Loading user data...</div>;
    }

    return (
        <div className="dashboard-container">
            <h2>Welcome, {user.username}!</h2>
            <div className="user-info">
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="donation-info">
                <h3>Your Total Donations</h3>
                <p>${totalDonations.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default UserDashboard;
