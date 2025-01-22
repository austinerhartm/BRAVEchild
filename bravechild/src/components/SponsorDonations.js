import React from 'react'
import DonationForm from './DonationForm';
import '../styles/SponsorDonations.css'

const SponsorDonation = () => {
     
    return (
        <div className="donor-container">
            <h1 className="title">Sponsor Donation</h1>
            <DonationForm />
        </div>
    );
};

export default SponsorDonation; 