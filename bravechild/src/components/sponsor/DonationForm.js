import React, {useState} from 'react';
import { submit_sponsor } from '../../services/submit_sponsor';
import '../../styles/DonationForm.css'

const DonationForm = ({ formData, onChange, errors}) => {
    return (
        <div className="donation-container">
            <div className="donation-form">
                <div className="form-group">
                    <label htmlFor="fName">First Name</label>
                    <input
                        type="text"
                        id="fName"
                        name="fName"
                        placeholder="First Name"
                        value={formData.fName}
                        onChange={onChange}
                        required
                    />
                    {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="lName">Last Name</label>
                    <input
                        type="text"
                        id="lName"
                        name="lName"
                        placeholder="Last Name"
                        value={formData.lName}
                        onChange={onChange}
                        required
                    />
                    {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={onChange}
                        required
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
            </div>
        </div>
    );
};

export default DonationForm;
