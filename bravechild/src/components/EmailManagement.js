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
    Snackbar
} from '@mui/material';
import {
    Email as EmailIcon,
    Send as SendIcon,
    ContentCopy as ContentCopyIcon,
    Refresh as RefreshIcon
} from '@mui/icons-material';

import { fetch_donees } from '../services/fetch_donees';
import { send_parent_email } from '../services/send_parent_email';

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

    // Fetch donee data on component mount
    useEffect(() => {
        fetchDonees();
        fetchEmailHistory();
    }, []);

    // Fetch donees from API
    const fetchDonees = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch_donees();
            if (response?.success) {
                setDonees(response.data.donees || []);
            } else {
                setError(response?.message || 'Failed to fetch children data');
            }
        } catch (err) {
            console.error('Error fetching donees:', err);
            setError('Unable to load children information');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch email history from API
    const fetchEmailHistory = async () => {
        setEmailHistory([
            {
                id: 1,
                recipient: 'parent1@example.com',
                child_name: 'John Smith',
                sent_date: new Date(Date.now() - 86400000).toISOString(),
                status: 'Delivered'
            },
            {
                id: 2,
                recipient: 'parent2@example.com',
                child_name: 'Emma Johnson',
                sent_date: new Date(Date.now() - 172800000).toISOString(),
                status: 'Delivered'
            }
        ]);
    };

    // Handle donee selection change
    const handleDoneeChange = (event) => {
        const doneeId = event.target.value;
        setSelectedDonee(doneeId);
        
        const donee = donees.find(d => d.child_id === doneeId);
        
        if (donee) {
            const donationLink = `https://${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/child-donations/${donee.link}`;
            
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
            
            const donationLink = `https://${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/child-donations/${donee.link}`;

            const result = await send_parent_email({
                email: parentEmail,
                subject: subject,
                content: emailContent,
                childName: donee.child_name,
                donationLink: donationLink
            });
            
            if (result?.success) {
                setSuccessMessage(`Email sent successfully to ${parentEmail}`);
                setParentEmail('');
                setEmailContent(emailTemplate);
                setSelectedDonee('');
                
                fetchEmailHistory();
            } else {
                throw new Error(result?.message || 'Failed to send email');
            }
        } catch (err) {
            console.error('Error sending email:', err);
            setError(err.message || 'Failed to send email');
        } finally {
            setIsSending(false);
            setOpenDialog(false);
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Handle template reset
    const handleResetTemplate = () => {
        setEmailContent(emailTemplate);
    };

    // Close success message
    const handleCloseSuccess = () => {
        setSuccessMessage('');
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
                                    {donees.map((donee) => (
                                        <MenuItem key={donee.child_id} value={donee.child_id}>
                                            {donee.child_name}
                                        </MenuItem>
                                    ))}
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
                                            <TableCell>{formatDate(email.sent_date)}</TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={email.status} 
                                                    color={email.status === 'Delivered' ? 'success' : 'warning'}
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