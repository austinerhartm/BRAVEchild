import React, { useState } from 'react';
import '../../styles/CustomAmountField.css';

const CustomAmountField = ({ value, onChange, onFocus }) => {
    return (
        <div className="custom-amount">
            <input
                type="number"
                placeholder="Other Amount"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={onFocus}
                min="1"
            />
        </div>
    );
};

export default CustomAmountField;