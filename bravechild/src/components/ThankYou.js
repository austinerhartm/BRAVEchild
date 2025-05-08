import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../HomePage.css';

const DonationThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  
  // Extract donation details from location state
  const donationData = location.state?.donationData || {
    name: 'Supporter',
    amount: '0.00',
    transactionId: 'Unknown'
  };

  return (
    <div className="page-container">
      {/* Navbar (same as homepage) */}
      <div className="navbar">
        <div className="navbar-title">
          <div className="navbar-logo">
            <Link to="/"><img src="/BRAVEPic.png" alt="logo" /></Link>
          </div>
          <h1>B.R.A.V.E Child Inc</h1>
        </div>
        <div className="navbar-list">
          <ul>
            <li><Link to="/login">Login</Link></li>
            <div className="navbar-divider-vertical"></div>
            <li><Link to="/create-user">Create User</Link></li>
            <div className="navbar-divider-vertical"></div>
            <li><Link to="/sponsor-donations">Donate Here</Link></li>
          </ul>
        </div>
      </div>

      {/* Thank You Content */}
      <div style={{ 
        backgroundColor: 'rgb(205, 242, 255)',
        marginLeft: '100px',
        marginRight: '100px',
        marginTop: '150px',
        padding: '40px',
        textAlign: 'center',
        borderRadius: '8px'
      }}>
        <h2 style={{ 
          fontSize: '2.5rem', 
          color: 'rgb(140, 0, 175)',
          marginBottom: '20px'
        }}>
          Thank You For Your Donation!
        </h2>
        
        <p style={{ 
          fontSize: '1.5rem', 
          marginBottom: '30px'
        }}>
          Dear <span style={{ fontWeight: 'bold' }}>{donationData.name}</span>, your generous contribution 
          of <span style={{ fontWeight: 'bold' }}>${parseFloat(donationData.amount).toFixed(2)}</span> has been received.
        </p>
        
        <div style={{ 
          backgroundColor: 'rgb(127, 247, 127)', 
          padding: '20px', 
          margin: '30px auto',
          width: '80%',
          borderRadius: '8px'
        }}>
          <p style={{ fontSize: '1.3rem' }}>
            A receipt has been sent to your email for your records.
          </p>
          <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>
            Transaction ID: {donationData.transactionId}
          </p>
        </div>
        
        <p style={{ fontSize: '1.4rem', marginTop: '30px' }}>
          Your support helps provide equine therapy services to children who need it.
        </p>
        
        <div style={{ marginTop: '40px' }}>
          
          <button style={{ 
            background: '#ffffff',
            border: '1px solid #000000',
            borderRadius: '6px',
            boxShadow: 'rgba(0, 0, 0, 0.1) 1px 2px 4px',
            cursor: 'pointer',
            fontFamily: 'nunito,roboto,proxima-nova,"proxima nova",sans-serif',
            fontSize: '16px',
            fontWeight: '800',
            padding: '12px 20px',
            margin: '20px auto',
            color: '#000000'
          }} onClick={() => navigate('/')}>
            Return to Homepage
          </button>
        </div>
      </div>
      
      {/* 501c3 info (like homepage) */}
      <div className="brave-501c-container">
        <div className="brave-501c-container-text">
          <p>B.R.A.V.E. Child, Inc is a (IRC) Section 501c (3) organization.</p>
        </div>
      </div>
    </div>
  );
};

export default DonationThankYou;
