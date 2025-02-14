import React from 'react'; 
import '../styles/PresetAmountButtons.css'; 

const PresetAmountButtons = ({ amounts, selectedAmount, onSelect }) => {
    return (
        <div className="preset-amounts">
            {amounts.map((amount, index) => (
                <button
                    key={index}
                    className={`amount-button ${selectedAmount === amount ? 'selected' : ''}`}
                    onClick={() => onSelect(amount)}
                >
                    ${amount}
                </button>
            ))}
        </div>
    )
}

export default PresetAmountButtons; 