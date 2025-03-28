// src/__tests__/SponsorDonations.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SponsorDonations from '../components/SponsorDonations';

// Mock the submission service
jest.mock('../services/submit_sponsor', () => ({
  submit_sponsor: jest.fn().mockResolvedValue({ success: true })
}));

// Mock any child components if necessary
jest.mock('../components/sponsor/ContributionToggle', () => {
  return function MockContributionToggle({ isMonthly, onChange }) {
    return (
      <div data-testid="contribution-toggle">
        <button 
          data-testid="monthly-toggle"
          className={isMonthly ? 'active' : ''}
          onClick={() => onChange(true)}
        >
          Monthly
        </button>
        <button 
          data-testid="onetime-toggle"
          className={!isMonthly ? 'active' : ''}
          onClick={() => onChange(false)}
        >
          One-Time
        </button>
      </div>
    );
  };
});

jest.mock('../components/sponsor/PresetAmountButtons', () => {
  return function MockPresetAmountButtons({ amounts, selectedAmount, onSelect }) {
    return (
      <div data-testid="preset-amounts">
        {amounts.map((amount, index) => (
          <button
            key={index}
            className={selectedAmount === amount ? 'selected' : ''}
            onClick={() => onSelect(amount)}
          >
            ${amount}
          </button>
        ))}
      </div>
    );
  };
});

describe('SponsorDonations', () => {
  test('should allow selecting donation type and amount', async () => {
    render(
      <MemoryRouter>
        <SponsorDonations />
      </MemoryRouter>
    );
    
    // Test toggling between monthly and one-time donations
    const oneTimeToggle = screen.getByTestId('onetime-toggle');
    fireEvent.click(oneTimeToggle);
    expect(oneTimeToggle).toHaveClass('active');
    
    // Test selecting a preset amount
    const presetAmountButtons = screen.getByTestId('preset-amounts').querySelectorAll('button');
    fireEvent.click(presetAmountButtons[2]); // Click the third preset amount
    expect(presetAmountButtons[2]).toHaveClass('selected');
  });
  
  test('should submit form with valid data and redirect to homepage', async () => {
    const history = createMemoryHistory();
    const externalSubmit = jest.fn();
    
    render(
      <Router history={history}>
        <SponsorDonations onSubmit={externalSubmit} />
      </Router>
    );
    
    // Fill out the form
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    
    userEvent.type(firstNameInput, 'John');
    userEvent.type(lastNameInput, 'Doe');
    userEvent.type(emailInput, 'john.doe@example.com');
    
    // Select a donation amount
    const presetAmountButtons = screen.getByTestId('preset-amounts').querySelectorAll('button');
    fireEvent.click(presetAmountButtons[0]);
    
    // Submit the form
    const submitButton = screen.getByText('Donate');
    fireEvent.click(submitButton);
    
    // Verify external submit was called with form data
    await waitFor(() => {
      expect(externalSubmit).toHaveBeenCalled();
    });
    
    // Check for expected form data structure
    const formData = externalSubmit.mock.calls[0][1];
    expect(formData.fName).toBeDefined();
    expect(formData.lName).toBeDefined();
    expect(formData.email).toBeDefined();
    expect(formData.selectedAmount).toBeDefined();
  });
  
});