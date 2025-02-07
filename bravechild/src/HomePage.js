import React, { useState } from 'react';
import './HomePage.css';

const HomePage = () => {

    return (
        <div className="page-container">
            <div className="navbar">
                <div className="navbar-title">
                    <div className="navbar-logo">
                        <img src="/BRAVEpic.png" alt="logo" />
                    </div>
                    <h1>B.R.A.V.E Child Inc</h1>
                </div>
                <div className="navbar-list">
                    <ul>
                        <li><a href="/login">Login</a></li>
                        <div className="navbar-divider-vertical"></div>
                        <li><a href="/create-user">Create User</a></li>
                        <div className="navbar-divider-vertical"></div>
                        <li><a href="/sponsor-donations">Donate Here</a></li>
                    </ul>
                </div>
            </div>

            <div className="whoweare-container">
                <h2>Welcome to BRAVEChild</h2>
                <p><span style={{fontWeight: 'bold' }}>Building and Restoring Abilities Via Equine </span> 
                   is a team of therapists and parents working together to raise funds <br /> 
                   to assist with covering the cost of the equine service fee</p>
            </div>

            <div className="hippotherapy-container">
                <div className="hippotherapy-container-img">
                    <img src="/EquineTherapyPic.jpg" alt="hippotherapypic" />
                </div>
                <div className="hippotherapy-text-content">
                    <h2>How Hippotherapy Helps</h2>
                    <p>Hippotherapy allows the child to work on balance, core strength,
                        endurance, motor planning, attention to task, and fine 
                        motor skills using the horse's movement to stimulate the overall body.
                    </p>
                </div>
            </div>

            <div className="equinetherapy-container">
                <div className="equinetherapy-container-img">
                    <img src="/EquineTherapyPic3.jpg" alt="equinetherapypic" />
                </div>
                <div className="equinetherapy-text-content">
                    <h2>Equine Therapy Service</h2>
                    <p>Equine therapy is a type of therapy that involves activities with horses
                    and other equines to promote physical, occupational, and emotional growth
                    in persons with disabilities.
                    </p>
                </div>
            </div>

            <div className="how-can-you-help-container">
                <div className="how-can-you-help-sponsor">
                    <h2>Become A Sponsor</h2>
                    <button><a href="/sponsor-donations">Donate Here</a></button>
                </div>
                <div className="navbar-divider-vertical-how-help"></div>
                <div className="how-can-you-help-donate">
                    <h2>Make a Donation</h2>
                    <button><a href="/sponsor-donations">Donate Here</a></button>
                </div>
                <div className="navbar-divider-vertical-how-help"></div>
                <div className="how-can-you-help-facebook">
                    <h2>Join us on Facebook</h2>
                    <div className="how-can-you-help-facebook-img">
                        <img src="/BRAVEFacebookQR.jpg" alt="facebookQR" />
                    </div>
                </div>
            </div>

            <div className="brave-501c-container">
                <div className="brave-501c-container-text">
                    <p>B.R.A.V.E. Child, Inc is a (IRC) Section 501c (3) organization.
                    </p>
                </div>
            </div>

            <div className="footer">
                <div className="footer-section">
                    <h2>Contact Us</h2>
                    <p>Email: BRAVEbfchild@gmail.com</p>
                    <p>Phone: (318) 840-7091</p>
                    <p>Address: 66 Mengle Road Rayville, LA 71269</p>
                </div>

                <div className="footer-section">
                    <h2>Quick Links</h2>
                    <p><a href="#home">Home</a></p>
                    <p><a href="#about">About Us</a></p>
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
        </div>
    );
};

export default HomePage;

