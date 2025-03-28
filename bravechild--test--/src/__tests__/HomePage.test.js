// src/__tests__/HomePage.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage';

// Mock the router navigation
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  Link: ({ children, to }) => <a href={to}>{children}</a>
}));

// Mock any services or components as needed
jest.mock('../services/auth.service', () => ({
  isAuthenticated: jest.fn().mockReturnValue(false),
  logout: jest.fn(),
}));

// Mock the SponsorDonations component
jest.mock('../components/SponsorDonations', () => {
  return function MockSponsorDonations({ onSubmit }) {
    return (
      <div data-testid="sponsor-donations">
        <button data-testid="donate-button" onClick={(e) => onSubmit && onSubmit(e, { mockFormData: true })}>
          Donate
        </button>
      </div>
    );
  };
});

describe('HomePage', () => {
  
  test('should have a donation form at the bottom of the page', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    // Find the donation form component at the bottom of the page
    const donationForm = screen.getByTestId('sponsor-donations');
    expect(donationForm).toBeInTheDocument();
    
    // Check if the donate button exists
    const donateButton = screen.getByTestId('donate-button');
    expect(donateButton).toBeInTheDocument();
  });
  
  test('should handle form submission from the donate box', () => {
    // Create a spy on window.location
    const navigateMock = jest.fn();
    
    // Mock the useNavigate hook to use our spy
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigateMock);
    
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    // Find and click the donate button in the form
    const donateButton = screen.getByTestId('donate-button');
    fireEvent.click(donateButton);
    
    // We can't directly test navigation with BrowserRouter in Jest,
    // but we can check if the navigate function was called
    expect(navigateMock).toHaveBeenCalled();
  });
});