import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DonationForm from '../DonationForm';
import { submit_sponsor } from '../../services/submit_sponsor';

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn().mockReturnValue(null)
  },
  writable: true
});

jest.mock('../../services/submit_sponsor');

describe('DonationForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  test('renders form with all required fields', () => {
    render(<DonationForm />);
    
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /donate/i })).toBeInTheDocument();
  });

  test('validates form before submission', async () => {
    submit_sponsor.mockClear();
    
    render(<DonationForm />);
    
    const form = document.querySelector('.donation-form');
    
    const submitButton = screen.getByRole('button', { name: /donate/i });
    
    fireEvent.click(submitButton);
    
    expect(submit_sponsor).not.toHaveBeenCalled();
    
    const fnameInput = screen.getByLabelText(/first name/i);
    const lnameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    
    expect(fnameInput).toHaveAttribute('required');
    expect(lnameInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('required');
  });

  test('submits form with valid data', async () => {
    submit_sponsor.mockResolvedValueOnce({ success: true });
    
    render(<DonationForm />);
    
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'John' }
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: 'Doe' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: '50' }
    });
    
    const form = document.querySelector('.donation-form');
    
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(submit_sponsor).toHaveBeenCalledWith(
        expect.objectContaining({
          fname: 'John',
          lname: 'Doe',
          email: 'john@example.com',
          amount: '50'
        })
      );
    });
    
    expect(await screen.findByText(/thank you for your generous donation/i)).toBeInTheDocument();
  });

  test('displays error message when submission fails', async () => {
    submit_sponsor.mockRejectedValueOnce(new Error('Submission failed'));
    
    render(<DonationForm />);
    
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'John' }
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: 'Doe' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: '50' }
    });
    
    const form = document.querySelector('.donation-form');
    
    fireEvent.submit(form);
    
    expect(await screen.findByText(/donation failed/i)).toBeInTheDocument();
  });
});