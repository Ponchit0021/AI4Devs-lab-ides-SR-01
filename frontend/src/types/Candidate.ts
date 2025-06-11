export interface CandidateFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  education?: string;
  workExperience?: string;
  cv?: File;
}

export interface Candidate extends CandidateFormData {
  id: number;
  createdAt: string;
  updatedAt: string;
  cvFileName?: string;
  cvFilePath?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  error?: string;
  candidate?: Candidate;
  candidates?: Candidate[];
  data?: T;
}

export interface ValidationErrors {
  [key: string]: string;
} 