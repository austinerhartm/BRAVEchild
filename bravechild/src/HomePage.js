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
    IconButton,
    keyframes
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
    LocationOn as LocationIcon,
    Star as StarIcon,
    Pets as PetsIcon
} from '@mui/icons-material';
import auth from './services/auth.service';
import SponsorDonations from './components/SponsorDonations';
import firstHomepageImg from './imgs/first-homepage-imgMod.jpg';
import secondHomepageImg from './imgs/second-homepage-img.jpg';
import thirdHomepageImg from './imgs/third-homepage-img.jpg';
import hippoTherapyImg from './imgs/hippotherapy-img.jpg';
import equineTherapyImg from './imgs/equinetherapy-img.jpg';

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -15px, 0);
  }
  70% {
    transform: translate3d(0, -8px, 0);
  }
  90% {
    transform: translate3d(0, -3px, 0);
  }
`;

const wiggle = keyframes`
  0%, 7% {
    transform: rotateZ(0);
  }
  15% {
    transform: rotateZ(-15deg);
  }
  20% {
    transform: rotateZ(10deg);
  }
  25% {
    transform: rotateZ(-10deg);
  }
  30% {
    transform: rotateZ(6deg);
  }
  35% {
    transform: rotateZ(-4deg);
  }
  40%, 100% {
    transform: rotateZ(0);
  }
`;

const rainbowText = keyframes`
  0% { color: #ff0000; }
  16% { color: #ff8800; }
  33% { color: #ffff00; }
  50% { color: #00ff00; }
  66% { color: #0088ff; }
  83% { color: #8800ff; }
  100% { color: #ff0000; }
`;

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
        <Box sx={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(45deg, #e8f5e9 0%, #f0f8ff 25%, #ffe4e1 50%, #f0fff0 75%, #e8f5e9 100%)',
            backgroundSize: '400% 400%',
            animation: 'gradient-shift 8s ease infinite',
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
                        background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #fd79a8)',
                        backgroundSize: '600% 100%',
                        animation: 'rainbow-nav 6s ease infinite',
                        '@keyframes rainbow-nav': {
                            '0%': { backgroundPosition: '0% 50%' },
                            '100%': { backgroundPosition: '100% 50%' }
                        },
                        boxShadow: isScrolled ? '0 4px 20px rgba(255,105,180,0.4)' : '0 2px 10px rgba(255,105,180,0.2)',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{
                                        animation: `${bounce} 2s infinite`,
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
                                                filter: 'drop-shadow(3px 3px 8px rgba(255,105,180,0.3))'
                                            }}
                                        />
                                    </Box>
                                    <Typography 
                                        variant="h4" 
                                        sx={{ 
                                            background: 'linear-gradient(45deg, #8C00AF, #FF1493, #00CED1, #32CD32)',
                                            backgroundSize: '300% 300%',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            color: 'transparent',
                                            animation: `${rainbowText} 3s linear infinite`,
                                            fontWeight: 'bold',
                                            display: { xs: 'none', sm: 'block' },
                                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                            fontFamily: 'Comic Sans MS, cursive'
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
                        background: 'linear-gradient(90deg, #7FF77F, #FFB347, #FF69B4, #87CEEB, #DDA0DD)',
                        px: 1, 
                        py: 1 
                    }}>
                        <Container maxWidth="xl">
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                                {[
                                    { label: '🏠 Home!' },
                                    { label: '📚 Learn More!', href: '/learn-more' },
                                    { label: '🐴 Hippo Therapy!', action: () => scrollToSection('.hippotherapy-section') },
                                    { label: '✨ Equine Therapy!', action: () => scrollToSection('.equinetherapy-section') },
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
                                            fontFamily: 'Comic Sans MS, cursive',
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
            <Box sx={{ pt: 17 }}>
                {/* Hero Section */}
                <Container maxWidth="xl" sx={{ px: 1, mb: 3 }}>
                    <Paper elevation={10} sx={{ 
                        p: { xs: 2, sm: 3 }, 
                        borderRadius: 4, 
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
                        border: '5px dashed #FF1493',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><text y=\'.9em\' font-size=\'20\'>⭐</text></svg>") repeat',
                            opacity: 0.1,
                            animation: 'float 6s ease-in-out infinite'
                        },
                        '@keyframes float': {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-10px)' }
                        }
                    }}>
                        <Typography variant="h1" component="h1" gutterBottom sx={{ 
                            fontWeight: 'bold', 
                            background: 'linear-gradient(45deg, #8C00AF, #FF1493, #00CED1)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                            fontFamily: 'Comic Sans MS, cursive',
                            textShadow: '3px 3px 0px #fff, 6px 6px 0px rgba(0,0,0,0.2)',
                            transform: 'rotate(-2deg)',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            🌟 B.R.A.V.E. Child Inc. 🌟
                        </Typography>
                        <Typography variant="h4" sx={{ 
                            mb: 2, 
                            fontWeight: 'bold', 
                            color: '#FF1493',
                            fontFamily: 'Comic Sans MS, cursive',
                            textShadow: '2px 2px 4px rgba(255,255,255,0.8)',
                            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                            position: 'relative',
                            zIndex: 1
                        }}>
                            🐴 Building and Restoring Abilities Via Equine! 🐴
                        </Typography>
                        <Typography variant="h6" sx={{ 
                            mb: 3, 
                            maxWidth: 900, 
                            mx: 'auto', 
                            color: '#8B0000',
                            fontFamily: 'Comic Sans MS, cursive',
                            fontSize: { xs: '1rem', sm: '1.2rem' },
                            fontWeight: 600,
                            position: 'relative',
                            zIndex: 1
                        }}>
                            🎉 Where kids and horses become best friends to learn and grow together! 🎉
                        </Typography>
                        
                        <Box sx={{ position: 'absolute', top: '10%', right: '10%', fontSize: '2rem', animation: `${bounce} 2s infinite 0.5s` }}>🦄</Box>
                        <Box sx={{ position: 'absolute', bottom: '15%', left: '5%', fontSize: '2rem', animation: `${bounce} 2s infinite 1s` }}>🌈</Box>
                        <Box sx={{ position: 'absolute', top: '20%', left: '15%', fontSize: '1.5rem', animation: `${wiggle} 3s infinite` }}>⭐</Box>
                        <Box sx={{ position: 'absolute', bottom: '20%', right: '20%', fontSize: '1.5rem', animation: `${wiggle} 3s infinite 1.5s` }}>🎈</Box>
                    </Paper>
                </Container>

                {/* Image Gallery */}
                <Container maxWidth="xl" sx={{ px: 1, mb: 3 }}>
                    <Grid container spacing={2}>
                        {[
                            { img: secondHomepageImg, alt: "Kids Having Fun!", rotation: 'rotate(-2deg)' },
                            { img: firstHomepageImg, alt: "Horse Adventures!", rotation: 'rotate(1deg)' },
                            { img: thirdHomepageImg, alt: "Best Friends Forever!", rotation: 'rotate(-1deg)' }
                        ].map((item, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Paper elevation={8} sx={{ 
                                    overflow: 'hidden', 
                                    borderRadius: 3,
                                    border: '4px solid #FF69B4',
                                    transform: item.rotation,
                                    transition: 'transform 0.3s ease',
                                    '&:hover': { 
                                        transform: 'rotate(0deg) scale(1.05)',
                                        boxShadow: '0 10px 30px rgba(255,105,180,0.5)'
                                    }
                                }}>
                                    <img 
                                        src={item.img} 
                                        alt={item.alt}
                                        style={{ width: '100%', height: 350, objectFit: 'cover' }}
                                    />
                                    <Box sx={{ 
                                        position: 'absolute', 
                                        bottom: 0, 
                                        left: 0, 
                                        right: 0, 
                                        background: 'rgba(255,105,180,0.9)', 
                                        color: 'white', 
                                        p: 1, 
                                        textAlign: 'center',
                                        fontFamily: 'Comic Sans MS, cursive',
                                        fontWeight: 'bold'
                                    }}>
                                        {item.alt}
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                {/* Mission Statement */}
                <Container maxWidth="xl" sx={{ px: 1, mb: 3 }}>
                    <Card elevation={8} sx={{ 
                        borderRadius: 4,
                        border: '3px solid #FF1493',
                        transform: 'rotate(-1deg)',
                        '&:hover': { transform: 'rotate(0deg)' },
                        transition: 'transform 0.3s ease'
                    }}>
                        <CardHeader
                            title="🎯 Our Super Cool Mission! 🎯"
                            sx={{
                                background: 'linear-gradient(135deg, #8C00AF 0%, #6A0085 100%)',
                                color: 'white',
                                textAlign: 'center',
                                fontFamily: 'Comic Sans MS, cursive'
                            }}
                        />
                        <CardContent sx={{ 
                            p: { xs: 2, sm: 3 }, 
                            background: 'linear-gradient(135deg, #F4F141 0%, #FFD43A 100%)',
                            color: 'black'
                        }}>
                            <Typography variant="h6" sx={{ 
                                lineHeight: 1.8, 
                                textAlign: 'center', 
                                fontWeight: 600,
                                fontFamily: 'Comic Sans MS, cursive',
                                fontSize: { xs: '1rem', sm: '1.2rem' }
                            }}>
                                B.R.A.V.E. Child, Inc is a non-profit organization created with parents in mind. We provide opportunities to decrease the cost of equine services and facility fees, so parents can focus on their child's needs, knowing that financial barriers are removed. We create fundraising opportunities for families of children with or without disabilities, enabling them to participate in hippotherapy or equine therapy services.
                            </Typography>
                        </CardContent>
                    </Card>
                </Container>

                {/* Therapy Benefits Section */}
                <Container maxWidth="xl" sx={{ px: 1, mb: 3 }}>
                    <Grid container spacing={3}>
                        {/* Hippotherapy */}
                        <Grid item xs={12} md={6} className="hippotherapy-section">
                            <Card elevation={8} sx={{ 
                                height: '100%',
                                borderRadius: 4,
                                border: '3px solid #7FF77F',
                                transform: 'rotate(1deg)',
                                '&:hover': { transform: 'rotate(0deg) scale(1.02)' },
                                transition: 'all 0.3s ease'
                            }}>
                                <CardHeader
                                    title="🐴 Hippotherapy Magic! 🌟"
                                    sx={{
                                        background: 'linear-gradient(135deg, #7FF77F 0%, #4CAF50 100%)',
                                        color: 'black',
                                        fontWeight: 'bold',
                                        fontFamily: 'Comic Sans MS, cursive'
                                    }}
                                />
                                <CardContent sx={{ p: 2, backgroundColor: '#E8F5E9' }}>
                                    <Box sx={{ mb: 2, position: 'relative' }}>
                                        <img 
                                            src={hippoTherapyImg} 
                                            alt="Hippotherapy Fun" 
                                            style={{ 
                                                width: '100%', 
                                                height: 250, 
                                                objectFit: 'cover',
                                                borderRadius: 12,
                                                border: '3px solid #FF69B4'
                                            }}
                                        />
                                        <Chip 
                                            label="🎉 So Cool!" 
                                            sx={{ 
                                                position: 'absolute', 
                                                top: 10, 
                                                right: 10,
                                                backgroundColor: '#FF69B4',
                                                color: 'white',
                                                fontFamily: 'Comic Sans MS, cursive',
                                                fontWeight: 'bold'
                                            }} 
                                        />
                                    </Box>
                                    <Typography variant="h6" sx={{ 
                                        lineHeight: 1.6, 
                                        color: 'black', 
                                        fontWeight: 500,
                                        fontFamily: 'Comic Sans MS, cursive',
                                        fontSize: { xs: '0.9rem', sm: '1.1rem' }
                                    }}>
                                        Hippotherapy allows children to work on balance, core strength, endurance, motor planning, attention to task, and fine motor skills using the horse's movement to stimulate the overall body.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Equine Therapy */}
                        <Grid item xs={12} md={6} className="equinetherapy-section">
                            <Card elevation={8} sx={{ 
                                height: '100%',
                                borderRadius: 4,
                                border: '3px solid #F4F141',
                                transform: 'rotate(-1deg)',
                                '&:hover': { transform: 'rotate(0deg) scale(1.02)' },
                                transition: 'all 0.3s ease'
                            }}>
                                <CardHeader
                                    title="✨ Equine Therapy Adventures! 🦄"
                                    sx={{
                                        background: 'linear-gradient(135deg, #F4F141 0%, #FFD43A 100%)',
                                        color: 'black',
                                        fontWeight: 'bold',
                                        fontFamily: 'Comic Sans MS, cursive'
                                    }}
                                />
                                <CardContent sx={{ p: 2, backgroundColor: '#e8f5e9' }}>
                                    <Box sx={{ mb: 2, position: 'relative' }}>
                                        <img 
                                            src={equineTherapyImg} 
                                            alt="Equine Therapy Adventures" 
                                            style={{ 
                                                width: '100%', 
                                                height: 250, 
                                                objectFit: 'cover',
                                                borderRadius: 12,
                                                border: '3px solid #FF69B4'
                                            }}
                                        />
                                        <Chip 
                                            label="🌈 Amazing!" 
                                            sx={{ 
                                                position: 'absolute', 
                                                top: 10, 
                                                right: 10,
                                                backgroundColor: '#FF69B4',
                                                color: 'white',
                                                fontFamily: 'Comic Sans MS, cursive',
                                                fontWeight: 'bold'
                                            }} 
                                        />
                                    </Box>
                                    <Typography variant="h6" sx={{ 
                                        lineHeight: 1.6, 
                                        color: 'black', 
                                        backgroundColor: '#e8f5e9',
                                        fontWeight: 500,
                                        fontFamily: 'Comic Sans MS, cursive',
                                        fontSize: { xs: '0.9rem', sm: '1.1rem' }
                                    }}>
                                        Equine therapy involves activities with horses and other equines to promote physical, occupational, and emotional growth in persons with disabilities. Allowing children to develop their skills.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>

                {/* How You Can Help Section */}
                <Container maxWidth="xl" sx={{ px: 1, mb: 3 }}>
                    <Card elevation={10} sx={{ 
                        borderRadius: 4,
                        border: '4px solid #FE5FCE',
                        transform: 'rotate(0.5deg)',
                        '&:hover': { transform: 'rotate(0deg)' },
                        transition: 'transform 0.3s ease'
                    }}>
                        <CardHeader
                            title="🤝 How YOU Can Be a HERO! 🦸‍♀️🦸‍♂️"
                            sx={{
                                background: 'linear-gradient(135deg, #FE5FCE 0%, #FF78AC 100%)',
                                color: 'white',
                                textAlign: 'center',
                                fontFamily: 'Comic Sans MS, cursive',
                                fontSize: '1.2rem'
                            }}
                        />
                        <CardContent sx={{ p: { xs: 2, sm: 3 }, backgroundColor: '#FE5FCE' }}>
                            <Grid container spacing={3}>
                                {[
                                    { icon: VolunteerIcon, title: "🎪 Become A Super Sponsor!", desc: "Help kids achieve their dreams!" },
                                    { icon: FavoriteIcon, title: "💝 Spread the Love!", desc: "Every donation makes magic happen!" },
                                    { icon: SchoolIcon, title: "🎓 Join Our Horse Family!", desc: "Sign up your kiddo for adventures!" }
                                ].map((item, index) => (
                                    <Grid item xs={12} md={4} key={index}>
                                        <Box sx={{ 
                                            textAlign: 'center', 
                                            p: 2, 
                                            backgroundColor: 'rgba(255,255,255,0.95)', 
                                            borderRadius: 4,
                                            height: '100%',
                                            border: '3px dashed #8C00AF',
                                            transform: `rotate(${(index - 1) * 2}deg)`,
                                            '&:hover': { 
                                                transform: 'rotate(0deg) scale(1.05)',
                                                boxShadow: '0 10px 25px rgba(255,105,180,0.4)'
                                            },
                                            transition: 'all 0.3s ease'
                                        }}>
                                            <Box sx={{ fontSize: '4rem', mb: 1 }}>{item.emoji}</Box>
                                            <item.icon sx={{ fontSize: 60, color: '#8C00AF', mb: 1 }} />
                                            <Typography variant="h5" gutterBottom sx={{ 
                                                fontWeight: 'bold', 
                                                color: 'black',
                                                fontFamily: 'Comic Sans MS, cursive',
                                                fontSize: { xs: '1.1rem', sm: '1.3rem' }
                                            }}>
                                                {item.title}
                                            </Typography>
                                            <Typography sx={{ 
                                                color: '#555',
                                                fontFamily: 'Comic Sans MS, cursive',
                                                fontWeight: 600
                                            }}>
                                                {item.desc}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>

                {/* 501c3 Notice */}
                <Container maxWidth="xl" sx={{ px: 1, mb: 3 }}>
                    <Paper 
                        elevation={8} 
                        sx={{ 
                            p: { xs: 2, sm: 3 }, 
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, #8C00AF 0%, #6A0085 100%)',
                            color: 'white',
                            border: '4px solid #FE5FCE',
                            borderRadius: 4,
                        }}
                    >
                        <Typography variant="h5" sx={{ 
                            fontWeight: 'bold',
                            fontFamily: 'Comic Sans MS, cursive',
                            fontSize: { xs: '1.1rem', sm: '1.3rem' }
                        }}>
                            B.R.A.V.E. Child, Inc is a 501c(3) organization
                        </Typography>
                        <Typography sx={{ 
                            mt: 1, 
                            fontFamily: 'Comic Sans MS, cursive' 
                        }}>
                        </Typography>
                    </Paper>
                </Container>

                {/* Contact Section */}
                <Container maxWidth="xl" sx={{ px: 1 }} className="contact-section">
                    <Card elevation={10} sx={{ 
                        borderRadius: 4,
                        border: '4px solid #7FF77F'
                    }}>
                        <CardHeader
                            title="Contact Us"
                            sx={{
                                background: 'linear-gradient(135deg, #7FF77F 0%, #4CAF50 100%)',
                                color: 'black',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontFamily: 'Comic Sans MS, cursive'
                            }}
                        />
                        <CardContent sx={{ p: { xs: 2, sm: 3 }, backgroundColor: '#E8F5E9' }}>
                            <Grid container spacing={3}>
                                {[
                                    { 
                                        icon: EmailIcon, 
                                        title: "Send Us a Message!", 
                                        info: "BRAVEbfchild@gmail.com",
                                        bgColor: 'rgba(255, 182, 193, 0.3)'
                                    },
                                    { 
                                        icon: PhoneIcon, 
                                        title: "Give Us a Ring!", 
                                        info: "(318) 840-7091",
                                        bgColor: 'rgba(173, 216, 230, 0.3)'
                                    },
                                    { 
                                        icon: LocationIcon, 
                                        title: "Come Visit Us!", 
                                        info: "66 Mengle Road, Rayville, LA 71269",
                                        bgColor: 'rgba(255, 218, 185, 0.3)'
                                    }
                                ].map((item, index) => (
                                    <Grid item xs={12} md={4} key={index}>
                                        <Box sx={{ 
                                            textAlign: 'center',
                                            p: 3,
                                            backgroundColor: item.bgColor,
                                            borderRadius: 4,
                                            border: '3px dashed #FE5FCE',
                                            height: '100%',
                                            transform: `rotate(${(index - 1) * 1.5}deg)`,
                                            '&:hover': { 
                                                transform: 'rotate(0deg) scale(1.05)',
                                                boxShadow: '0 8px 25px rgba(255,105,180,0.3)'
                                            },
                                            transition: 'all 0.3s ease'
                                        }}>
                                            <Box sx={{ fontSize: '3rem', mb: 1 }}>{item.emoji}</Box>
                                            <item.icon sx={{ fontSize: 50, color: '#8C00AF', mb: 2 }} />
                                            <Typography variant="h5" gutterBottom sx={{ 
                                                fontWeight: 'bold', 
                                                color: 'black',
                                                fontFamily: 'Comic Sans MS, cursive',
                                                fontSize: { xs: '1.1rem', sm: '1.2rem' }
                                            }}>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="h6" sx={{ 
                                                color: '#555',
                                                fontFamily: 'Comic Sans MS, cursive',
                                                fontWeight: 600,
                                                fontSize: { xs: '0.9rem', sm: '1rem' }
                                            }}>
                                                {item.info}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>

                            <Divider sx={{ 
                                my: 4, 
                                backgroundColor: '#FE5FCE', 
                                height: 3,
                                borderRadius: 2
                            }} />

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h5" gutterBottom sx={{ 
                                    fontWeight: 'bold', 
                                    color: 'black',
                                    fontFamily: 'Comic Sans MS, cursive',
                                    mb: 3
                                }}>
                                    🌟 Follow Our Adventures on Social Media! 🌟
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 3, flexWrap: 'wrap' }}>
                                    {[
                                        { src: "/BRAVEFacebookIcon.png", alt: "Facebook" },
                                        { src: "/BRAVEInstagramIcon.png", alt: "Instagram" },
                                        { src: "/BRAVETwitterIcon.png", alt: "Twitter" }
                                    ].map((social, index) => (
                                        <Box key={index} sx={{ textAlign: 'center' }}>
                                            <IconButton sx={{ 
                                                backgroundColor: '#e8f5e9', 
                                                border: '3px solid #FF69B4',
                                                borderRadius: 3,
                                                p: 2,
                                                transform: `rotate(${(index - 1) * 5}deg)`,
                                                '&:hover': { 
                                                    backgroundColor: '#D0DCD1', 
                                                    transform: 'scale(1.2) rotate(0deg)',
                                                    boxShadow: '0 8px 20px rgba(255,105,180,0.4)'
                                                },
                                                transition: 'all 0.3s ease',
                                                animation: `${bounce} 2s infinite ${index * 0.5}s`
                                            }}>
                                                <img 
                                                    src={social.src} 
                                                    alt={social.alt}
                                                    style={{ width: 40, height: 40 }}
                                                />
                                            </IconButton>
                                            <Typography sx={{ 
                                                mt: 1, 
                                                fontFamily: 'Comic Sans MS, cursive',
                                                fontWeight: 'bold',
                                                color: '#8C00AF',
                                                fontSize: '0.9rem'
                                            }}>
                                                {social.emoji} {social.alt}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                                
                                {/* Decorative elements */}
                                <Box sx={{ mt: 4, position: 'relative', height: '60px' }}>
                                    <Box sx={{ 
                                        position: 'absolute', 
                                        left: '10%', 
                                        fontSize: '2rem', 
                                        animation: `${bounce} 2s infinite` 
                                    }}>
                                        🎉
                                    </Box>
                                    <Box sx={{ 
                                        position: 'absolute', 
                                        right: '10%', 
                                        fontSize: '2rem', 
                                        animation: `${bounce} 2s infinite 1s` 
                                    }}>
                                        🎈
                                    </Box>
                                    <Box sx={{ 
                                        position: 'absolute', 
                                        left: '30%', 
                                        fontSize: '1.5rem', 
                                        animation: `${wiggle} 3s infinite` 
                                    }}>
                                        🌈
                                    </Box>
                                    <Box sx={{ 
                                        position: 'absolute', 
                                        right: '30%', 
                                        fontSize: '1.5rem', 
                                        animation: `${wiggle} 3s infinite 1.5s` 
                                    }}>
                                        ⭐
                                    </Box>
                                    <Box sx={{ 
                                        position: 'absolute', 
                                        left: '50%', 
                                        transform: 'translateX(-50%)',
                                        fontSize: '2.5rem', 
                                        animation: `${bounce} 2s infinite 0.5s` 
                                    }}>
                                        🦄
                                    </Box>
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