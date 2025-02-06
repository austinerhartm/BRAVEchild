import React, { useState } from 'react';
import axios from 'axios'

const DonationForm = () => {
    const [fname, setFname] = useState(''); 
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState(''); 
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState(''); 


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(ENDPT, {
                fname,
                lname, 
                email,
                amount,
            }); 
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
        <div>
            <h1>Become a BRAVE Sponsor!</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <button type="submit">Donate</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};
   
export default DonationForm;