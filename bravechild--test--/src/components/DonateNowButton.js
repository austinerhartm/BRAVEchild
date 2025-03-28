import React from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import '../styles/DonateNowButton.css'; 

const DonateNowButton = () => {
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate('/sponsor-donations'); 
    };

    return (
        <button className="donate-now-button" onClick={handleClick}>
            Donate Now
        </button>
    );
};

export default DonateNowButton; 