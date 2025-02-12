<<<<<<< Updated upstream
=======
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ChildDonation.css';
import { get_tiles } from '../services/get_tiles';

const SpecificChildDonations = ({
    childId = 1,
    totalTiles = 35,
    maxAllowedTiles = 10
}) => {
    const navigate = useNavigate();
    const [selectedTiles, setSelectedTiles] = useState([]);
    const [disabledTiles, setDisabledTiles] = useState([]);
    const [totalSum, setTotalSum] = useState(0);

    useEffect(() => {
        const fetchUserSelections = async () => {
            try {
                const existingSelections = await get_tiles(childId);
                setDisabledTiles(existingSelections);
            } catch (error) {
                console.error('Error fetching tiles:', error);
            }
        };

        if (childId) {
            fetchUserSelections();
        }
    }, [childId]);

    const handleTileClick = async (tileNumber) => {
        if (disabledTiles.includes(tileNumber)) return;
        if (selectedTiles.includes(tileNumber)) {
            const newSelectedTiles = selectedTiles.filter(tile => tile !== tileNumber);
            setSelectedTiles(newSelectedTiles);
            setTotalSum(newSelectedTiles.reduce((sum, tile) => sum + tile, 0));
        } else {
            if (selectedTiles.length >= maxAllowedTiles) return;
            const newSelectedTiles = [...selectedTiles, tileNumber];
            setSelectedTiles(newSelectedTiles);
            setTotalSum(newSelectedTiles.reduce((sum, tile) => sum + tile, 0));
        }
    };

    const handleDonateClick = () => {
        navigate('/child-donations/numbers-donation-form', {
            state: {
                selectedTiles: selectedTiles,
                totalSum: totalSum,
                childId: childId
            }
        });
    };

    return (
        <div className="calendar-container">
            <div className="container">
                <h1 className="calendar-title">Number Fundraiser</h1>
                <div className="calendar-grid">
                    {Array.from({ length: totalTiles }, (_, index) => {
                        const tileNumber = index + 1;
                        const isSelected = selectedTiles.includes(tileNumber);
                        const isDisabled = disabledTiles.includes(tileNumber);
                        return (
                            <div
                                key={tileNumber}
                                onClick={() => handleTileClick(tileNumber)}
                                className={`calendar-tile ${isSelected ? 'calendar-tile-selected' : ''} ${isDisabled ? 'calendar-tile-disabled' : ''}`}
                            >
                                {tileNumber}
                            </div>
                        );
                    })}
                </div>
                <p></p>
                <div className="calendar-summary">
                    Selected Tiles: {selectedTiles.join(', ')}
                    <br />
                    Total Sum: {totalSum}
                    <br />
                    Remaining Slots: {maxAllowedTiles - selectedTiles.length}
                </div>
                <p></p>
                <div className="donate-div">
                    <button
                        className='donate-button'
                        onClick={handleDonateClick}
                        disabled={selectedTiles.length === 0}
                    >
                        Donate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SpecificChildDonations;
>>>>>>> Stashed changes
