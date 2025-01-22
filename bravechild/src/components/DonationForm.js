import React, { useState } from 'react';
import '../styles/DonationForm.css'
import cashappImg from '../imgs/cashapp.png'
import venmoImg from '../imgs/venmo.png'
import squareImg from '../imgs/square.png'

const DonationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        billingAddress: '',
        selectedDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // You can add further processing logic here
    };

    const generateDateOptions = () => {
        const options = [];
        const currentDate = new Date();
        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(currentDate.getDate() + i);
            options.push(date.toISOString().split('T')[0]); // Format: YYYY-MM-DD
        }
        return options;
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
                    <label htmlFor="selectedDate">Select a Date:</label>
                    <select
                        id="selectedDate"
                        name="selectedDate"
                        value={formData.selectedDate}
                        onChange={handleChange}
                        required
                        className="form-select"
                    >
                        <option value="">-- Select a Date --</option>
                        {generateDateOptions().map((date) => (
                            <option key={date} value={date}>
                                {date}
                            </option>
                        ))}
                    </select>
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