import { Router } from 'express';
import { CandidateController } from '../controllers/CandidateController';

export class FileRoutes {
  private router: Router;
  
  constructor(private readonly candidateController: CandidateController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // GET /api/files/cv/:fileName - Download CV file
    this.router.get('/cv/:fileName', (req, res) => this.candidateController.downloadCV(req, res));
  }

  public getRouter(): Router {
    return this.router;
  }
} 