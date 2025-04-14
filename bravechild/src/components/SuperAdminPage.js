import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Paper,
    Grid,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    CircularProgress,
    Alert,
    Stack,
    Tabs,
    Tab,
    Tooltip,
    InputAdornment,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import {
    ContentCopy as ContentCopyIcon,
    Add as AddIcon,
    Delete as DeleteIcon,
    Refresh as RefreshIcon,
    Download as DownloadIcon,
    Home as HomeIcon,
    Email as EmailIcon,
    People as PeopleIcon
} from '@mui/icons-material';

import { add_donee } from '../services/add_donee';
import { fetch_donees } from '../services/fetch_donees';
import { fetch_donos } from '../services/fetch_donos';
import { remove_donee } from '../services/remove_donee';
import EmailManagement from './EmailManagement';
import ParentManagement from './ParentManagement';

const SuperAdminPage = () => {
    const [firstname, setFirst] = useState('');
    const [lastname, setLast] = useState('');
    const [donations, setDonations] = useState([]);
    const [donees, setDonees] = useState([]);
    const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
    const [endDate, setEndDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const [doneesError, setDoneesError] = useState(null);
    const [donationsError, setDonationsError] = useState(null);
    const [error, setError] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [doneeToDelete, setDoneeToDelete] = useState(null);
    const [copySuccess, setCopySuccess] = useState('');
    
    function formatDate(date) {
        if (!date) return '';
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        return new Date(date).toLocaleDateString('en-US', options);
    }

    function formatDateForInput(date) {
        if (!date) return '';
        return date.toISOString().split('T')[0];
    }

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopySuccess(text);
            setTimeout(() => setCopySuccess(''), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        fetchData();
    }, [startDate, endDate]);

    const fetchData = async () => {
        setIsLoading(true);
        setDoneesError(null);
        setDonationsError(null);

        try {
            const doneesData = await fetch_donees();
            if (doneesData?.success) {
                setDonees(doneesData.data.donees || []);
            } else {
                setDoneesError(doneesData?.message || 'Failed to fetch donees');
            }
        } catch (error) {
            setDoneesError('Unable to load donee information');
        }

        try {
            const donoData = await fetch_donos(startDate, endDate);
            if (donoData?.success) {
                setDonations(donoData.data.donations || []);
            } else {
                setDonationsError(donoData?.message || 'Failed to fetch donations');
            }
        } catch (error) {
            setDonationsError('Unable to load donation information');
        }

        setIsLoading(false);
    };

    const handleAddDonee = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            const fullName = `${firstname} ${lastname}`.trim();
            if (!fullName) {
                setError('Name is required');
                return;
            }

            const result = await add_donee(fullName);

            if (result?.success) {
                setFirst('');
                setLast('');
                fetchData();
            } else {
                setError(result?.message || 'Failed to add donee');
            }
        } catch (err) {
            console.error('Error adding donee:', err);
            setError('Failed to add donee');
        }
    };

    const confirmRemoveDonee = (doneeId) => {
        setDoneeToDelete(doneeId);
        setDialogOpen(true);
    };

    const handleRemoveDonee = async () => {
        try {
            setError(null);
            const result = await remove_donee(doneeToDelete);

            if (result?.success) {
                fetchData();
            } else {
                setError(result?.message || 'Failed to remove donee');
            }
        } catch (err) {
            console.error('Error removing donee:', err);
            setError('Failed to remove donee');
        }
        setDialogOpen(false);
        setDoneeToDelete(null);
    };

    const calculateTotalDonations = () => {
        if (!donations || !Array.isArray(donations)) return 0;
        return donations.reduce((sum, donation) => sum + parseFloat(donation.amount || 0), 0).toFixed(2);
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">
                <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                    <Box className="admin-dashboard-header">
                        <Typography
                            variant="h4"
                            component="h1"
                            className="admin-dashboard-title"
                            color="primary"
                        >
                            Admin Dashboard
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
                        <Tab label="Donations" />
                        <Tab label="Manage Donees" />
                        <Tab label="Email Management" icon={<EmailIcon />} iconPosition="start" />
                        <Tab label="Parent Management" icon={<PeopleIcon />} iconPosition="start" />
                    </Tabs>

                    {/* Donations Tab */}
                    {tabValue === 0 && (
                        <>
                            <Card sx={{ mb: 4 }}>
                                <CardHeader
                                    title="Donation Overview"
                                    sx={{
                                        bgcolor: 'success.main',
                                        color: 'success.contrastText'
                                    }}
                                    action={
                                        <Button
                                            startIcon={<RefreshIcon />}
                                            onClick={fetchData}
                                            variant="contained"
                                            color="secondary"
                                            size="small"
                                        >
                                            Refresh
                                        </Button>
                                    }
                                />
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <Stack direction="row" spacing={2}>
                                                <TextField
                                                    label="Start Date"
                                                    type="date"
                                                    value={formatDateForInput(startDate)}
                                                    onChange={(e) => setStartDate(new Date(e.target.value))}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    fullWidth
                                                />
                                                <TextField
                                                    label="End Date"
                                                    type="date"
                                                    value={formatDateForInput(endDate)}
                                                    onChange={(e) => setEndDate(new Date(e.target.value))}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    fullWidth
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Card variant="outlined" sx={{ height: '100%' }}>
                                                <CardContent>
                                                    <Typography variant="h6" gutterBottom>Total Donations</Typography>
                                                    <Typography variant="h4" component="div" color="primary">
                                                        ${calculateTotalDonations()}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {startDate && endDate ?
                                                            `From ${formatDate(startDate)} to ${formatDate(endDate)}` :
                                                            'All time'}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader
                                    title="Donation History"
                                    sx={{
                                        bgcolor: 'success.main',
                                        color: 'success.contrastText'
                                    }}
                                    action={
                                        <Button
                                            startIcon={<DownloadIcon />}
                                            variant="outlined"
                                            color="secondary"
                                            size="small"
                                            disabled
                                        >
                                            Export
                                        </Button>
                                    }
                                />
                                <CardContent>
                                    {donationsError ? (
                                        <Alert severity="error" sx={{ mb: 2 }}>
                                            {donationsError}
                                            <Button
                                                size="small"
                                                sx={{ ml: 2 }}
                                                onClick={fetchData}
                                            >
                                                Retry
                                            </Button>
                                        </Alert>
                                    ) : (
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Amount</TableCell>
                                                        <TableCell>Date</TableCell>
                                                        <TableCell>For</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {Array.isArray(donations) && donations.length > 0 ? (
                                                        donations.map((dono, index) => (
                                                            <TableRow key={dono.dono_id || index} hover>
                                                                <TableCell>${parseFloat(dono.amount).toFixed(2)}</TableCell>
                                                                <TableCell>{formatDate(dono.donation_time)}</TableCell>
                                                                <TableCell>{dono.for_child || 'General'}</TableCell>
                                                            </TableRow>
                                                        ))
                                                    ) : (
                                                        <TableRow>
                                                            <TableCell colSpan={3} align="center">
                                                                No donations found in this date range
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    )}
                                </CardContent>
                            </Card>
                        </>
                    )}

                    {/* Manage Donees Tab */}
                    {tabValue === 1 && (
                        <>
                            <Card sx={{ mb: 4 }}>
                                <CardHeader
                                    title="Add New Donee"
                                    sx={{
                                        bgcolor: 'warning.main',
                                        color: 'warning.contrastText'
                                    }}
                                />
                                <CardContent>
                                    {error && (
                                        <Alert severity="error" sx={{ mb: 2 }}>
                                            {error}
                                        </Alert>
                                    )}
                                    <form onSubmit={handleAddDonee}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={5}>
                                                <TextField
                                                    label="First Name"
                                                    fullWidth
                                                    value={firstname}
                                                    onChange={(e) => setFirst(e.target.value)}
                                                    required
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={5}>
                                                <TextField
                                                    label="Last Name"
                                                    fullWidth
                                                    value={lastname}
                                                    onChange={(e) => setLast(e.target.value)}
                                                    required
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={2}>
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<AddIcon />}
                                                    sx={{ py: 1.7 }}
                                                >
                                                    Add
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader
                                    title="Current Donees"
                                    sx={{
                                        bgcolor: 'warning.main',
                                        color: 'warning.contrastText'
                                    }}
                                    action={
                                        <Button
                                            startIcon={<RefreshIcon />}
                                            onClick={fetchData}
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                        >
                                            Refresh
                                        </Button>
                                    }
                                />
                                <CardContent>
                                    {doneesError ? (
                                        <Alert severity="error" sx={{ mb: 2 }}>
                                            {doneesError}
                                            <Button
                                                size="small"
                                                sx={{ ml: 2 }}
                                                onClick={fetchData}
                                            >
                                                Retry
                                            </Button>
                                        </Alert>
                                    ) : (
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Name</TableCell>
                                                        <TableCell>Total Donations</TableCell>
                                                        <TableCell>Program Start Date</TableCell>
                                                        <TableCell>Link</TableCell>
                                                        <TableCell>Actions</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {Array.isArray(donees) && donees.length > 0 ? (
                                                        donees.map((donee) => {
                                                            const donationLink = `https://${window.location.hostname}:${window.location.port}/child-donations/${donee.link}`;

                                                            return (
                                                                <TableRow key={donee.child_id} hover>
                                                                    <TableCell>{donee.child_name}</TableCell>
                                                                    <TableCell>${parseFloat(donee.total_donations || 0).toFixed(2)}</TableCell>
                                                                    <TableCell>{formatDate(donee.began_program_at)}</TableCell>
                                                                    <TableCell>
                                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                            <TextField
                                                                                value={donationLink}
                                                                                variant="outlined"
                                                                                size="small"
                                                                                fullWidth
                                                                                InputProps={{
                                                                                    endAdornment: (
                                                                                        <InputAdornment position="end">
                                                                                            <Tooltip title="Copy link">
                                                                                                <IconButton
                                                                                                    edge="end"
                                                                                                    onClick={() => copyToClipboard(donationLink)}
                                                                                                    color={copySuccess === donationLink ? "success" : "default"}
                                                                                                >
                                                                                                    <ContentCopyIcon />
                                                                                                </IconButton>
                                                                                            </Tooltip>
                                                                                        </InputAdornment>
                                                                                    ),
                                                                                    readOnly: true
                                                                                }}
                                                                            />
                                                                        </Box>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Button
                                                                            variant="outlined"
                                                                            color="error"
                                                                            startIcon={<DeleteIcon />}
                                                                            onClick={() => confirmRemoveDonee(donee.child_name)}
                                                                            size="small"
                                                                        >
                                                                            Remove
                                                                        </Button>
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        })
                                                    ) : (
                                                        <TableRow>
                                                            <TableCell colSpan={5} align="center">
                                                                No donees available
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    )}
                                </CardContent>
                            </Card>
                        </>
                    )}

                    {/* Email Management Tab */}
                    {tabValue === 2 && (
                        <EmailManagement donees={donees} fetchDonees={fetchData} />
                    )}
                    
                    {/* Parent Database Tab */}
                    {tabValue === 3 && (
                        <ParentManagement donees={donees} />
                    )}
                </Paper>
            </Container>

            {/* Confirmation Dialog */}
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
            >
                <DialogTitle>Confirm Removal</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to remove this donee? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleRemoveDonee} color="error" autoFocus>
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SuperAdminPage;