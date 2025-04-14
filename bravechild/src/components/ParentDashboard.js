import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api, { handleApiError } from '../services/api.service';
import {
    Box,
    Typography,
    Container,
    Paper,
    Button,
    Card,
    CardContent,
    CardHeader,
    Tabs,
    Tab,
    CircularProgress,
} from '@mui/material';
import { Home as HomeIcon, Refresh as RefreshIcon } from '@mui/icons-material';


const ParentDashboard = () => {
    const [tabValue, setTabValue] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [parent, setParent] = useState(null);
    const [child, setChild] = useState(null);
    const [error, setError] = useState(null);
    const { parentId } = useParams();

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        const fetchParentAndChildData = async () => {
            try {
                setIsLoading(true);
                console.log(`parentid: ${parentId}`);
                const response = await api.get(`/parent-dashboard/${parentId}`);
                if (response.data.success) {
                    setParent(response.data.parent);
                    setChild(response.data.child);
                } else {
                    setError(response.data.message || 'Failed to fetch data');
                }
            } catch (err) {
                console.error('Error fetching parent and child data:', err);
                setError('Error fetching data');
            } finally {
                setIsLoading(false);
            }
        };
        if (parentId) {
            fetchParentAndChildData();
        }
    }, [parentId]);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">
                <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                    <Box className="parent-dashboard-header">
                        <Typography
                            variant="h4"
                            component="h1"
                            className="parent-dashboard-title"
                            color="primary"
                        >
                            Welcome, {parent.firstName} {parent.lastName}!
                        </Typography>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<HomeIcon />}
                            onClick={() => window.location.href = '/'}
                        >
                            Return to Homepage
                        </Button>
                    </Box>

                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        sx={{ mb: 3 }}
                    >
                        <Tab label="Overview" />
                        <Tab label="Child Details" />
                    </Tabs>

                    {/* Overview Tab */}
                    {tabValue === 0 && (
                        <Card sx={{ mb: 4 }}>
                            <CardHeader
                                title="Overview"
                                sx={{
                                    bgcolor: 'success.main',
                                    color: 'success.contrastText',
                                }}
                                action={
                                    <Button
                                        startIcon={<RefreshIcon />}
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                    >
                                        Refresh
                                    </Button>
                                }
                            />
                            <CardContent>
                                <Typography variant="body1">
                                    Overview content will go here.
                                </Typography>
                            </CardContent>
                        </Card>
                    )}

                    {/* Child Details Tab */}
                    {tabValue === 1 && (
                        <Card>
                            <CardHeader
                                title="Child Details"
                                sx={{
                                    bgcolor: 'warning.main',
                                    color: 'warning.contrastText',
                                }}
                            />
                            <CardContent>
                                {child ? (
                                    <>
                                        <Typography variant="h6">Child Name: {child.child_name}</Typography>
                                        <Typography variant="body1">Total Donations: ${child.total_donations}</Typography>
                                        <Typography variant="body1">Program Start Date: {new Date(child.began_program_at).toLocaleDateString()}</Typography>
                                    </>
                                ) : (
                                    <Typography variant="body1">No child linked to this parent.</Typography>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default ParentDashboard;