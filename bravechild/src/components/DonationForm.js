import React, {useState} from 'react';
import { submit_sponsor } from '../services/submit_sponsor';
import '../styles/DonationForm.css'

const DonationForm = () => {
    
    const [fname, setFname] = useState(''); 
    const [lname, setLname] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState(''); 


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const sponsorData = {
            fname, 
            lname,
            email,
            amount
        };

        try {
            const result = await submit_sponsor(sponsorData); 
            setMessage('Thank you for your generous donation!'); 
            setFname(''); 
            setLname('');
            setEmail(''); 
            setAmount(0);
        } catch (error) {
            console.error(error);
            setMessage('Donation failed. Please try again.')
        }
    }; 

    return (
        <div className="donation-container">
            <h1 className="donation-title">Become a BRAVE sponsor!</h1>
            <form onSubmit={handleSubmit} className="donation-form">
                <div className="form-group">
                    <label htmlFor="fname">First Name</label>
                    <input
                        type="text"
                        id="fname"
                        placeholder="First Name"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input
                        type="text"
                        id="lname"
                        placeholder="Last Name"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount ($)</label>
                    <input
                        type="number"
                        id="amount"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="donate-button">Donate</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default DonationForm;
