import { CreateCandidateRequest } from '../types/Candidate';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export abstract class BaseValidator<T> {
  abstract validate(data: T): ValidationResult;
}

export class CandidateValidator extends BaseValidator<CreateCandidateRequest> {
  private readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private readonly PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

  validate(data: CreateCandidateRequest): ValidationResult {
    const errors: string[] = [];

    // Required field validations
    if (!data.firstName?.trim()) {
      errors.push('First name is required');
    }

    if (!data.lastName?.trim()) {
      errors.push('Last name is required');
    }

    if (!data.email?.trim()) {
      errors.push('Email is required');
    } else if (!this.EMAIL_REGEX.test(data.email)) {
      errors.push('Email format is invalid');
    }

    if (!data.phone?.trim()) {
      errors.push('Phone number is required');
    } else if (!this.PHONE_REGEX.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
      errors.push('Phone number format is invalid');
    }

    // Optional field validations
    if (data.firstName && data.firstName.length > 50) {
      errors.push('First name must be less than 50 characters');
    }

    if (data.lastName && data.lastName.length > 50) {
      errors.push('Last name must be less than 50 characters');
    }

    if (data.address && data.address.length > 200) {
      errors.push('Address must be less than 200 characters');
    }

    if (data.education && data.education.length > 500) {
      errors.push('Education must be less than 500 characters');
    }

    if (data.workExperience && data.workExperience.length > 1000) {
      errors.push('Work experience must be less than 1000 characters');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
} 