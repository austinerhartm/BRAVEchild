import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import auth from './services/auth.service';
import SponsorDonations from './components/SponsorDonations';
import firstHomepageImg from './imgs/first-homepage-imgMod.jpg';
import secondHomepageImg from './imgs/second-homepage-img.jpg';
import thirdHomepageImg from './imgs/third-homepage-img.jpg';
import hippoTherapyImg from './imgs/hippotherapy-img.jpg';
import equineTherapyImg from './imgs/equinetherapy-img.jpg';
import bannerImg from './imgs/banner-img.jpg';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate(); 
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => () => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSubmit = (e, formData) => {
        e.preventDefault(); 
        navigate('/sponsor-donations', { state: formData });
    };

    return (
        <div className="page-container">
            <div className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
                <div className="navbar">
                    <div className="navbar-title">
                        <div className="navbar-logo">
                            <Link to="/"><img src="/BRAVEPic.png" alt="logo" /></Link>
                        </div>
                    </div>
                    <div className="navbar-list">
                        <ul>
                            {!auth.isAuthenticated() ? (
                                <li><a href="/login">Login</a></li>
                            ) : (
                                <li><a href="/super/secret/page">Dashboard</a></li>
                            )}
                            <div className="navbar-divider-vertical"></div>
                            {!auth.isAuthenticated() ? (
                                <li><a href="/create-user">Create User</a></li>
                            ) : (
                                    <li> <a href="/" onClick={ async (e) => { e.preventDefault(); await auth.logout(); window.location.href = '/'; }}>Logout</a></li>
                            )}
                            <div className="navbar-divider-vertical"></div>
                            <li><a href="/sponsor-donations">Donate Here</a></li>
                        </ul>
                    </div>
                    <div className="navbar-bottom-list">
                        <ul>
                            <li><a href="#top" onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}>Home</a></li>
                            <li><a href="hippotherapy" onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('.hippotherapy-container').scrollIntoView({ behavior: 'smooth' });
                            }}>Hippotherapy</a></li>
                            <li><a href="#equinetherapy" onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('.equinetherapy-container').scrollIntoView({ behavior: 'smooth' });
                            }}>Equine Therapy</a></li>
                            <li><a href="#contact" onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('.footer').scrollIntoView({ behavior: 'smooth' });
                            }}>Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="whoweare-container">
                <h2>B.R.A.V.E. Child Inc.</h2>
                <h2>Building and Restoring Abilities Via Equine</h2>
            </div>

            <div className="first-homepage-img-container">
                <img src={secondHomepageImg} alt="second-homepage-img" />
                <img src={firstHomepageImg} alt="first-homepage-img" />
                <img src={thirdHomepageImg} alt="third-homepage-img" />
            </div>

            <div className="mission-statement-container">
                <div className="mission-statement-text-content">
                    <h2>Our Mission Statement</h2>
                    <p>B.R.A.V.E. Child, Inc is a non-profit organization that was created and designed
                        with parents in mind. By providing opportunites to decrease the cost of equine services
                        and facility fees. So, parents can focus on their child and their child's needs,
                        knowing that financial barriers to receiving these services are removed .B.R.A.V.E.
                        Child, Inc creates fundraising opportunities for families of children with or without
                        disabilities, enabling them to participate in hippotherapy or equine therapy services.
                    </p>
                </div>
            </div>
            
            <div className="hippotherapy-container">
                <div className="hippotherapy-text-content">
                    <h2>Hippotherapy Benefits</h2>
                    <p>Hippotherapy allows the child to work on balance, core strength,
                        endurance, motor planning, attention to task, and fine 
                        motor skills using the horse's movement to stimulate the overall body.
                    </p>
                </div>
                <div className="hippotherapy-img">
                    <img src={hippoTherapyImg} alt="hippotherapy-img" />
                </div>
            </div>

            <div className="equinetherapy-container">
                <div className="equinetherapy-text-content">
                    <h2>Equine-therapy Benefits</h2>
                    <p>Equine therapy is a type of therapy that involves activities with horses
                    and other equines to promote physical, occupational, and emotional growth
                    in persons with disabilities.
                    </p>
                </div>
                <div className="equinetherapy-img">
                    <img src={equineTherapyImg} alt="equinetherapy-img" />
                </div>
            </div>

            <div className="how-can-you-help-container">
                <div className="how-can-you-help-sponsor">
                    <h2>Become A Sponsor</h2>
                    <button><a href="/sponsor-donations">Donate Here</a></button>
                </div>
                <div className="navbar-divider-vertical-how-help"></div>
                <div className="how-can-you-help-donate">
                    <h2>Make a Donation</h2>
                    <button><a href="/sponsor-donations">Donate Here</a></button>
                </div>
                <div className="navbar-divider-vertical-how-help"></div>
                <div className="how-can-you-help-enroll">
                    <h2>Register Your Child Today!</h2>
                    <button><a href="/learn-more">Enroll Your Child</a></button>
                </div>
            </div>

            <div className="brave-501c-container">
                <div className="brave-501c-container-text">
                    <p>B.R.A.V.E. Child, Inc is a (IRC) Section 501c (3) organization.
                    </p>
                </div>
            </div>

            <div className="dono-container">
                    <SponsorDonations 
                        onSubmit={handleSubmit}
                    />
                </div>

            

           {/* <div className="footer">
                <div className="footer-section">
                    <h2>Contact Us</h2>
                    <p>Email: BRAVEbfchild@gmail.com</p>
                    <p>Phone: (318) 840-7091</p>
                    <p>Address: 66 Mengle Road Rayville, LA 71269</p>
                </div>

                <div className="footer-section">
                    <h2>Quick Links</h2>
                    <p><a href="#home">Home</a></p>
                    <p><a href="#about">About Us</a></p>
                    <p><a href="#services">Services</a></p>
                </div>

                <div className="footer-section">
                    <h2>Follow Us</h2>
                    <div className="footer-social-icons">
                        <img src="/BRAVEFacebookIcon.png" alt="Facebook" />
                        <img src="/BRAVEInstagramIcon.png" alt="Instagram" />
                        <img src="/BRAVETwitterIcon.png" alt="Twitter" />
                    </div>
                </div>
            </div>*/}
        </div>
    );
};

export default HomePage;

