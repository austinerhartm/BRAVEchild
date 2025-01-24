import React from 'react';
import './HomePage.css';

const HomePage = () => {
    return (
        <div>
         <div className="navbar">
            <div className="navbar-title">
                <div className="navbar-logo">
                    <img src="/BRAVEPic.png" alt="logo" />
                </div>
                <h1>B.R.A.V.E Child Inc</h1>
            </div>
            <div className="navbar-list">
                <ul>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/create-user">Create User</a></li>
                    <li><a href="/sponsor-donations">Donate Here</a></li>
                </ul>
            </div>
           </div>
            <div className="homepage-content">
                <h2>Who We Are</h2>
                <p className="whatIsBravechild-text">
                   <span style={{fontWeight: 'bold' }}>Building and Restoring Abilities Via Equine</span>(B.R.A.V.E. Child, Inc) < br/> is a team of therapists and parents 
                   working together to raise funds <br /> to assist with covering the cost of the equine service fee (~$45 per child).<br />
                   This allows parents of children with and without disabilities to focus on their child’s<br />
                   development and progress. 
                </p>
            </div>
            <img src="/EquineTherapyPic3.jpg" alt="Equine Therapy3" className="equine-therapy-image3" />
            <div className="hippo-therapy">
                <h2>How Hippotherapy Helps</h2>
                <p className="hippo-therapy-text">
                  Hippo-therapy comes from Greek word meaning HORSE or EQUINE!<br />
                  Hippotherapy allows the child to work on balance, core strength, <br />
                  endurance, motor planning, attention to task, and fine 
                  motor skills <br /> using the horse’s movement to stimulate the overall body. 
                </p>
                <div className="hippo-therapy-content">
                    <img src="/EquineTherapyPic.jpg" alt="Equine Therapy" className="equine-therapy-image1" />
                    <img src="/EquineTherapyPic2.png" alt="Equine Therapy" className="equine-therapy-image2" />
                    <img src="/EquineTherapyPic4.jpg" alt="Equine Therapy" className="equine-therapy-image4" />
                </div>
            </div>
            <div className="contact-us">
                <h2>Contact Us!</h2>
                <div className="contact-us-list">
                    <ul>
                        <li>
                        <p>Location: 66 Mengle Road Rayville, LA 71269</p>
                        <p>Phone: (318) 840-7091</p>
                        <p>Email: BRAVEbfchild@gmail.com</p>
                        <p>Founders: Jessica and Joshua Huff</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

