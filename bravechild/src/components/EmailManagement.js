import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
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
    Chip,
    Alert,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Snackbar,
    Tooltip
} from '@mui/material';
import {
    Email as EmailIcon,
    Send as SendIcon,
    ContentCopy as ContentCopyIcon,
    Refresh as RefreshIcon,
    Info as InfoIcon
} from '@mui/icons-material';

import api from '../services/api.service';

const EmailManagement = () => {
    const [donees, setDonees] = useState([]);
    const [selectedDonee, setSelectedDonee] = useState('');
    const [parentEmail, setParentEmail] = useState('');
    const [subject, setSubject] = useState('Fundraising Link for Your Child at BRAVE');
    const [emailContent, setEmailContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [debugDialogOpen, setDebugDialogOpen] = useState(false);
    const [emailHistory, setEmailHistory] = useState([]);
    const [emailTemplate, setEmailTemplate] = useState(
        `Dear Parent,

I hope this email finds you well. I'm excited to share your child's personal fundraising link for our equine therapy program at BRAVE Child Inc.

Your personal donation link is: {{donationLink}}

This link allows friends, family, and supporters to contribute directly to your child's equine therapy sessions. Simply share this link with your network to help meet your fundraising goals.

The number-based donation system lets supporters choose specific numbers to donate the corresponding dollar amount. For example, selecting the number 25 means donating $25.

If you have any questions about using the link or the fundraising process, please don't hesitate to contact me.

Thank you for your continued support of BRAVE Child!

Best regards,
Jessica
BRAVE Child Inc.
Phone: (318) 840-7091
Email: BRAVEbfchild@gmail.com`
    );

    useEffect(() => {
        fetchDonees();
        fetchEmailHistory();
    }, []);

    const fetchDonees = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.get('/fetch/donees');
            console.log('Donees API Response:', response.data);
            
            if (response.data.success) {
                if (response.data.data && Array.isArray(response.data.data.donees)) {
                    setDonees(response.data.data.donees);
                } else if (response.data.donees && Array.isArray(response.data.donees)) {
                    setDonees(response.data.donees);
                } else {
                    console.warn("API returned success but donees data is not in expected format:", response.data);
                    setDonees([]);
                    setError('Server returned an unexpected data format for children');
                }
            } else {
                console.warn("Failed to fetch donees:", response.data);
                setError(response.data.message || 'Failed to fetch children data');
                loadDemoDonees();
            }
        } catch (err) {
            console.error('Error fetching donees:', err);
            setError('Unable to load children information');
            loadDemoDonees();
        } finally {
            setIsLoading(false);
        }
    };

    const loadDemoDonees = () => {
        setDonees([
            {
                child_id: 1,
                child_name: 'John Smith',
                link: 'john-smith-123'
            },
            {
                child_id: 2,
                child_name: 'Emma Johnson',
                link: 'emma-johnson-456'
            }
        ]);
    };

    const fetchEmailHistory = async () => {
        try {
            const response = await api.get('/fetch/email-history');
            console.log('Email History API Response:', response.data);
            
            if (response.data.success && Array.isArray(response.data.data?.emails)) {
                setEmailHistory(response.data.data.emails);
            } else {
                loadDemoEmailHistory();
            }
        } catch (err) {
            console.error('Error fetching email history:', err);
            loadDemoEmailHistory();
        }
    };

    const loadDemoEmailHistory = () => {
        setEmailHistory([
            {
                id: 1,
                recipient: 'parent1@example.com',
                child_name: 'John Smith',
                sent_date: new Date(Date.now() - 86400000).toISOString(),
                status: 'Sent'
            },
            {
                id: 2,
                recipient: 'parent2@example.com',
                child_name: 'Emma Johnson',
                sent_date: new Date(Date.now() - 172800000).toISOString(),
                status: 'Sent'
            }
        ]);
    };

    const handleDoneeChange = (event) => {
        const doneeId = event.target.value;
        setSelectedDonee(doneeId);
        
        const donee = donees.find(d => d.child_id === doneeId);
        
        if (donee) {
            const donationLink = `${window.location.origin}/child-donations/${donee.link}`;
            
            setEmailContent(emailTemplate.replace('{{donationLink}}', donationLink));
        }
    };

    const handleOpenDialog = () => {
        if (!selectedDonee) {
            setError('Please select a child first');
            return;
        }
        
        if (!parentEmail) {
            setError('Please enter parent email');
            return;
        }
        
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSendEmail = async () => {
        setIsSending(true);
        setError(null);
        
        try {
            const donee = donees.find(d => d.child_id === selectedDonee);
            if (!donee) {
                throw new Error('Selected child not found');
            }
            
            const donationLink = `${window.location.origin}/child-donations/${donee.link}`;

            const response = await api.post('/email/send-parent-link', {
                email: parentEmail,
                subject: subject,
                content: emailContent,
                childName: donee.child_name,
                donationLink: donationLink
            });
            
            console.log('Send Email Response:', response.data);
            
            if (response.data.success) {
                setSuccessMessage(`Email sent successfully to ${parentEmail}`);
                setParentEmail('');
                setEmailContent(emailTemplate);
                setSelectedDonee('');
                
                fetchEmailHistory();
            } else {
                throw new Error(response.data.message || 'Failed to send email');
            }
        } catch (err) {
            console.error('Error sending email:', err);
            if (err.response?.data?.message) {
                setError(`Server error: ${err.response.data.message}`);
            } else {
                setError(err.message || 'Failed to send email');
            }
            
            setDebugDialogOpen(true);
        } finally {
            setIsSending(false);
            setOpenDialog(false);
        }
    };

    const formatDate = (dateString) => {
        try {
            if (!dateString) return 'N/A';
            
            const date = new Date(dateString);
            
            if (isNaN(date.getTime())) {
                console.warn('Invalid date string:', dateString);
                return 'Invalid date';
            }
            
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: 'numeric', 
                minute: 'numeric',
                hour12: true
            };
            
            return date.toLocaleDateString('en-US', options);
        } catch (error) {
            console.error('Error formatting date:', error, dateString);
            return 'Date error';
        }
    };

    const handleResetTemplate = () => {
        setEmailContent(emailTemplate);
    };

    const handleCloseSuccess = () => {
        setSuccessMessage('');
    };

    const copyDonationLink = () => {
        const donee = donees.find(d => d.child_id === selectedDonee);
        if (donee) {
            const donationLink = `${window.location.origin}/child-donations/${donee.link}`;
            navigator.clipboard.writeText(donationLink);
            setSuccessMessage('Donation link copied to clipboard');
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Card sx={{ mb: 4 }}>
                <CardHeader
                    title="Send Donation Link Emails"
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText'
                    }}
                    action={
                        <Button
                            startIcon={<RefreshIcon />}
                            onClick={fetchDonees}
                            variant="contained"
                            color="secondary"
                            size="small"
                        >
                            Refresh
                        </Button>
                    }
                />
                <CardContent>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="donee-select-label">Select Child</InputLabel>
                                <Select
                                    labelId="donee-select-label"
                                    id="donee-select"
                                    value={selectedDonee}
                                    label="Select Child"
                                    onChange={handleDoneeChange}
                                >
                                    {donees.length > 0 ? (
                                        donees.map((donee) => (
                                            <MenuItem key={donee.child_id} value={donee.child_id}>
                                                {donee.child_name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled value="">No children available</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            
                            <TextField
                                label="Parent Email"
                                fullWidth
                                value={parentEmail}
                                onChange={(e) => setParentEmail(e.target.value)}
                                required
                                type="email"
                                sx={{ mb: 2 }}
                            />
                            
                            <TextField
                                label="Email Subject"
                                fullWidth
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            
                            {selectedDonee && (
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="body2" sx={{ mr: 1 }}>
                                        Donation Link:
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            flexGrow: 1, 
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {window.location.origin}/child-donations/{donees.find(d => d.child_id === selectedDonee)?.link}
                                    </Typography>
                                    <IconButton 
                                        size="small" 
                                        onClick={copyDonationLink}
                                        color="primary"
                                    >
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            )}
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="subtitle1">Email Content</Typography>
                                <Button 
                                    size="small" 
                                    onClick={handleResetTemplate}
                                    variant="outlined"
                                >
                                    Reset to Template
                                </Button>
                            </Box>
                            <TextField
                                multiline
                                rows={15}
                                fullWidth
                                value={emailContent}
                                onChange={(e) => setEmailContent(e.target.value)}
                                placeholder="Email content"
                                variant="outlined"
                                helperText="Use {{donationLink}} as a placeholder for the child's donation link"
                            />
                        </Grid>
                    </Grid>
                    
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<EmailIcon />}
                            onClick={handleOpenDialog}
                            size="large"
                            disabled={!selectedDonee || !parentEmail}
                        >
                            Send Email
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader
                    title="Email History"
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText'
                    }}
                    action={
                        <Button
                            startIcon={<RefreshIcon />}
                            onClick={fetchEmailHistory}
                            variant="contained"
                            color="secondary"
                            size="small"
                        >
                            Refresh History
                        </Button>
                    }
                />
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Parent Email</TableCell>
                                    <TableCell>Child Name</TableCell>
                                    <TableCell>Sent Date</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {emailHistory.length > 0 ? (
                                    emailHistory.map((email) => (
                                        <TableRow key={email.id} hover>
                                            <TableCell>{email.recipient}</TableCell>
                                            <TableCell>{email.child_name}</TableCell>
                                            <TableCell>{formatDate(email.created_at || email.sent_date)}</TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={email.status} 
                                                    color={email.status === 'Delivered' || email.status === 'Sent' ? 'success' : 'warning'}
                                                    size="small"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            No emails sent yet
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
            
            {/* Confirmation Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Confirm Email</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to send the email to {parentEmail}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button 
                        onClick={handleSendEmail} 
                        color="primary" 
                        variant="contained"
                        startIcon={isSending ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                        disabled={isSending}
                    >
                        {isSending ? 'Sending...' : 'Send Email'}
                    </Button>
                </DialogActions>
            </Dialog>
            
            {/* Debug Dialog */}
            <Dialog
                open={debugDialogOpen}
                onClose={() => setDebugDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Email Sending Issue Debug</DialogTitle>
                <DialogContent>
                    <Typography variant="h6" gutterBottom>
                        Common issues with email sending:
                    </Typography>
                    <Typography variant="body1" component="div">
                        <ul>
                            <li>Backend email configuration might be incorrect</li>
                            <li>The FROM address might be improperly formatted</li>
                            <li>Email credentials might be invalid</li>
                            <li>The recipient email address might be invalid</li>
                        </ul>
                    </Typography>
                    
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Suggested fixes:
                    </Typography>
                    <Typography variant="body1" component="div">
                        <ol>
                            <li>Check the server logs for detailed error messages</li>
                            <li>Verify that the email environment variables are set correctly</li>
                            <li>Ensure the FROM email address format is correct (e.g., "Name &lt;email@example.com&gt;")</li>
                            <li>Try with a different recipient email address</li>
                        </ol>
                    </Typography>
                    
                    <Alert severity="info" sx={{ mt: 2 }}>
                        If the issue persists, please contact your system administrator with the error information from the server logs.
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDebugDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
            
            {/* Success Snackbar */}
            <Snackbar
                open={!!successMessage}
                autoHideDuration={6000}
                onClose={handleCloseSuccess}
            >
                <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default EmailManagement;