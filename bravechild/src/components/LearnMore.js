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
    AccordionDetails,
    keyframes
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
    Groups as GroupsIcon,
    Star as StarIcon,
    Favorite as FavoriteIcon
} from '@mui/icons-material';

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
`;

const wiggle = keyframes`
  0%, 7% {
    transform: rotateZ(0);
  }
  15% {
    transform: rotateZ(-8deg);
  }
  20% {
    transform: rotateZ(5deg);
  }
  25% {
    transform: rotateZ(-5deg);
  }
  30% {
    transform: rotateZ(3deg);
  }
  35% {
    transform: rotateZ(-2deg);
  }
  40%, 100% {
    transform: rotateZ(0);
  }
`;

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
        <Accordion 
            elevation={3} 
            sx={{ 
                mb: 3, 
                '&:before': { display: 'none' },
                borderRadius: 2,
                border: '2px solid #FFB6C1',
                '&:hover': {
                    transform: 'scale(1.01)',
                    boxShadow: '0 6px 20px rgba(255,182,193,0.3)'
                },
                transition: 'all 0.3s ease'
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main', fontSize: 30 }} />}
                aria-controls="panel-content"
                id="panel-header"
                sx={{
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                    borderRadius: '8px 8px 0 0',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%)'
                    },
                    '& .MuiAccordionSummary-content': {
                        margin: '16px 0'
                    }
                }}
            >
                <Typography variant="h6" sx={{ 
                    fontWeight: 700, 
                    color: '#8C00AF',
                    fontSize: { xs: '1.1rem', sm: '1.25rem' }
                }}>
                    {question}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 4, backgroundColor: '#fafbfc' }}>
                <Box>
                    <Typography variant="body1" sx={{ 
                        lineHeight: 1.8, 
                        mb: 2,
                        fontSize: '1.1rem',
                        color: '#333',
                        fontWeight: 500
                    }}>
                        {answer}
                    </Typography>
                    {answer2 && (
                        <Typography variant="body1" sx={{ 
                            lineHeight: 1.8,
                            fontSize: '1.1rem',
                            color: '#333',
                            fontWeight: 500
                        }}>
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
    
    const scrollToSection = (selector) => {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(45deg, #e8f5e9 0%, #f0f8ff 30%, #ffe4e1 60%, #f0fff0 100%)',
            backgroundSize: '300% 300%',
            animation: 'gradient-shift 10s ease infinite',
            '@keyframes gradient-shift': {
                '0%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
                '100%': { backgroundPosition: '0% 50%' }
            }
        }}>
            {/* Navigation Bar */}
            <HideOnScroll>
                <AppBar 
                    position="fixed" 
                    sx={{ 
                        background: 'linear-gradient(90deg, #ff9a9e, #fecfef, #a8edea, #fed6e3)',
                        backgroundSize: '400% 100%',
                        animation: 'rainbow-nav 8s ease infinite',
                        '@keyframes rainbow-nav': {
                            '0%': { backgroundPosition: '0% 50%' },
                            '100%': { backgroundPosition: '100% 50%' }
                        },
                        boxShadow: isScrolled ? '0 4px 20px rgba(255,105,180,0.3)' : '0 2px 10px rgba(255,105,180,0.2)',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{
                                        animation: `${bounce} 3s infinite`,
                                        '&:hover': {
                                            animation: `${wiggle} 0.8s ease-in-out`
                                        }
                                    }}>
                                        <img 
                                            src="/BRAVEPic.png" 
                                            alt="BRAVE Logo" 
                                            style={{ 
                                                height: 70, 
                                                marginRight: 16,
                                                filter: 'drop-shadow(2px 2px 6px rgba(255,105,180,0.3))'
                                            }}
                                        />
                                    </Box>
                                    <Typography 
                                        variant="h4" 
                                        sx={{ 
                                            color: '#8C00AF',
                                            fontWeight: 'bold',
                                            display: { xs: 'none', sm: 'block' },
                                            textShadow: '1px 1px 3px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        B.R.A.V.E. Child Inc.
                                    </Typography>
                                </Box>
                            </Link>
                        </Box>
                    </Toolbar>

                    {/* Secondary Navigation */}
                    <Box sx={{ 
                        background: 'linear-gradient(90deg, #7FF77F, #FFB347, #FF69B4)',
                        px: 1, 
                        py: 1.5 
                    }}>
                        <Container maxWidth="xl">
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                                {[
                                    { label: '🏠 Home!', href: '/' },
                                    { label: '❔ FAQ!', action: () => scrollToSection('.faq-section') },
                                    { label: '📞 Contact Us!', action: () => scrollToSection('.contact-section') }
                                ].map((item, index) => (
                                    <Button
                                        key={index}
                                        onClick={item.action}
                                        href={item.href}
                                        sx={{ 
                                            color: 'white', 
                                            fontWeight: 'bold',
                                            backgroundColor: 'rgba(140, 0, 175, 0.8)',
                                            borderRadius: '25px',
                                            px: 3,
                                            py: 1,
                                            fontSize: { xs: '0.7rem', sm: '0.9rem' },
                                            transform: 'rotate(' + (Math.random() * 4 - 2) + 'deg)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': { 
                                                backgroundColor: '#7E009D',
                                                transform: 'scale(1.1) rotate(0deg)',
                                                boxShadow: '0 5px 15px rgba(255,105,180,0.4)'
                                            }
                                        }}
                                        size="small"
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </Box>
                        </Container>
                    </Box>
                </AppBar>
            </HideOnScroll>
            
            {/* Main Content */}
            <Box sx={{ pt: 18 }}>
                {/* Hero Section */}
                <Container maxWidth="xl" sx={{ px: 1, mb: 4 }}>
                    <Paper elevation={6} sx={{ 
                        p: { xs: 3, sm: 4 }, 
                        borderRadius: 3, 
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
                        border: '3px solid #FF69B4',
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><text y=\'.9em\' font-size=\'15\'>⭐</text></svg>") repeat',
                            opacity: 0.05,
                            animation: 'float 8s ease-in-out infinite'
                        },
                        '@keyframes float': {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-8px)' }
                        }
                    }}>
                        <Chip 
                            label="Learn About Our Amazing Programs" 
                            sx={{ 
                                mb: 3, 
                                fontSize: '1.1rem', 
                                py: 3, 
                                px: 3,
                                backgroundColor: '#8C00AF',
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        />
                        <Typography variant="h2" component="h1" gutterBottom sx={{
                            color: '#8C00AF',
                            fontWeight: 'bold',
                            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                            textShadow: '2px 2px 4px rgba(255,255,255,0.8)',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            About Our Program
                        </Typography>
                        <Typography variant="h6" sx={{ 
                            mb: 4, 
                            maxWidth: 900, 
                            mx: 'auto',
                            color: '#8B0000',
                            fontSize: { xs: '1.1rem', sm: '1.3rem' },
                            fontWeight: 600,
                            position: 'relative',
                            zIndex: 1
                        }}>
                            Discover how B.R.A.V.E. Child Inc. creates amazing opportunities for families to access equine therapy services
                        </Typography>
                    </Paper>
                </Container>
                
                {/* FAQ Section */}
                <Container maxWidth="xl" sx={{ px: 1, mb: 4 }} className='faq-section'>
                    <Card elevation={6} sx={{ 
                        borderRadius: 3,
                        border: '2px solid #FFB6C1'
                    }}>
                        <CardHeader
                            title="Frequently Asked Questions"
                            sx={{
                                background: 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)',
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: '1.5rem'
                            }}
                        />
                        <CardContent sx={{ p: { xs: 2, sm: 4 }, backgroundColor: '#fafbfc' }}>
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
                                question="How does the Number Fundraiser work?"
                                answer="The Number Fundraiser is a unique system where supporters can choose specific numbers to donate. Each number corresponds to a dollar amount - for example, selecting number 25 means donating $25."
                                answer2="This makes it easy for friends and family to contribute meaningful amounts while tracking progress toward your child's therapy goals."
                            />
                            <ModernFAQ
                                question="What services does B.R.A.V.E. Child, Inc. help fund?"
                                answer="We help families access hippotherapy and equine therapy services. These services help children work on balance, core strength, endurance, motor planning, attention to task, and fine motor skills."
                                answer2="Our funding helps remove financial barriers so parents can focus on their child's therapeutic needs rather than worrying about costs."
                            />
                        </CardContent>
                    </Card>
                </Container>

                {/* What We Offer Section */}
                <Container maxWidth="xl" sx={{ px: 1, mb: 4 }}>
                    <Card elevation={6} sx={{ 
                        borderRadius: 3,
                        border: '2px solid #7FF77F'
                    }}>
                        <CardHeader
                            title="What We Offer"
                            sx={{
                                background: 'linear-gradient(135deg, #7FF77F 0%, #4CAF50 100%)',
                                color: 'black',
                                textAlign: 'center',
                                fontWeight: 'bold'
                            }}
                        />
                        <CardContent sx={{ p: { xs: 2, sm: 4 }, backgroundColor: '#f8fff8' }}>
                            <Grid container spacing={4}>
                                {[
                                    {
                                        icon: CheckCircleIcon,
                                        title: "Personal Fundraising Opportunities",
                                        desc: "Individual fundraising opportunities designed specifically for your child's therapy needs",
                                        color: '#FF69B4'
                                    },
                                    {
                                        icon: GroupsIcon,
                                        title: "Community Fundraising Events",
                                        desc: "Fun community events including bake sales, Easter egg delivery, and Christmas ornament sales",
                                        color: '#32CD32'
                                    },
                                    {
                                        icon: VolunteerIcon,
                                        title: "Sponsorship Connections",
                                        desc: "Connect with generous sponsors who want to support equine therapy for children in need",
                                        color: '#FF8C00'
                                    }
                                ].map((item, index) => (
                                    <Grid item xs={12} md={4} key={index}>
                                        <Box sx={{ 
                                            textAlign: 'center', 
                                            p: 3,
                                            height: '100%',
                                            backgroundColor: 'rgba(255,255,255,0.8)',
                                            borderRadius: 3,
                                            border: '2px solid #FFB6C1',
                                            transform: `rotate(${(index - 1) * 1}deg)`,
                                            '&:hover': {
                                                transform: 'rotate(0deg) scale(1.03)',
                                                boxShadow: '0 8px 25px rgba(255,182,193,0.3)'
                                            },
                                            transition: 'all 0.3s ease'
                                        }}>
                                            <item.icon sx={{ 
                                                fontSize: 50, 
                                                color: item.color, 
                                                mb: 2,
                                                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
                                            }} />
                                            <Typography variant="h6" gutterBottom sx={{
                                                fontWeight: 'bold',
                                                color: '#8C00AF'
                                            }}>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body1" sx={{ 
                                                mb: 2,
                                                color: '#333',
                                                fontWeight: 500,
                                                fontSize: '1.05rem',
                                                whiteSpace: 'pre-line'
                                            }}>
                                                {item.title}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>

                            <Divider sx={{ 
                                my: 4, 
                                backgroundColor: '#32CD32', 
                                height: 2,
                                borderRadius: 1
                            }} />

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" gutterBottom sx={{
                                    fontWeight: 'bold',
                                    color: '#8C00AF',
                                    mb: 3
                                }}>
                                    Follow Our Journey on Social Media
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 3, flexWrap: 'wrap' }}>
                                    {[
                                        { src: "/BRAVEFacebookIcon.png", alt: "Facebook", label: "Facebook" },
                                        { src: "/BRAVEInstagramIcon.png", alt: "Instagram", label: "Instagram" },
                                        { src: "/BRAVETwitterIcon.png", alt: "Twitter", label: "Twitter" }
                                    ].map((social, index) => (
                                        <Box key={index} sx={{ textAlign: 'center' }}>
                                            <IconButton sx={{ 
                                                backgroundColor: '#f8fff8', 
                                                border: '2px solid #FF69B4',
                                                borderRadius: 2,
                                                p: 2,
                                                transform: `rotate(${(index - 1) * 3}deg)`,
                                                '&:hover': { 
                                                    backgroundColor: '#e8f5e9', 
                                                    transform: 'scale(1.15) rotate(0deg)',
                                                    boxShadow: '0 6px 20px rgba(255,105,180,0.3)'
                                                },
                                                transition: 'all 0.3s ease',
                                                animation: `${bounce} 3s infinite ${index * 0.5}s`
                                            }}>
                                                <img 
                                                    src={social.src} 
                                                    alt={social.alt}
                                                    style={{ width: 35, height: 35 }}
                                                />
                                            </IconButton>
                                            <Typography sx={{ 
                                                mt: 1, 
                                                fontWeight: 600,
                                                color: '#8C00AF',
                                                fontSize: '0.9rem'
                                            }}>
                                                {social.label}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                            
                            <Grid container spacing={4} justifyContent="center" textAlign={"center"}>
                                <Grid item xs={12} sm={4}>
                                    <Box sx={{ 
                                        p: 3, 
                                        backgroundColor: 'rgba(255,255,255,0.8)',
                                        borderRadius: 3,
                                        border: '2px solid #FFB6C1',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: '0 8px 25px rgba(255,182,193,0.3)'
                                        },
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <EmailIcon sx={{ fontSize: 40, color: '#FF69B4', mb: 2 }} />
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#8C00AF' }}>
                                            Email Us
                                        </Typography>
                                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 500 }}>
                                            BRAVEbfchild@gmail.com
                                        </Typography>
                                    </Box>
                                </Grid>
                                
                                <Grid item xs={12} sm={4} className="contact-section">
                                    <Box sx={{ 
                                        p: 3, 
                                        backgroundColor: 'rgba(255,255,255,0.8)',
                                        borderRadius: 3,
                                        border: '2px solid #32CD32',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: '0 8px 25px rgba(50,205,50,0.3)'
                                        },
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <PhoneIcon sx={{ fontSize: 40, color: '#32CD32', mb: 2 }} />
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#8C00AF' }}>
                                            Call Us
                                        </Typography>
                                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 500 }}>
                                            (318) 840-7091
                                        </Typography>
                                    </Box>
                                </Grid>
                                
                                <Grid item xs={12} sm={4}>
                                    <Box sx={{ 
                                        p: 3, 
                                        backgroundColor: 'rgba(255,255,255,0.8)',
                                        borderRadius: 3,
                                        border: '2px solid #FF8C00',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: '0 8px 25px rgba(255,140,0,0.3)'
                                        },
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <LocationIcon sx={{ fontSize: 40, color: '#FF8C00', mb: 2 }} />
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#8C00AF' }}>
                                            Visit Us
                                        </Typography>
                                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 500 }}>
                                            66 Mengle Road<br />Rayville, LA 71269
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </Box>
    );
};

export default LearnMore;