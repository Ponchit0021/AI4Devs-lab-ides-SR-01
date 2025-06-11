import { PrismaClient } from '@prisma/client';
import { Candidate, CandidateData } from '../types/Candidate';

export interface ICandidateRepository {
  create(candidateData: CandidateData): Promise<Candidate>;
  findByEmail(email: string): Promise<Candidate | null>;
  findById(id: number): Promise<Candidate | null>;
  findAll(): Promise<Candidate[]>;
}

export class CandidateRepository implements ICandidateRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(candidateData: CandidateData): Promise<Candidate> {
    try {
      const candidate = await this.prisma.candidate.create({
        data: candidateData
      });
      return candidate;
    } catch (error) {
      throw new Error(`Failed to create candidate: ${error}`);
    }
  }

  async findByEmail(email: string): Promise<Candidate | null> {
    try {
      const candidate = await this.prisma.candidate.findUnique({
        where: { email }
      });
      return candidate;
    } catch (error) {
      throw new Error(`Failed to find candidate by email: ${error}`);
    }
  }

  async findById(id: number): Promise<Candidate | null> {
    try {
      const candidate = await this.prisma.candidate.findUnique({
        where: { id }
      });
      return candidate;
    } catch (error) {
      throw new Error(`Failed to find candidate by id: ${error}`);
    }
  }

  async findAll(): Promise<Candidate[]> {
    try {
      const candidates = await this.prisma.candidate.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return candidates;
    } catch (error) {
      throw new Error(`Failed to fetch candidates: ${error}`);
    }
  }
} 