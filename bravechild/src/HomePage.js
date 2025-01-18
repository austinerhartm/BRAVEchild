import React from 'react';
import './HomePage.css';

const HomePage = () => {

    return (
         <div className="navbar">
            <div className="navbar-title">
                <div className="navbar-logo">
                    <img src="https://via.placeholder.com/150" alt="logo" />
                </div>
                <h1>BraveChild</h1>
            </div>
            <div className="navbar-list">
                <ul>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/create-user">Create User</a></li>
                    <li><a href="/sponsor-donations">Donate Here</a></li>
                </ul>
            </div>
            <div className="homepage-content">
                <h2>Welcome to BraveChild!</h2>
                <p>Bravechild is working towards ... input story from brochure</p>
            </div>
         </div>
    );
};

export default HomePage;