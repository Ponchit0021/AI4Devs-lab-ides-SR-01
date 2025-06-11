import React from 'react';
import { CandidateFormData, ValidationErrors } from '../types/Candidate';
import { CandidateService } from '../services/CandidateService';
import './CandidateForm.css';

interface CandidateFormProps {
  onSuccess?: (message: string) => void;
  onError?: (error: string) => void;
}

export class CandidateFormComponent extends React.Component<CandidateFormProps, {
  formData: CandidateFormData;
  errors: ValidationErrors;
  isSubmitting: boolean;
  submitMessage: string;
  submitError: string;
}> {
  private candidateService: CandidateService;

  constructor(props: CandidateFormProps) {
    super(props);
    this.candidateService = new CandidateService();
    this.state = {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        education: '',
        workExperience: '',
        cv: undefined
      },
      errors: {},
      isSubmitting: false,
      submitMessage: '',
      submitError: ''
    };
  }

  private validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    const { formData } = this.state;

    // Required field validations
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.length > 50) {
      errors.firstName = 'First name must be less than 50 characters';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.length > 50) {
      errors.lastName = 'Last name must be less than 50 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-()]/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }

    // Optional field validations
    if (formData.address && formData.address.length > 200) {
      errors.address = 'Address must be less than 200 characters';
    }

    if (formData.education && formData.education.length > 500) {
      errors.education = 'Education must be less than 500 characters';
    }

    if (formData.workExperience && formData.workExperience.length > 1000) {
      errors.workExperience = 'Work experience must be less than 1000 characters';
    }

    // File validation
    if (formData.cv) {
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(formData.cv.type)) {
        errors.cv = 'Only PDF and DOCX files are allowed';
      } else if (formData.cv.size > maxSize) {
        errors.cv = 'File size must be less than 5MB';
      }
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  private handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      },
      errors: {
        ...prevState.errors,
        [name]: ''
      },
      submitMessage: '',
      submitError: ''
    }));
  };

  private handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        cv: file
      },
      errors: {
        ...prevState.errors,
        cv: ''
      },
      submitMessage: '',
      submitError: ''
    }));
  };

  private handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!this.validateForm()) {
      return;
    }

    this.setState({ isSubmitting: true, submitMessage: '', submitError: '' });

    try {
      const response = await this.candidateService.createCandidate(this.state.formData);
      
      if (response.success) {
        this.setState({
          submitMessage: response.message,
          formData: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            education: '',
            workExperience: '',
            cv: undefined
          }
        });
        this.props.onSuccess?.(response.message);
      } else {
        this.setState({ submitError: response.error || response.message });
        this.props.onError?.(response.error || response.message);
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred. Please try again.';
      this.setState({ submitError: errorMessage });
      this.props.onError?.(errorMessage);
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const { formData, errors, isSubmitting, submitMessage, submitError } = this.state;

    return (
      <div className="candidate-form-container">
        <div className="candidate-form-card">
          <h2 className="form-title">Add New Candidate</h2>
          <p className="form-subtitle">Enter candidate information to add them to the ATS system</p>
          
          {submitMessage && (
            <div className="alert alert-success" role="alert">
              <strong>Success!</strong> {submitMessage}
            </div>
          )}
          
          {submitError && (
            <div className="alert alert-error" role="alert">
              <strong>Error!</strong> {submitError}
            </div>
          )}

          <form onSubmit={this.handleSubmit} className="candidate-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={this.handleInputChange}
                  className={`form-input ${errors.firstName ? 'error' : ''}`}
                  placeholder="Enter first name"
                  maxLength={50}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={this.handleInputChange}
                  className={`form-input ${errors.lastName ? 'error' : ''}`}
                  placeholder="Enter last name"
                  maxLength={50}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={this.handleInputChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter email address"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={this.handleInputChange}
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="Enter phone number"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={this.handleInputChange}
                className={`form-input ${errors.address ? 'error' : ''}`}
                placeholder="Enter address (optional)"
                maxLength={200}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="education" className="form-label">Education</label>
              <textarea
                id="education"
                name="education"
                value={formData.education}
                onChange={this.handleInputChange}
                className={`form-textarea ${errors.education ? 'error' : ''}`}
                placeholder="Enter education background (optional)"
                rows={3}
                maxLength={500}
              />
              {errors.education && <span className="error-message">{errors.education}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="workExperience" className="form-label">Work Experience</label>
              <textarea
                id="workExperience"
                name="workExperience"
                value={formData.workExperience}
                onChange={this.handleInputChange}
                className={`form-textarea ${errors.workExperience ? 'error' : ''}`}
                placeholder="Enter work experience (optional)"
                rows={4}
                maxLength={1000}
              />
              {errors.workExperience && <span className="error-message">{errors.workExperience}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cv" className="form-label">CV/Resume</label>
              <div className="file-upload-container">
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  onChange={this.handleFileChange}
                  className={`form-file-input ${errors.cv ? 'error' : ''}`}
                  accept=".pdf,.docx,.doc"
                />
                <div className="file-upload-info">
                  <small className="file-upload-hint">
                    Upload your CV/Resume in PDF or DOCX format (max 5MB)
                  </small>
                  {formData.cv && (
                    <div className="file-selected">
                      <span className="file-name">📄 {formData.cv.name}</span>
                      <span className="file-size">({(formData.cv.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                  )}
                </div>
              </div>
              {errors.cv && <span className="error-message">{errors.cv}</span>}
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
              >
                {isSubmitting ? 'Adding Candidate...' : 'Add Candidate'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CandidateFormComponent; 