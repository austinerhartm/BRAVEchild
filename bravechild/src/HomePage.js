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
                <h1>BraveChild</h1>
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
                <h2>What is BraveChild?</h2>
                <p className="whatIsBravechild-text">
                   <span style={{fontWeight: 'bold' }}>Building and Restoring Abilities Via Equine</span>(B.R.A.V.E. Child, Inc) is a team of therapists and parents<br /> 
                   working together to raise funds to assist with covering the cost of the equine service fee (~$45 per child).<br />
                   B.R.A.V.E. Child, Inc works to make this amazing program accessible to children who would benefit from hippotherapy<br />
                   or equine therapy services. This allows parents of children with and without disabilities to focus on their child’s<br />
                   development and progress. 
                </p>
            </div>
            <div className="hippo-therapy">
                <h2>What is Hippotherapy?</h2>
                <p className="hippo-therapy-text">
                  Hippo-therapy comes from Greek word meaning HORSE or EQUINE!<br />
                  Hippotherapy is a specialized, hands-on approach for a licensed 
                  occupational or physical therapist to utilize equine movement to <br />
                  help the children with delays and disabilities better reach their 
                  functional goals. Hippotherapy allows the child to work on balance, <br />
                  core strength, endurance, motor planning, attention to task, and fine 
                  motor skills using horse’s movement to stimulate the overall body. 
                </p>
                <div className="hippo-therapy-content">
                    <img src="/EquineTherapyPic.jpg" alt="Equine Therapy" className="equine-therapy-image1" />
                    <img src="/EquineTherapyPic2.png" alt="Equine Therapy" className="equine-therapy-image2" />
                </div>
            </div>
            <div className="contact-us">
                <h2>Contact Us!</h2>
                <p>Location: 66 Mengle Road Rayville, LA 71269</p>
                <p>Phone: (318) 840-7091</p>
                <p>Email: BRAVEbfchild@gmail.com</p>
                <p>Founders: Jessica and Joshua Huff</p>
            </div>
        </div>
    );
};

export default HomePage;