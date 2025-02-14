import React from 'react';
import '../styles/ContributionToggle.css';

const ContributionToggle = ({ isMonthly, onChange }) => {
    return (
        <div className="toggle-container">
            <button
                className={`toggle-option ${isMonthly ? 'active' : ''}`}
                onClick={() => onChange(true)}
            >
                Monthly
            </button>
            <button
                className={`toggle-option ${!isMonthly ? 'active' : ''}`}
                onClick={() => onChange(false)}
            >
                One-Time
            </button>
        </div>
    );
};

export default ContributionToggle;