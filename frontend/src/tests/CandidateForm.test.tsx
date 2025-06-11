import React from 'react';
import { render, screen } from '@testing-library/react';
import CandidateFormComponent from '../components/CandidateForm';

// Mock axios to prevent actual API calls during tests
jest.mock('axios');

describe('CandidateFormComponent', () => {
  it('renders the candidate form with all required fields', () => {
    render(<CandidateFormComponent />);
    
    // Check if the form title is present
    expect(screen.getByText('Add New Candidate')).toBeInTheDocument();
    
    // Check if all required form fields are present
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    
    // Check if optional fields are present
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/education/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/work experience/i)).toBeInTheDocument();
    
    // Check if submit button is present
    expect(screen.getByRole('button', { name: /add candidate/i })).toBeInTheDocument();
  });

  it('displays required field indicators', () => {
    render(<CandidateFormComponent />);
    
    // Check if required field indicators (*) are present
    const requiredFields = screen.getAllByText('*');
    expect(requiredFields.length).toBeGreaterThan(0);
  });
}); 