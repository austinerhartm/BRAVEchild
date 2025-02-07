import React, { useState, useEffect } from 'react'
import DonationForm from './DonationForm';
import ProgressBar from './ProgressBar'
import { get_dono_amount } from '../services/get_dono_amount';
import '../styles/SponsorDonations.css'

const SponsorDonation = () => {

    //Progress Bar
    /**const [progress, setProgress] = useState(0); 

    useEffect(() => {
        const getProgress = async () => { 
            try {
                const data = await get_dono_amount(); 
                setProgress(data.progress);
            } catch (error) {
                console.error('Failed to fetch progress:', error);
            }
        };

        getProgress(); 

        const intervalId = setInterval(getProgress, 5000); 
        
        return () => clearInterval(intervalId); 
    }, []); 
    **/
    return (
        <div className="donor-container">  
            <DonationForm />
        </div>
    );
};

export default SponsorDonation; 