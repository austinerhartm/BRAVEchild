import React from 'react'
import UserInfoForm from './UserInfoForm';
import BoxContainer from './BoxContainer';

const SponsorDonation = () => {
     
    return (
        <div className="donor-container" 
        style="font-family: Arial, sans-serif; 
                text-align: center; padding: 20px"
        >
            <h1>Sponsor Donation</h1>
            <UserInfoForm />
            <BoxContainer />
        </div>
    );
};

export default SponsorDonation; 