import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import { get_dono_amount } from '../services/get_dono_amount';

const DonoPage = () => {
    const [progress, setProgress] = useState(0);

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


    return (
        <div className="page">
            <div className="overlay">
                <h1>Donation</h1>
                <ProgressBar value={progress} />
            </div>
        </div>
    );
};

export default DonoPage;