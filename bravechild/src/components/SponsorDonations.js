import React, { useState, useEffect } from 'react';
import ContributionToggle from './ContributionToggle';
import PresetAmountButtons from './PresetAmountButtons';
import CustomAmountField from './CustomAmountField';
import DonationForm from './DonationForm';
import ProgressBar from './ProgressBar';
import { get_dono_amount } from '../services/get_dono_amount';
import '../styles/SponsorDonations.css';

const SponsorDonation = () => {
    const [isMonthly, setIsMonthly] = useState(true); 
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [customAmount, setCustomAmount] = useState(''); 
    const [errorMessage, setErrorMessage] = useState(''); 

    const presetAmounts = isMonthly ? [5, 10, 25, 50, 100] : [25, 50, 100, 250, 500];
    const MIN_DONATION_AMOUNT = 5; 

    const donationAmount = selectedAmount || customAmount; 

    const handleCustomAmountFocus = () => {
        setSelectedAmount(null); 
    };

    const handleCustomAmountChange = (value) => {
        if (value === '') {
            setCustomAmount('');
            setErrorMessage('');
            return; 
        }
        const amount = parseFloat(value); 
        if (isNaN(amount) || amount < MIN_DONATION_AMOUNT) {
            setCustomAmount(''); 
            setErrorMessage(`Donations must be a minimum of $${MIN_DONATION_AMOUNT}.`);
        } else {
            setCustomAmount(amount);
            setErrorMessage('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const amount = selectedAmount || customAmount; 
        if (!amount) {
            alert('Please select or enter a donation amount.')
            return; 
        }
        console.log(`Donation: $${amount} (${isMonthly ? 'Monthly' : 'One-time'})`);
    }

    return (
        <div className="donor-container">  
            <h1 className="donation-title">Become a BRAVE sponsor!</h1>
            <ContributionToggle isMonthly={isMonthly} onChange={setIsMonthly} />
            <PresetAmountButtons 
                amounts={presetAmounts}
                selectedAmount={selectedAmount}
                onSelect={setSelectedAmount}
            />
            <CustomAmountField 
                value={customAmount} 
                onChange={handleCustomAmountChange} 
                onFocus={handleCustomAmountFocus}
            />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {donationAmount && (
                <div className="donation-summary">
                    Total Donation: <strong>${donationAmount}</strong> {isMonthly ? 'Monthly' : ''}
                </div>
            )}
            <button type="submit" className='submit-button' onClick={handleSubmit}>
                Donate
            </button>
            <DonationForm />
        </div>
    );
};

export default SponsorDonation; 