import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';
import '../styles/FAQ.css';
import '../styles/LearnMore.css';
import bannerImg from '../imgs/banner-img.jpg';

const LearnMore = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
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

    return (
        <div className="page-container">
            <div className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
                <div className="navbar">
                    <div className="navbar-title">
                        <div className="navbar-logo">
                            <Link to="/"><img src="/BRAVEPic.png" alt="logo" /></Link>
                        </div>
                        <div className="navbar-banner">
                        </div>
                        <h1>B.R.A.V.E Child Inc</h1>
                    </div>
                    <div className="navbar-list">
                        <ul>
                            <li><a href="/login">Login</a></li>
                            <div className="navbar-divider-vertical"></div>
                            <li><a href="/create-user">Create User</a></li>
                            <div className="navbar-divider-vertical"></div>
                            <li><a href="/sponsor-donations">Donate Here</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="learn-more-container">
                <div className="learn-more-text-content"> 
                    <h2>About Our Program</h2>
                    <div className="program-details">
                        <h3>What We Offer</h3>
                        <ul>
                            <li>Professional hippotherapy sessions</li>
                            <li>Experienced therapists and horse handlers</li>
                            <li>Safe and supportive environment</li>
                        </ul>
                    </div>
                    <div className="are-interested-container">
                        <h2>Get Started Today</h2>
                        <div className="are-interested-text">
                            <h3>Sign up & More Information</h3>
                            <p>📧 Email: BRAVEbfchild@gmail.com</p> 
                            <p>📞 Phone: (318) 840-7091</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <FAQ
                    question="Question 1"
                    answer="Answer 1"
                />
                <FAQ
                    question="Question 2"
                    answer="Answer 2"
                />
                <FAQ
                    question="Question 3"
                    answer="Answer 3"
                />
            </div>

            <div className="brave-501c-container">
                <div className="brave-501c-container-text">
                    <p>B.R.A.V.E. Child, Inc is a (IRC) Section 501c (3) organization.
                    </p>
                </div>
            </div>

            <div className="footer">
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
            </div>
        </div>
    )
}

export default LearnMore;

