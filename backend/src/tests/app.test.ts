import request from 'supertest';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { CandidateRepository } from '../repositories/CandidateRepository';
import { CandidateValidator } from '../validators/CandidateValidator';
import { CandidateService } from '../services/CandidateService';
import { CandidateController } from '../controllers/CandidateController';
import { CandidateRoutes } from '../routes/candidateRoutes';

// Mock Prisma Client
jest.mock('@prisma/client');

describe('API Endpoints', () => {
  let app: express.Application;
  let mockPrisma: jest.Mocked<PrismaClient>;

  beforeEach(() => {
    // Create Express app
    app = express();
    app.use(express.json());

    // Mock Prisma
    mockPrisma = new PrismaClient() as jest.Mocked<PrismaClient>;
    
    // Set up dependencies
    const candidateRepository = new CandidateRepository(mockPrisma);
    const candidateValidator = new CandidateValidator();
    const candidateService = new CandidateService(candidateRepository, candidateValidator);
    const candidateController = new CandidateController(candidateService);
    const candidateRoutes = new CandidateRoutes(candidateController);

    // Register routes
    app.use('/api/candidates', candidateRoutes.getRouter());
    
    // Health check route
    app.get('/', (req, res) => {
      res.json({ 
        message: 'LTI - Talent Tracking System API',
        status: 'running'
      });
    });
  });

  describe('GET /', () => {
    it('responds with API status', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('LTI - Talent Tracking System API');
      expect(response.body.status).toBe('running');
    });
  });

  describe('POST /api/candidates', () => {
    it('should validate required fields', async () => {
      const invalidCandidate = {
        firstName: '',
        lastName: '',
        email: 'invalid-email',
        phone: ''
      };

      const response = await request(app)
        .post('/api/candidates')
        .send(invalidCandidate);

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('First name is required');
    });
  });
});
