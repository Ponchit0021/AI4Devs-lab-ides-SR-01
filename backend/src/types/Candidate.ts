export interface CandidateData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string | null;
  education?: string | null;
  workExperience?: string | null;
  cvFileName?: string | null;
  cvFilePath?: string | null;
}

export interface Candidate extends CandidateData {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCandidateRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string | null;
  education?: string | null;
  workExperience?: string | null;
}

export interface CreateCandidateResponse {
  success: boolean;
  message: string;
  candidate?: Candidate;
  error?: string;
} 