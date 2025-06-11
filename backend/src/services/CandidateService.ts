import { ICandidateRepository } from '../repositories/CandidateRepository';
import { CandidateValidator } from '../validators/CandidateValidator';
import { CreateCandidateRequest, CreateCandidateResponse, Candidate } from '../types/Candidate';

export interface ICandidateService {
  createCandidate(candidateData: CreateCandidateRequest): Promise<CreateCandidateResponse>;
  getAllCandidates(): Promise<Candidate[]>;
  getCandidateById(id: number): Promise<Candidate | null>;
}

export class CandidateService implements ICandidateService {
  constructor(
    private readonly candidateRepository: ICandidateRepository,
    private readonly candidateValidator: CandidateValidator
  ) {}

  async createCandidate(candidateData: CreateCandidateRequest): Promise<CreateCandidateResponse> {
    try {
      // Validate input data
      const validationResult = this.candidateValidator.validate(candidateData);
      if (!validationResult.isValid) {
        return {
          success: false,
          message: 'Validation failed',
          error: validationResult.errors.join(', ')
        };
      }

      // Check if candidate with email already exists
      const existingCandidate = await this.candidateRepository.findByEmail(candidateData.email);
      if (existingCandidate) {
        return {
          success: false,
          message: 'Candidate with this email already exists',
          error: 'Email already registered'
        };
      }

      // Create new candidate
      const candidate = await this.candidateRepository.create(candidateData);

      return {
        success: true,
        message: 'Candidate successfully added to the system',
        candidate
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create candidate',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async getAllCandidates(): Promise<Candidate[]> {
    try {
      return await this.candidateRepository.findAll();
    } catch (error) {
      throw new Error(`Failed to retrieve candidates: ${error}`);
    }
  }

  async getCandidateById(id: number): Promise<Candidate | null> {
    try {
      return await this.candidateRepository.findById(id);
    } catch (error) {
      throw new Error(`Failed to retrieve candidate: ${error}`);
    }
  }
} 