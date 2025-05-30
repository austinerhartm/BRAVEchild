import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    Paper,
    Grid,
    Button,
    Card,
    CardContent,
    CardHeader,
    AppBar,
    Toolbar,
    Divider,
    Chip,
    useScrollTrigger,
    Slide,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import {
    Home as HomeIcon,
    Login as LoginIcon,
    PersonAdd as PersonAddIcon,
    VolunteerActivism as VolunteerIcon,
    CheckCircle as CheckCircleIcon,
    ExpandMore as ExpandMoreIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    LocationOn as LocationIcon,
    School as SchoolIcon,
    EventNote as EventIcon,
    Groups as GroupsIcon
} from '@mui/icons-material';

const HideOnScroll = ({ children }) => {
    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
};

const ModernFAQ = ({ question, answer, answer2 }) => {
    return (
        <Accordion elevation={2} sx={{ mb: 2, '&:before': { display: 'none' } }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
                aria-controls="panel-content"
                id="panel-header"
                sx={{
                    backgroundColor: '#f8f9fa',
                    '&:hover': {
                        backgroundColor: '#e9ecef'
                    },
                    '& .MuiAccordionSummary-content': {
                        margin: '12px 0'
                    }
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {question}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 3 }}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                        {answer}
                    </Typography>
                    {answer2 && (
                        <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                            {answer2}
                        </Typography>
                    )}
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

const LearnMore = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#e8f5e9' }}>
            {/* Navigation Bar */}
            <HideOnScroll>
                <AppBar 
                    position="fixed" 
                    sx={{ 
                        backgroundColor: '#e8f5e9',
                        boxShadow: isScrolled ? 3 : 1,
                        transition: 'all 0.3s ease'
                    }}
                >
                    <Toolbar sx={{ justifyContent: 'space-between', py: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <img 
                                        src="/BRAVEPic.png" 
                                        alt="BRAVE Logo" 
                                        style={{ height: 80, marginRight: 16 }}
                                    />
                                    <Typography 
                                        variant="h4" 
                                        sx={{ 
                                            color: '#8C00AF',
                                            fontWeight: 'bold',
                                            display: { xs: 'none', sm: 'block' }
                                        }}
                                    >
                                        B.R.A.V.E. Child Inc.
                                    </Typography>
                                </Box>
                            </Link>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        </Box>
                    </Toolbar>

                    {/* Secondary Navigation */}
                    <Box sx={{ backgroundColor: '#7FF77F', px: 2, py: 1.5 }}>
                        <Container maxWidth="lg">
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                                <Button 
                                    sx={{ 
                                        color: 'white', 
                                        fontWeight: 'bold',
                                        backgroundColor: '#8C00AF',
                                        '&:hover': { backgroundColor: '#7E009D' }
                                    }}
                                    size="medium"
                                    href="/"
                                    startIcon={<HomeIcon />}
                                >
                                    Home
                                </Button>
                                <Button
                                    sx={{ 
                                        color: 'white', 
                                        fontWeight: 'bold',
                                        backgroundColor: '#8C00AF',
                                        '&:hover': { backgroundColor: '#7E009D' }
                                    }}
                                    size="medium"
                                    href="/learn-more"
                                    color="primary"
                                    variant="contained"
                                    startIcon={<SchoolIcon />}
                                >
                                    Learn More
                                </Button>
                                <Button
                                    sx={{ 
                                        color: 'white', 
                                        fontWeight: 'bold',
                                        backgroundColor: '#8C00AF',
                                        '&:hover': { backgroundColor: '#7E009D' }
                                    }}
                                    size="medium"
                                    href="/sponsor-donations"
                                    color="primary"
                                    startIcon={<VolunteerIcon />}
                                >
                                    Donate
                                </Button>
                            </Box>
                        </Container>
                    </Box>
                </AppBar>
            </HideOnScroll>
            
            {/* Main Content */}
            <Box sx={{ pt: 20 }}>
                {/* Hero Section */}
                <Container maxWidth="lg" sx={{ mb: 6 }}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
                        <Chip 
                            label="Learn About Our Programs" 
                            color="primary" 
                            sx={{ mb: 3, fontSize: '1.1rem', py: 3, px: 2 }}
                        />
                        <Typography variant="h2" component="h1" color="primary" gutterBottom>
                            About Our Program
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
                            Discover how B.R.A.V.E. Child Inc. creates opportunities for families to access equine therapy services
                        </Typography>
                    </Paper>
                </Container>

                {/* What We Offer Section */}
                <Container maxWidth="lg" sx={{ mb: 6 }}>
                    <Card elevation={3}>
                        <CardHeader
                            title="What We Offer"
                            sx={{
                                bgcolor: 'success.main',
                                color: 'success.contrastText',
                                textAlign: 'center'
                            }}
                        />
                        <CardContent sx={{ p: 4 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ textAlign: 'center', p: 3 }}>
                                        <CheckCircleIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                                        <Typography variant="h5" gutterBottom color="primary">
                                            Personal Fundraising
                                        </Typography>
                                        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                                            Individual fundraising opportunities designed specifically for your child's therapy needs
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ textAlign: 'center', p: 3 }}>
                                        <GroupsIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                                        <Typography variant="h5" gutterBottom color="primary">
                                            Public Fundraising
                                        </Typography>
                                        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                                            Community events including bake sales, Easter egg delivery, and Christmas ornament sales
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ textAlign: 'center', p: 3 }}>
                                        <VolunteerIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                                        <Typography variant="h5" gutterBottom color="primary">
                                            Sponsorship Opportunities
                                        </Typography>
                                        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                                            Connect with sponsors who want to support equine therapy for children in need
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>

                {/* Get Started Section */}
                <Container maxWidth="lg" sx={{ mb: 6 }}>
                    <Card elevation={3}>
                        <CardHeader
                            title="Get Started Today"
                            sx={{
                                bgcolor: 'warning.main',
                                color: 'warning.contrastText',
                                textAlign: 'center'
                            }}
                        />
                        <CardContent sx={{ p: 4 }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ textAlign: 'center', p: 3 }}>
                                        <EventIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                                        <Typography variant="h5" gutterBottom color="primary">
                                            Sign Up & Information
                                        </Typography>
                                        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                                            Ready to get started? Contact us today for more information about our programs.
                                        </Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                startIcon={<EmailIcon />}
                                                href="mailto:BRAVEbfchild@gmail.com"
                                            >
                                                Email Us
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                startIcon={<PhoneIcon />}
                                                href="tel:+13188407091"
                                            >
                                                Call Us
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Paper 
                                        elevation={2}
                                        sx={{ 
                                            p: 3, 
                                            backgroundColor: 'rgba(140, 0, 175, 0.05)',
                                            borderRadius: 3,
                                            border: '2px solid',
                                            borderColor: 'primary.main'
                                        }}
                                    >
                                        <Typography variant="h6" gutterBottom color="primary" sx={{ textAlign: 'center' }}>
                                            Contact Information
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                                            <Typography variant="body1">
                                                BRAVEbfchild@gmail.com
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                                            <Typography variant="body1">
                                                (318) 840-7091
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                            <LocationIcon sx={{ mr: 2, color: 'primary.main', mt: 0.5 }} />
                                            <Typography variant="body1">
                                                66 Mengle Road<br />
                                                Rayville, LA 71269
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>

                {/* FAQ Section */}
                <Container maxWidth="lg" sx={{ mb: 6 }}>
                    <Card elevation={3}>
                        <CardHeader
                            title="Frequently Asked Questions"
                            sx={{
                                bgcolor: 'secondary.main',
                                color: 'secondary.contrastText',
                                textAlign: 'center'
                            }}
                        />
                        <CardContent sx={{ p: 4 }}>
                            <ModernFAQ
                                question="What types of fundraising opportunities are offered by B.R.A.V.E. Child, Inc?"
                                answer="First is Child's personal fundraiser, the Number Fundraiser. Every child can participate in this fundraiser and all funds raised for their child will go towards their child."
                                answer2="Second is Public fundraisers. The public fundraisers are bake sales, easter egg delivery, and Christmas ornament sales. All funds from public fundraisers cover any leftover expenses for all children and B.R.A.V.E. Child, Inc. All public fundraisers will be posted on our Facebook and website."
                            />
                            <ModernFAQ
                                question="How to qualify for or participate in B.R.A.V.E. Child, Inc fundraising opportunities?"
                                answer="Caregiver volunteers for at least one public fundraiser or public event per year, by either donating their time or donating the supplies. Public fundraisers will be posted on our website and Facebook."
                                answer2="Participate in the Number Fundraiser to receive benefits."
                            />
                            <ModernFAQ
                                question="What is the Number Fundraiser?"
                                answer="The Number Fundraiser is a personal fundraising tool where supporters can select specific numbers corresponding to dollar amounts. For example, selecting number 25 means donating $25."
                                answer2="Each child gets their own unique fundraising link that can be shared with family, friends, and the community to raise funds specifically for their therapy sessions."
                            />
                            <ModernFAQ
                                question="How do I get my child enrolled in the program?"
                                answer="To enroll your child, contact us via email or phone to discuss your child's needs and eligibility for our programs."
                                answer2="We'll work with you to understand your situation and help you access the fundraising opportunities that best fit your family's needs."
                            />
                        </CardContent>
                    </Card>
                </Container>

                {/* 501c3 Notice */}
                <Container maxWidth="lg" sx={{ mb: 6 }}>
                    <Paper 
                        elevation={2} 
                        sx={{ 
                            p: 3, 
                            textAlign: 'center',
                            border: '2px solid',
                            borderColor: 'primary.main'
                        }}
                    >
                        <Typography variant="h6" color="primary">
                            B.R.A.V.E. Child, Inc is a (IRC) Section 501c (3) organization.
                        </Typography>
                    </Paper>
                </Container>

                {/* Contact Section */}
                <Container maxWidth="lg">
                    <Card elevation={3}>
                        <CardHeader
                            title="Ready to Get Started?"
                            sx={{
                                bgcolor: 'primary.main',
                                color: 'primary.contrastText',
                                textAlign: 'center'
                            }}
                        />
                        <CardContent sx={{ p: 4 }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <EmailIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                                        <Typography variant="h6" gutterBottom>
                                            Email Us
                                        </Typography>
                                        <Typography variant="body1" sx={{ mb: 2 }}>
                                            BRAVEbfchild@gmail.com
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            href="mailto:BRAVEbfchild@gmail.com"
                                            startIcon={<EmailIcon />}
                                        >
                                            Send Email
                                        </Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <PhoneIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                                        <Typography variant="h6" gutterBottom>
                                            Call Us
                                        </Typography>
                                        <Typography variant="body1" sx={{ mb: 2 }}>
                                            (318) 840-7091
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            href="tel:+13188407091"
                                            startIcon={<PhoneIcon />}
                                        >
                                            Call Now
                                        </Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <LocationIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                                        <Typography variant="h6" gutterBottom>
                                            Visit Us
                                        </Typography>
                                        <Typography variant="body1" sx={{ mb: 2 }}>
                                            66 Mengle Road<br />
                                            Rayville, LA 71269
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            startIcon={<LocationIcon />}
                                            href="https://maps.google.com/?q=66+Mengle+Road+Rayville+LA+71269"
                                            target="_blank"
                                        >
                                            Get Directions
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 4 }} />

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" gutterBottom>
                                    Follow Us on Social Media
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                                    <IconButton>
                                        <img 
                                            src="/BRAVEFacebookIcon.png" 
                                            alt="Facebook" 
                                            style={{ width: 40, height: 40 }}
                                        />
                                    </IconButton>
                                    <IconButton>
                                        <img 
                                            src="/BRAVEInstagramIcon.png" 
                                            alt="Instagram" 
                                            style={{ width: 40, height: 40 }}
                                        />
                                    </IconButton>
                                    <IconButton>
                                        <img 
                                            src="/BRAVETwitterIcon.png" 
                                            alt="Twitter" 
                                            style={{ width: 40, height: 40 }}
                                        />
                                    </IconButton>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </Box>
    );
};

export default LearnMore;