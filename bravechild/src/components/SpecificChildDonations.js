import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    Paper,
    Grid,
    Button,
    Card,
    CardContent,
    Divider,
    CircularProgress,
    Alert
} from '@mui/material';
import {
    Home as HomeIcon,
    LocalAtm as LocalAtmIcon,
    Favorite as FavoriteIcon
} from '@mui/icons-material';
import { get_tiles } from '../services/get_tiles';
import '../styles/ChildDonation.css';

const SpecificChildDonations = ({
    totalTiles = 35
}) => {
    const { linkId } = useParams();
    const navigate = useNavigate();
    const [selectedTiles, setSelectedTiles] = useState([]);
    const [disabledTiles, setDisabledTiles] = useState([]);
    const [totalSum, setTotalSum] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [childName, setChildName] = useState('');

    useEffect(() => {
        const fetchUserSelections = async () => {
            setIsLoading(true);
            try {
                const existingSelections = await get_tiles(linkId);
                setDisabledTiles(existingSelections);

                setChildName("Child");

                setError(null);
            } catch (error) {
                console.error('Error fetching tiles:', error);
                setError('Unable to load donation information. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        if (linkId) {
            fetchUserSelections();
        }
    }, [linkId]);

    const handleTileClick = async (tileNumber) => {
        if (disabledTiles.includes(tileNumber)) return;

        if (selectedTiles.includes(tileNumber)) {
            const newSelectedTiles = selectedTiles.filter(tile => tile !== tileNumber);
            setSelectedTiles(newSelectedTiles);
            setTotalSum(newSelectedTiles.reduce((sum, tile) => sum + tile, 0));
        } else {
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
                linkId: linkId
            }
        });
    };

    if (isLoading) {
        return (
            <Box className="loading-container">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" className="child-donation-container">
                <Paper elevation={3} className="child-donation-paper">
                    <Alert severity="error" className="error-alert">
                        {error}
                    </Alert>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<HomeIcon />}
                        onClick={() => window.location.href = '/'}
                        className="home-button"
                    >
                        Return to Homepage
                    </Button>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" className="child-donation-container">
            <Paper elevation={3} className="child-donation-paper">
                <Box className="donation-header">
                    <Typography variant="h4" component="h1" color="primary" className="donation-title">
                        Number Fundraiser for {childName}
                    </Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<HomeIcon />}
                        onClick={() => window.location.href = '/'}
                        className="home-button"
                    >
                        Return Home
                    </Button>
                </Box>

                <Typography variant="body1" className="donation-description">
                    Help support our cause by selecting one or more numbers below. Each number represents a donation amount in dollars. Thank you for your support!
                </Typography>

                <Card className="donation-card">
                    <CardContent>
                        <Box className="selection-info">
                            <Typography variant="h6">Your Selection</Typography>
                            <Divider className="info-divider" />
                            <Grid container spacing={2} className="selection-details">
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="body2">Selected Numbers:</Typography>
                                    <Typography variant="body1" fontWeight="bold">
                                        {selectedTiles.length > 0 ? selectedTiles.join(', ') : 'None'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="body2">Total Donation:</Typography>
                                    <Typography variant="h5" color="primary" fontWeight="bold">
                                        ${totalSum}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>

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

                <Box className="donation-action">
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className="donate-button"
                        onClick={handleDonateClick}
                        disabled={selectedTiles.length === 0}
                        startIcon={<LocalAtmIcon />}
                        endIcon={<FavoriteIcon />}
                    >
                        Proceed to Donate ${totalSum}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default SpecificChildDonations;
