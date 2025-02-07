import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import '../styles/DonationForm.css';
import cashappImg from '../imgs/cashapp.png';
import venmoImg from '../imgs/venmo.png';
import squareImg from '../imgs/square.png';
import { save_tiles } from '../services/save_tiles';

const DonationForm = () => {
    const location = useLocation();
    const { selectedTiles, totalSum, childId } = location.state || {};

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        billingAddress: '',
        donationAmount: !totalSum ? '' : totalSum.toString()
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        try {
            await save_tiles(childId, selectedTiles, formData.firstName + ' ' + formData.lastName);
        } catch (error) {
            console.error('Error fetching tiles:', error);
        }
    };


    return (
        <>

            <form onSubmit={handleSubmit} className="form-container">
                <h2 className="form-title">User Information Form</h2>

                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="billingAddress">Billing Address:</label>
                    <input
                        type="text"
                        id="billingAddress"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="donationAmount">Amount:</label>
                    <input
                        type="text"
                        id="donationAmount"
                        name="donationAmount"
                        value={formData.donationAmount}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <button type="submit" className="form-button">
                    Submit
                </button>
            </form>

            <div className="payment-options">
                <img src={cashappImg} alt="CashApp Placeholder" className="payment-image" />
                <img src={venmoImg} alt="Venmo Placeholder" className="payment-image" />
                <img src={squareImg} alt="Square Placeholder" className="payment-image" />
            </div>
        </>
    );
};

export default DonationForm;