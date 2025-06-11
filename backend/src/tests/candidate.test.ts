import { CandidateValidator } from '../validators/CandidateValidator';
import { CreateCandidateRequest } from '../types/Candidate';

describe('CandidateValidator', () => {
  let validator: CandidateValidator;

  beforeEach(() => {
    validator = new CandidateValidator();
  });

  describe('validate', () => {
    it('should pass validation for valid candidate data', () => {
      const validCandidate: CreateCandidateRequest = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        address: '123 Main St',
        education: 'Bachelor of Science',
        workExperience: '5 years of experience'
      };

      const result = validator.validate(validCandidate);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should fail validation for missing required fields', () => {
      const invalidCandidate: CreateCandidateRequest = {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      };

      const result = validator.validate(invalidCandidate);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('First name is required');
      expect(result.errors).toContain('Last name is required');
      expect(result.errors).toContain('Email is required');
      expect(result.errors).toContain('Phone number is required');
    });

    it('should fail validation for invalid email format', () => {
      const invalidCandidate: CreateCandidateRequest = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email',
        phone: '+1234567890'
      };

      const result = validator.validate(invalidCandidate);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Email format is invalid');
    });

    it('should fail validation for invalid phone format', () => {
      const invalidCandidate: CreateCandidateRequest = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: 'invalid-phone'
      };

      const result = validator.validate(invalidCandidate);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Phone number format is invalid');
    });
  });
}); 