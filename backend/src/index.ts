import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from 'cors';

// Import our classes
import { CandidateRepository } from './repositories/CandidateRepository';
import { CandidateValidator } from './validators/CandidateValidator';
import { CandidateService } from './services/CandidateService';
import { CandidateController } from './controllers/CandidateController';
import { CandidateRoutes } from './routes/candidateRoutes';
import { FileRoutes } from './routes/fileRoutes';

dotenv.config();

class Server {
  private app: express.Application;
  private prisma: PrismaClient;
  private port: number;

  constructor() {
    this.app = express();
    this.prisma = new PrismaClient();
    this.port = parseInt(process.env.PORT || '3010');
    
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    // Health check route
    this.app.get('/', (req, res) => {
      res.json({ 
        message: 'LTI - Talent Tracking System API',
        status: 'running',
        timestamp: new Date().toISOString()
      });
    });

    // Initialize candidate dependencies
    const candidateRepository = new CandidateRepository(this.prisma);
    const candidateValidator = new CandidateValidator();
    const candidateService = new CandidateService(candidateRepository, candidateValidator);
    const candidateController = new CandidateController(candidateService);
    const candidateRoutes = new CandidateRoutes(candidateController);
    const fileRoutes = new FileRoutes(candidateController);

    // Register routes
    this.app.use('/api/candidates', candidateRoutes.getRouter());
    this.app.use('/api/files', fileRoutes.getRouter());
  }

  private initializeErrorHandling(): void {
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.error('Error:', err.stack);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
      });
    });

    // Handle 404 routes
    this.app.use('*', (req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        message: 'Route not found',
        error: `Cannot ${req.method} ${req.originalUrl}`
      });
    });
  }

  public async start(): Promise<void> {
    try {
      // Connect to database
      await this.prisma.$connect();
      console.log('✅ Connected to database');

      // Start server
      this.app.listen(this.port, () => {
        console.log(`🚀 Server is running at http://localhost:${this.port}`);
        console.log(`📚 API Documentation available at http://localhost:${this.port}/api`);
      });
    } catch (error) {
      console.error('❌ Failed to start server:', error);
      process.exit(1);
    }
  }

  public async shutdown(): Promise<void> {
    await this.prisma.$disconnect();
    console.log('👋 Server shutdown complete');
  }
}

// Create and start server
const server = new Server();
server.start();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT, shutting down gracefully...');
  await server.shutdown();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
  await server.shutdown();
  process.exit(0);
});

export { server };
