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
                            <li>Personal Fundraising Opportunities</li>
                            <li>Public Fundraising Opportunities</li>
                            <li>Sponsorship Opportunities</li>
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
                    question="What types of fundraising opportunities are offered by B.R.A.V.E. Child, Inc?"
                    answer="First is Child's personal fundraiser, the Number Fundraiser. Every child can participate
                    in this fundraiser and all funds raised for their child will go towards their child." 
                    answer2="Second is Public fundraisers. The public fundraisers are bake sales, easter egg delivery,
                    and Christmas ornament sales. All funds from public fundraisers cover any leftover expenses
                    for all children and B.R.A.V.E. Child, Inc. All public fundraisers will be posted on our Facebook
                    and website."
                />
                <FAQ
                    question="How to qualify for or participate in B.R.A.V.E. Child, Inc fundraising opportunities?"
                    answer="Caregiver volunteers for at least one public fundraiser or public event per year, by
                    either donating their time or donating the supplies. Public fundraisers will be posted on our website
                    and Facebook."
                    answer2="Participate in the Number Fundraiser to receive benefits."
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
                    <p><a href="/">Home</a></p>
                    <p><a href="/learn-more">About Us</a></p>
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

