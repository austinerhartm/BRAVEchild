import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    IconButton
} from '@mui/material';
import {
    Favorite as FavoriteIcon,
    VolunteerActivism as VolunteerIcon,
    School as SchoolIcon,
    Home as HomeIcon,
    Login as LoginIcon,
    PersonAdd as PersonAddIcon,
    Dashboard as DashboardIcon,
    Logout as LogoutIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    LocationOn as LocationIcon
} from '@mui/icons-material';
import auth from './services/auth.service';
import SponsorDonations from './components/SponsorDonations';
import firstHomepageImg from './imgs/first-homepage-imgMod.jpg';
import secondHomepageImg from './imgs/second-homepage-img.jpg';
import thirdHomepageImg from './imgs/third-homepage-img.jpg';
import hippoTherapyImg from './imgs/hippotherapy-img.jpg';
import equineTherapyImg from './imgs/equinetherapy-img.jpg';

const HideOnScroll = ({ children }) => {
    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
};

const HomePage = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSubmit = (e, formData) => {
        e.preventDefault();
        navigate('/sponsor-donations', { state: formData });
    };

    const scrollToSection = (selector) => {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                            {!auth.isAuthenticated() ? (
                                <>
                                    {/* <Button
                                        href="/login"
                                        startIcon={<LoginIcon />}
                                        variant="contained"
                                        sx={{ 
                                            backgroundColor: 'white', 
                                            color: 'white',
                                            '&:hover': { backgroundColor: '#f5f5f5' }
                                        }}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        href="/create-user"
                                        startIcon={<PersonAddIcon />}
                                        variant="contained"
                                        sx={{ 
                                            backgroundColor: 'white', 
                                            color: 'white',
                                            '&:hover': { backgroundColor: '#f5f5f5' }
                                        }}
                                    >
                                        Sign Up
                                    </Button> */}
                                </>
                            ) : (
                                <>
                                    {/* <Button
                                        href="/super/secret/page"
                                        startIcon={<DashboardIcon />}
                                        variant="contained"
                                        sx={{ 
                                            backgroundColor: 'white', 
                                            color: 'white',
                                            '&:hover': { backgroundColor: '#f5f5f5' }
                                        }}
                                    >
                                        Dashboard
                                    </Button>
                                    <Button
                                        startIcon={<LogoutIcon />}
                                        variant="contained"
                                        sx={{ 
                                            backgroundColor: 'white', 
                                            color: 'white',
                                            '&:hover': { backgroundColor: '#f5f5f5' }
                                        }}
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            await auth.logout();
                                            window.location.href = '/';
                                        }}
                                    >
                                        Logout
                                    </Button> */}
                                </>
                            )}
                            {/* <Button
                                href="/sponsor-donations"
                                variant="contained"
                                startIcon={<VolunteerIcon />}
                                sx={{ 
                                    backgroundColor: '#F4F141', 
                                    color: 'white',
                                    fontWeight: 'bold',
                                    '&:hover': { backgroundColor: '#FFD43A' }
                                }}
                            >
                                Donate
                            </Button> */}
                        </Box>
                    </Toolbar>

                    {/* Secondary Navigation */}
                    <Box sx={{ backgroundColor: '#7FF77F', px: 2, py: 1.5 }}>
                        <Container maxWidth="lg">
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                                <Button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    startIcon={<HomeIcon />}
                                    sx={{ 
                                        color: 'white', 
                                        fontWeight: 'bold',
                                        backgroundColor: '#8C00AF',
                                        '&:hover': { backgroundColor: '#7E009D' }
                                    }}
                                    size="medium"
                                >
                                    Home
                                </Button>
                                <Button
                                    href="/learn-more"
                                    sx={{ 
                                        color: 'white', 
                                        fontWeight: 'bold',
                                        backgroundColor: '#8C00AF',
                                        '&:hover': { backgroundColor: '#7E009D' }
                                    }}
                                    size="medium"
                                >
                                    Learn More
                                </Button>
                                <Button
                                    onClick={() => scrollToSection('.hippotherapy-section')}
                                    sx={{ 
                                        color: 'white', 
                                        fontWeight: 'bold',
                                        backgroundColor: '#8C00AF',
                                        '&:hover': { backgroundColor: '#7E009D' }
                                    }}
                                    size="medium"
                                >
                                    Hippotherapy
                                </Button>
                                <Button
                                    onClick={() => scrollToSection('.equinetherapy-section')}
                                    sx={{ 
                                        color: 'white', 
                                        fontWeight: 'bold',
                                        backgroundColor: '#8C00AF',
                                        '&:hover': { backgroundColor: '#7E009D' }
                                    }}
                                    size="medium"
                                >
                                    Equine Therapy
                                </Button>
                                <Button
                                    onClick={() => scrollToSection('.contact-section')}
                                    sx={{ 
                                        color: 'white', 
                                        fontWeight: 'bold',
                                        backgroundColor: '#8C00AF',
                                        '&:hover': { backgroundColor: '#7E009D' }
                                    }}
                                    size="medium"
                                >
                                    Contact
                                </Button>
                            </Box>
                        </Container>
                    </Box>
                </AppBar>
            </HideOnScroll>

            {/* Main Content */}
            <Box sx={{ pt: 22 }}>
                {/* Hero Section */}
                <Container maxWidth="lg" sx={{ mb: 6 }}>
                    <Paper elevation={3} sx={{ 
                        p: 4, 
                        borderRadius: 2, 
                        textAlign: 'center',
                        background: '#e8f5e9',
                    }}>
                        <Typography variant="h1" component="h1" gutterBottom sx={{ 
                            fontWeight: 'bold', 
                            color: '#8C00AF',
                            fontSize: { xs: '3rem', sm: '4rem', md: '5rem' }
                        }}>
                            B.R.A.V.E. Child Inc.
                        </Typography>
                        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'black' }}>
                            Building and Restoring Abilities Via Equine
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4, maxWidth: 800, mx: 'auto', color: '#555' }}>
                            Supporting families through equine therapy funding opportunities
                        </Typography>
                    </Paper>
                </Container>

                {/* Image Gallery */}
                <Container maxWidth="lg" sx={{ mb: 6 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={4} sx={{ overflow: 'hidden', borderRadius: 1 }}>
                                <img 
                                    src={secondHomepageImg} 
                                    alt="Therapy Session" 
                                    style={{ width: '100%', height: 500, objectFit: 'cover' }}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={4} sx={{ overflow: 'hidden', borderRadius: 1 }}>
                                <img 
                                    src={firstHomepageImg} 
                                    alt="Equine Therapy" 
                                    style={{ width: '100%', height: 500, objectFit: 'cover' }}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={4} sx={{ overflow: 'hidden', borderRadius: 1 }}>
                                <img 
                                    src={thirdHomepageImg} 
                                    alt="Children with Horses" 
                                    style={{ width: '100%', height: 500, objectFit: 'cover' }}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>

                {/* Mission Statement */}
                <Container maxWidth="lg" sx={{ mb: 6 }}>
                    <Card elevation={3}>
                        <CardHeader
                            title="Our Mission Statement"
                            sx={{
                                background: 'linear-gradient(135deg, #8C00AF 0%, #6A0085 100%)',
                                color: 'white',
                                textAlign: 'center'
                            }}
                        />
                        <CardContent sx={{ 
                            p: 4, 
                            background: 'linear-gradient(135deg, #F4F141 0%, #FFD43A 100%)',
                            color: 'black'
                        }}>
                            <Typography variant="h6" sx={{ lineHeight: 1.8, textAlign: 'center', fontWeight: 500 }}>
                                B.R.A.V.E. Child, Inc is a non-profit organization created with parents in mind. 
                                We provide opportunities to decrease the cost of equine services and facility fees, 
                                so parents can focus on their child's needs, knowing that financial barriers are removed. 
                                We create fundraising opportunities for families of children with or without disabilities, 
                                enabling them to participate in hippotherapy or equine therapy services.
                            </Typography>
                        </CardContent>
                    </Card>
                </Container>

                {/* Therapy Benefits Section */}
                <Container maxWidth="lg" sx={{ mb: 6 }}>
                    <Grid container spacing={4}>
                        {/* Hippotherapy */}
                        <Grid item xs={12} md={6} className="hippotherapy-section">
                            <Card elevation={4} sx={{ height: '100%' }}>
                                <CardHeader
                                    title="Hippotherapy Benefits"
                                    sx={{
                                        background: 'linear-gradient(135deg, #7FF77F 0%, #4CAF50 100%)',
                                        color: 'black',
                                        fontWeight: 'bold'
                                    }}
                                />
                                <CardContent sx={{ p: 3, backgroundColor: '#E8F5E9' }}>
                                    <Box sx={{ mb: 3 }}>
                                        <img 
                                            src={hippoTherapyImg} 
                                            alt="Hippotherapy" 
                                            style={{ 
                                                width: '100%', 
                                                height: 350, 
                                                objectFit: 'cover',
                                                borderRadius: 12
                                            }}
                                        />
                                    </Box>
                                    <Typography variant="h6" sx={{ lineHeight: 1.6, color: 'black', fontWeight: 500 }}>
                                        Hippotherapy allows children to work on balance, core strength, endurance, 
                                        motor planning, attention to task, and fine motor skills using the horse's 
                                        movement to stimulate the overall body.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Equine Therapy */}
                        <Grid item xs={12} md={6} className="equinetherapy-section">
                            <Card elevation={4} sx={{ height: '100%' }}>
                                <CardHeader
                                    title="Equine Therapy Benefits"
                                    sx={{
                                        background: 'linear-gradient(135deg, #F4F141 0%, #FFD43A 100%)',
                                        color: 'black',
                                        fontWeight: 'bold'
                                    }}
                                />
                                <CardContent sx={{ p: 3, backgroundColor: '#e8f5e9' }}>
                                    <Box sx={{ mb: 3 }}>
                                        <img 
                                            src={equineTherapyImg} 
                                            alt="Equine Therapy" 
                                            style={{ 
                                                width: '100%', 
                                                height: 350, 
                                                objectFit: 'cover',
                                                borderRadius: 12
                                            }}
                                        />
                                    </Box>
                                    <Typography variant="h6" sx={{ lineHeight: 1.6, color: 'black', fontWeight: 500 }}>
                                        Equine therapy involves activities with horses and other equines to promote 
                                        physical, occupational, and emotional growth in persons with disabilities.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>

                {/* How You Can Help Section */}
                <Container maxWidth="lg" sx={{ mb: 6 }}>
                    <Card elevation={4}>
                        <CardHeader
                            title="How You Can Help"
                            sx={{
                                background: 'linear-gradient(135deg, #FE5FCE 0%, #FF78AC 100%)',
                                color: 'black',
                                textAlign: 'center'
                            }}
                        />
                        <CardContent sx={{ p: 4, backgroundColor: '#FE5FCE' }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ 
                                        textAlign: 'center', 
                                        p: 3, 
                                        backgroundColor: 'rgba(255,255,255,0.9)', 
                                        borderRadius: 3,
                                        height: '100%'
                                    }}>
                                        <VolunteerIcon sx={{ fontSize: 80, color: '#8C00AF', mb: 2 }} />
                                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
                                            Become A Sponsor
                                        </Typography>
                                        {/* <Button
                                            href="/sponsor-donations"
                                            variant="contained"
                                            size="large"
                                            sx={{ 
                                                mt: 2,
                                                backgroundColor: '#8C00AF',
                                                '&:hover': { backgroundColor: '#6A0085' },
                                                fontSize: '1.1rem',
                                                py: 1.5,
                                                px: 3
                                            }}
                                        >
                                            Sponsor Now
                                        </Button> */}
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ 
                                        textAlign: 'center', 
                                        p: 3, 
                                        backgroundColor: 'rgba(255,255,255,0.9)', 
                                        borderRadius: 3,
                                        height: '100%'
                                    }}>
                                        <FavoriteIcon sx={{ fontSize: 80, color: '#8C00AF', mb: 2 }} />
                                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
                                            Make a Donation
                                        </Typography>
                                        {/* <Button
                                            href="/sponsor-donations"
                                            variant="contained"
                                            size="large"
                                            sx={{ 
                                                mt: 2,
                                                backgroundColor: '#8C00AF',
                                                '&:hover': { backgroundColor: '#6A0085' },
                                                fontSize: '1.1rem',
                                                py: 1.5,
                                                px: 3
                                            }}
                                        >
                                            Donate Here
                                        </Button> */}
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ 
                                        textAlign: 'center', 
                                        p: 3, 
                                        backgroundColor: 'rgba(255,255,255,0.9)', 
                                        borderRadius: 3,
                                        height: '100%'
                                    }}>
                                        <SchoolIcon sx={{ fontSize: 80, color: '#8C00AF', mb: 2 }} />
                                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
                                            Register Your Child
                                        </Typography>
                                        {/* <Button
                                            href="/learn-more"
                                            variant="contained"
                                            size="large"
                                            sx={{ 
                                                mt: 2,
                                                backgroundColor: '#8C00AF',
                                                '&:hover': { backgroundColor: '#6A0085' },
                                                fontSize: '1.1rem',
                                                py: 1.5,
                                                px: 3
                                            }}
                                        >
                                            Learn More
                                        </Button> */}
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>

                {/* 501c3 Notice */}
                <Container maxWidth="lg" sx={{ mb: 6 }}>
                    <Paper 
                        elevation={3} 
                        sx={{ 
                            p: 4, 
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, #8C00AF 0%, #6A0085 100%)',
                            color: 'white',
                            border: '3px solid #FE5FCE'
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            B.R.A.V.E. Child, Inc is a (IRC) Section 501c (3) organization.
                        </Typography>
                    </Paper>
                </Container>

                {/* Donation Form Section */}
                {/* <Container maxWidth="lg" sx={{ mb: 6 }}>
                    <Card elevation={4}>
                        <CardHeader
                            title="Make a Donation Today"
                            sx={{
                                background: 'linear-gradient(135deg, #8C00AF 0%, #6A0085 100%)',
                                color: 'white',
                                textAlign: 'center'
                            }}
                        />
                        <CardContent sx={{ backgroundColor: '#F4F141' }}>
                            <SponsorDonations onSubmit={handleSubmit} />
                        </CardContent>
                    </Card>
                </Container> */}

                {/* Contact Section */}
                <Container maxWidth="lg" className="contact-section">
                    <Card elevation={4}>
                        <CardHeader
                            title="Contact Information"
                            sx={{
                                background: 'linear-gradient(135deg, #7FF77F 0%, #4CAF50 100%)',
                                color: 'black',
                                textAlign: 'center',
                                fontWeight: 'bold'
                            }}
                        />
                        <CardContent sx={{ p: 4, backgroundColor: '#E8F5E9' }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ 
                                        textAlign: 'center',
                                        p: 3,
                                        backgroundColor: 'rgba(254, 95, 206, 0.1)',
                                        borderRadius: 3,
                                        border: '2px solid #FE5FCE'
                                    }}>
                                        <EmailIcon sx={{ fontSize: 60, color: '#8C00AF', mb: 2 }} />
                                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
                                            Email Us
                                        </Typography>
                                        <Typography variant="h6" sx={{ mb: 2, color: '#555' }}>
                                            BRAVEbfchild@gmail.com
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ 
                                        textAlign: 'center',
                                        p: 3,
                                        backgroundColor: 'rgba(254, 95, 206, 0.1)',
                                        borderRadius: 3,
                                        border: '2px solid #FE5FCE'
                                    }}>
                                        <PhoneIcon sx={{ fontSize: 60, color: '#8C00AF', mb: 2 }} />
                                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
                                            Call Us
                                        </Typography>
                                        <Typography variant="h6" sx={{ mb: 2, color: '#555' }}>
                                            (318) 840-7091
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ 
                                        textAlign: 'center',
                                        p: 3,
                                        backgroundColor: 'rgba(254, 95, 206, 0.1)',
                                        borderRadius: 3,
                                        border: '2px solid #FE5FCE'
                                    }}>
                                        <LocationIcon sx={{ fontSize: 60, color: '#8C00AF', mb: 2 }} />
                                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
                                            Visit Us
                                        </Typography>
                                        <Typography variant="h6" sx={{ color: '#555' }}>
                                            66 Mengle Road<br />
                                            Rayville, LA 71269
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 4, backgroundColor: '#FE5FCE', height: 2 }} />

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
                                    Follow Us on Social Media
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 3 }}>
                                    <IconButton sx={{ 
                                        backgroundColor: '#e8f5e9', 
                                        '&:hover': { backgroundColor: '#D0DCD1', transform: 'scale(1.1)' },
                                        p: 2
                                    }}>
                                        <img 
                                            src="/BRAVEFacebookIcon.png" 
                                            alt="Facebook" 
                                            style={{ width: 50, height: 50 }}
                                        />
                                    </IconButton>
                                    <IconButton sx={{ 
                                        backgroundColor: '#e8f5e9', 
                                        '&:hover': { backgroundColor: '#D0DCD1', transform: 'scale(1.1)' },
                                        p: 2
                                    }}>
                                        <img 
                                            src="/BRAVEInstagramIcon.png" 
                                            alt="Instagram" 
                                            style={{ width: 50, height: 50 }}
                                        />
                                    </IconButton>
                                    <IconButton sx={{ 
                                        backgroundColor: '#e8f5e9', 
                                        '&:hover': { backgroundColor: '#D0DCD1', transform: 'scale(1.1)' },
                                        p: 2
                                    }}>
                                        <img 
                                            src="/BRAVETwitterIcon.png" 
                                            alt="Twitter" 
                                            style={{ width: 50, height: 50 }}
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

export default HomePage;