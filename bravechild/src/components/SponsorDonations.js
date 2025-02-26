import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import ContributionToggle from './sponsor/ContributionToggle';
import PresetAmountButtons from './sponsor/PresetAmountButtons';
import CustomAmountField from './sponsor/CustomAmountField';
import DonationForm from './sponsor/DonationForm';
import { submit_sponsor } from '../services/submit_sponsor';
import '../styles/SponsorDonations.css';

const SponsorDonation = ({ onSubmit: externalSubmit }) => {
    const location = useLocation(); 
    const [isTyping, setIsTyping] = useState(false)
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('')
    const [formData, setFormData] = useState({
        isMonthly: true,
        selectedAmount: null,
        customAmount: '',
        fName: '',
        lName: '',
        email: ''
    });

    const MIN_DONATION_AMOUNT = 5; 

    useEffect(() => {
        if (location.state) {
            setFormData(location.state); 
        }
    }, [location.state]);

    const validateForm = () => {
        const newErrors = {}; 
        if (!formData.fName) newErrors.firstName = 'First name is required';
        if (!formData.lName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        const hasValidAmount = formData.selectedAmount || 
            (formData.customAmount && parseFloat(formData.customAmount) >= MIN_DONATION_AMOUNT);
        
        if (!hasValidAmount) {
            newErrors.amount = 'Please select or enter a dontaion amount';
        }

        setErrors(newErrors); 
        return Object.keys(newErrors).length === 0; 
    };

    const handleCustomAmountFocus = () => {
        setFormData(prev => ({
            ...prev,
            selectedAmount: null
        }));
        setIsTyping(true); 
    };

    const handleCustomAmountBlur = () => {
        setIsTyping(false); 
        validateAmount(formData.customAmount); 
    }

    const validateAmount = (value) => {
        if (value === '') {
            setFormData(prev => ({
                ...prev,
                customAmount: ''
            }));
            setErrorMessage('');
            return true; 
        }

        const amount = parseFloat(value); 
        if (!isTyping && (isNaN(amount) || amount < MIN_DONATION_AMOUNT)) {
            setErrorMessage(`Donations must be a minimum of $${MIN_DONATION_AMOUNT}.`);
            return false; 
        }
        
        setErrorMessage('')
        return true; 
    }

    const handleCustomAmountChange = (value) => {
        setFormData(prev => ({
            ...prev,
            customAmount: value,
            selectedAmount: null
        }));

        if (!isTyping) {
            validateAmount(value); 
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 

        if (externalSubmit) {
            externalSubmit(e, formData);

        } else {
            if (validateForm()) {
                submit_sponsor(formData);
                console.log('Form submitted:', JSON.stringify(formData, null, 2));
                setErrorMessage('')

            } else {
            const missingFields = Object.keys(errors).length > 0;
                if (missingFields) {
                setErrorMessage('Please fill in all required fields before submitting.');
                }
            }
        }
        
        
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target; 
        setFormData(prev => ({
            ...prev, 
            [name]: value
        })); 

        if (errors[name]) {
            setErrors(prev => ({...prev, [name]: ''})); 
        }
    };

    return (
        <div className="donor-container">  
            <h1 className="donation-title">Become a BRAVE sponsor!</h1>
            <ContributionToggle 
                isMonthly={formData.isMonthly} 
                onChange={(value) => setFormData(prev => ({ ...prev, isMonthly: value }))} 
            />
            <PresetAmountButtons 
                amounts={formData.isMonthly ? [5, 10, 25, 50, 100] : [25, 50, 100, 250, 500]}
                selectedAmount={formData.selectedAmount}
                onSelect={(amount) => setFormData(prev => ({
                    ...prev,
                    selectedAmount: amount,
                    customAmount: ''
                }))}
            />
            <CustomAmountField 
                value={formData.customAmount} 
                onChange={(value) => handleCustomAmountChange(value)} 
                onFocus={handleCustomAmountFocus}
                onBlur={handleCustomAmountBlur}
            />

            {errors.amount && <div className="error-message">{errors.amount}</div>}

            <DonationForm 
                formData={formData}
                onChange={handleInputChange}
                errors={errors}
            />
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <button type="submit" className='submit-button' onClick={handleSubmit}>
                Donate
            </button>
        </div>
    );
};

export default SponsorDonation; 