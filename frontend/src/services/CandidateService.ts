import axios, { AxiosResponse } from 'axios';
import { CandidateFormData, ApiResponse } from '../types/Candidate';
import { API_CONFIG } from '../config/api';

export interface ICandidateService {
  createCandidate(candidateData: CandidateFormData): Promise<ApiResponse>;
  getAllCandidates(): Promise<ApiResponse>;
  getCandidateById(id: number): Promise<ApiResponse>;
}

export class CandidateService implements ICandidateService {
  private readonly baseURL: string;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  async createCandidate(candidateData: CandidateFormData): Promise<ApiResponse> {
    try {
      const formData = new FormData();
      
      // Add text fields
      formData.append('firstName', candidateData.firstName);
      formData.append('lastName', candidateData.lastName);
      formData.append('email', candidateData.email);
      formData.append('phone', candidateData.phone);
      
      if (candidateData.address) {
        formData.append('address', candidateData.address);
      }
      if (candidateData.education) {
        formData.append('education', candidateData.education);
      }
      if (candidateData.workExperience) {
        formData.append('workExperience', candidateData.workExperience);
      }
      
      // Add file if provided
      if (candidateData.cv) {
        formData.append('cv', candidateData.cv);
      }

      const response: AxiosResponse<ApiResponse> = await axios.post(
        `${this.baseURL}/candidates`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Network error occurred',
        error: 'Failed to connect to server'
      };
    }
  }

  async getAllCandidates(): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.get(
        `${this.baseURL}/candidates`
      );
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Network error occurred',
        error: 'Failed to connect to server'
      };
    }
  }

  async getCandidateById(id: number): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.get(
        `${this.baseURL}/candidates/${id}`
      );
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Network error occurred',
        error: 'Failed to connect to server'
      };
    }
  }
} 