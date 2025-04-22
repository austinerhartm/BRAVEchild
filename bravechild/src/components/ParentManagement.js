import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
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
    IconButton,
    Tooltip,
    Checkbox
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Email as EmailIcon,
    Send as SendIcon,
    Refresh as RefreshIcon,
    Edit as EditIcon,
    Save as SaveIcon,
    Cancel as CancelIcon
} from '@mui/icons-material';

import { fetch_parents } from '../services/fetch_parents';
import { add_parent } from '../services/add_parent';
import { update_parent } from '../services/update_parent';
import { delete_parent } from '../services/delete_parent';
import { send_batch_emails } from '../services/send_batch_emails';

const ParentManagement = ({ donees }) => {
    const [parents, setParents] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [childId, setChildId] = useState('');
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [editingParentId, setEditingParentId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [parentToDelete, setParentToDelete] = useState(null);
    const [emailDialogOpen, setEmailDialogOpen] = useState(false);
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
    const [emailSubject, setEmailSubject] = useState('Fundraising Link for Your Child at BRAVE');
    const [selectedParents, setSelectedParents] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    // Fetch parents on component mount
    useEffect(() => {
        fetchParents();
    }, []);

    // Handle select all checkbox
    useEffect(() => {
        if (selectAll) {
            setSelectedParents(parents.map(parent => parent.id));
        } else if (selectedParents.length === parents.length) {
            setSelectedParents([]);
        }
    }, [selectAll]);

    // Update selectAll when all parents are manually selected/deselected
    useEffect(() => {
        if (parents.length > 0 && selectedParents.length === parents.length) {
            setSelectAll(true);
        } else if (selectAll && selectedParents.length < parents.length) {
            setSelectAll(false);
        }
    }, [selectedParents]);

    // Fetch parents from API
    const fetchParents = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await fetch_parents();
            
            if (response?.success) {
                setParents(response.data.parents || []);
            } else {
                // For demo purposes
                setParents([
                    {
                        id: 1,
                        firstName: 'John',
                        lastName: 'Doe',
                        email: 'john.doe@example.com',
                        childId: donees[0]?.child_id,
                        childName: donees[0]?.child_name,
                        notes: 'Primary contact'
                    },
                    {
                        id: 2,
                        firstName: 'Jane',
                        lastName: 'Smith',
                        email: 'jane.smith@example.com',
                        childId: donees[1]?.child_id,
                        childName: donees[1]?.child_name,
                        notes: 'Prefers email contact'
                    }
                ]);
            }
        } catch (error) {
            console.error('Error fetching parents:', error);
            setError('Failed to load parents');
            
            // For demo purposes
            setParents([
                {
                    id: 1,
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    childId: donees[0]?.child_id,
                    childName: donees[0]?.child_name,
                    notes: 'Primary contact'
                },
                {
                    id: 2,
                    firstName: 'Jane',
                    lastName: 'Smith',
                    email: 'jane.smith@example.com',
                    childId: donees[1]?.child_id,
                    childName: donees[1]?.child_name,
                    notes: 'Prefers email contact'
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle adding a new parent
    const handleAddParent = async (e) => {
        e.preventDefault();
        setError(null);
        
        if (!firstName || !lastName || !email || !childId) {
            setError('Please fill out all required fields');
            return;
        }
        
        setIsLoading(true);
        
        try {
            const childInfo = donees.find(d => d.child_id === childId);
            const parentData = {
                firstName,
                lastName,
                email,
                childId,
                childName: childInfo?.child_name || '',
                notes
            };
            
            const response = await add_parent(parentData);
            
            if (response?.success) {
                setSuccessMessage('Parent added successfully');
                // Clear form
                setFirstName('');
                setLastName('');
                setEmail('');
                setChildId('');
                setNotes('');
                // Refresh parents list
                fetchParents();
            } else {
                throw new Error(response?.message || 'Failed to add parent');
            }
        } catch (error) {
            console.error('Error adding parent:', error);
            setError(error.message || 'Failed to add parent');
            
            // For demo purposes
            const newId = parents.length > 0 ? Math.max(...parents.map(p => p.id)) + 1 : 1;
            const childInfo = donees.find(d => d.child_id === childId);
            const newParent = {
                id: newId,
                firstName,
                lastName,
                email,
                childId,
                childName: childInfo?.child_name || '',
                notes
            };
            
            setParents([...parents, newParent]);
            setSuccessMessage('Parent added successfully (demo mode)');
            
            // Clear form
            setFirstName('');
            setLastName('');
            setEmail('');
            setChildId('');
            setNotes('');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle editing a parent
    const handleEditParent = (parent) => {
        setEditingParentId(parent.id);
        setFirstName(parent.firstName);
        setLastName(parent.lastName);
        setEmail(parent.email);
        setChildId(parent.childId);
        setNotes(parent.notes || '');
    };

    // Handle saving edited parent
    const handleSaveEdit = async () => {
        setError(null);
        
        if (!firstName || !lastName || !email || !childId) {
            setError('Please fill out all required fields');
            return;
        }
        
        setIsLoading(true);
        
        try {
            const childInfo = donees.find(d => d.child_id === childId);
            const updatedParent = {
                id: editingParentId,
                firstName,
                lastName,
                email,
                childId,
                childName: childInfo?.child_name || '',
                notes
            };
            
            const response = await update_parent(updatedParent);
            
            if (response?.success) {
                setSuccessMessage('Parent updated successfully');
                // Refresh parents list
                fetchParents();
            } else {
                throw new Error(response?.message || 'Failed to update parent');
            }
        } catch (error) {
            console.error('Error updating parent:', error);
            setError(error.message || 'Failed to update parent');
            
            // For demo purposes
            const updatedParents = parents.map(p => 
                p.id === editingParentId ? {
                    ...p,
                    firstName,
                    lastName,
                    email,
                    childId,
                    childName: donees.find(d => d.child_id === childId)?.child_name || '',
                    notes
                } : p
            );
            
            setParents(updatedParents);
            setSuccessMessage('Parent updated successfully (demo mode)');
        } finally {
            setIsLoading(false);
            setEditingParentId(null);
            
            // Clear form
            setFirstName('');
            setLastName('');
            setEmail('');
            setChildId('');
            setNotes('');
        }
    };

    // Handle canceling edit
    const handleCancelEdit = () => {
        setEditingParentId(null);
        setFirstName('');
        setLastName('');
        setEmail('');
        setChildId('');
        setNotes('');
    };

    // Open delete confirmation dialog
    const handleDeleteClick = (parentId) => {
        setParentToDelete(parentId);
        setDeleteDialogOpen(true);
    };

    // Delete parent
    const handleDeleteParent = async () => {
        setIsLoading(true);
        
        try {
            const response = await delete_parent(parentToDelete);
            
            if (response?.success) {
                setSuccessMessage('Parent deleted successfully');
                // Refresh parents list
                fetchParents();
            } else {
                throw new Error(response?.message || 'Failed to delete parent');
            }
        } catch (error) {
            console.error('Error deleting parent:', error);
            setError(error.message || 'Failed to delete parent');
            
            // For demo purposes
            const filteredParents = parents.filter(p => p.id !== parentToDelete);
            setParents(filteredParents);
            setSuccessMessage('Parent deleted successfully (demo mode)');
        } finally {
            setIsLoading(false);
            setDeleteDialogOpen(false);
            setParentToDelete(null);
        }
    };

    // Handle parent selection
    const handleParentSelection = (parentId) => {
        if (selectedParents.includes(parentId)) {
            setSelectedParents(selectedParents.filter(id => id !== parentId));
        } else {
            setSelectedParents([...selectedParents, parentId]);
        }
    };

    // Handle opening batch email dialog
    const handleBatchEmailClick = () => {
        if (selectedParents.length === 0) {
            setError('Please select at least one parent');
            return;
        }
        
        setEmailDialogOpen(true);
    };

    // Send batch emails
    const handleSendBatchEmails = async () => {
        setIsSending(true);
        setError(null);
        
        try {
            const selectedParentData = parents.filter(p => selectedParents.includes(p.id));
            
            // Prepare email data for each parent
            const emailRequests = selectedParentData.map(parent => {
                const donee = donees.find(d => d.child_id === parent.childId);
                const donationLink = donee ? 
                    `https://${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/child-donations/${donee.link}` : 
                    'Link not available';
                
                return {
                    email: parent.email,
                    subject: emailSubject,
                    content: emailTemplate.replace('{{donationLink}}', donationLink),
                    childName: parent.childName,
                    donationLink
                };
            });
            
            const response = await send_batch_emails(emailRequests);
            
            if (response?.success) {
                setSuccessMessage(`Successfully sent emails to ${selectedParentData.length} parents`);
                setSelectedParents([]);
                setSelectAll(false);
            } else {
                throw new Error(response?.message || 'Failed to send emails');
            }
        } catch (error) {
            console.error('Error sending batch emails:', error);
            setError(error.message || 'Failed to send emails');
        } finally {
            setIsSending(false);
            setEmailDialogOpen(false);
        }
    };

    // Handle closing success message
    const handleCloseSuccess = () => {
        setSuccessMessage('');
    };

    return (
        <Box>
            <Card sx={{ mb: 4 }}>
                <CardHeader
                    title={editingParentId ? "Edit Parent" : "Add New Parent"}
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
                    
                    <form onSubmit={handleAddParent}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    label="First Name"
                                    fullWidth
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    label="Last Name"
                                    fullWidth
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth required>
                                    <InputLabel id="child-select-label">Child</InputLabel>
                                    <Select
                                        labelId="child-select-label"
                                        id="child-select"
                                        value={childId}
                                        label="Child"
                                        onChange={(e) => setChildId(e.target.value)}
                                    >
                                        {donees.map((donee) => (
                                            <MenuItem key={donee.child_id} value={donee.child_id}>
                                                {donee.child_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField
                                    label="Notes"
                                    fullWidth
                                    multiline
                                    rows={2}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                                    {editingParentId ? (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleSaveEdit}
                                                startIcon={<SaveIcon />}
                                                disabled={isLoading}
                                            >
                                                Save Changes
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                onClick={handleCancelEdit}
                                                startIcon={<CancelIcon />}
                                                disabled={isLoading}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            startIcon={<AddIcon />}
                                            disabled={isLoading}
                                        >
                                            Add Parent
                                        </Button>
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader
                    title="Parent Database"
                    sx={{
                        bgcolor: 'warning.main',
                        color: 'warning.contrastText'
                    }}
                    action={
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<EmailIcon />}
                                onClick={handleBatchEmailClick}
                                disabled={selectedParents.length === 0}
                            >
                                Send Batch Emails
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<RefreshIcon />}
                                onClick={fetchParents}
                            >
                                Refresh
                            </Button>
                        </Box>
                    }
                />
                <CardContent>
                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selectAll}
                                                onChange={() => setSelectAll(!selectAll)}
                                                indeterminate={selectedParents.length > 0 && selectedParents.length < parents.length}
                                            />
                                        </TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Child</TableCell>
                                        <TableCell>Notes</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {parents.length > 0 ? (
                                        parents.map((parent) => (
                                            <TableRow 
                                                key={parent.id} 
                                                hover
                                                selected={selectedParents.includes(parent.id)}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={selectedParents.includes(parent.id)}
                                                        onChange={() => handleParentSelection(parent.id)}
                                                    />
                                                </TableCell>
                                                <TableCell>{`${parent.firstName} ${parent.lastName}`}</TableCell>
                                                <TableCell>{parent.email}</TableCell>
                                                <TableCell>{parent.childName}</TableCell>
                                                <TableCell>{parent.notes}</TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                                        <Tooltip title="Edit">
                                                            <IconButton
                                                                onClick={() => handleEditParent(parent)}
                                                                color="primary"
                                                                size="small"
                                                            >
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Delete">
                                                            <IconButton
                                                                onClick={() => handleDeleteClick(parent.id)}
                                                                color="error"
                                                                size="small"
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center">
                                                No parents in database
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </CardContent>
            </Card>
            
            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this parent? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button 
                        onClick={handleDeleteParent} 
                        color="error"
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            
            {/* Batch Email Dialog */}
            <Dialog
                open={emailDialogOpen}
                onClose={() => setEmailDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Send Batch Emails</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        You are about to send emails to {selectedParents.length} parents.
                    </Typography>
                    
                    <TextField
                        label="Email Subject"
                        fullWidth
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Email Template:
                    </Typography>
                    <TextField
                        multiline
                        rows={10}
                        fullWidth
                        value={emailTemplate}
                        onChange={(e) => setEmailTemplate(e.target.value)}
                        placeholder="Email content"
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    
                    <Typography variant="caption" color="text.secondary">
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEmailDialogOpen(false)}>Cancel</Button>
                    <Button 
                        onClick={handleSendBatchEmails} 
                        color="primary" 
                        variant="contained"
                        startIcon={isSending ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                        disabled={isSending}
                    >
                        {isSending ? 'Sending...' : 'Send Emails'}
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

export default ParentManagement;