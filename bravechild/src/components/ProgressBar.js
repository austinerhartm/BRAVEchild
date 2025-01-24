import React from 'react';
import './ProgressBar.css';

function ProgressBar({ value }) {
    return (
        <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${value}%` }}>
                {`${value}%`}
            </div>
        </div>
    );
}

export default ProgressBar;
