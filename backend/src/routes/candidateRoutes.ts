import { Router } from 'express';
import { CandidateController } from '../controllers/CandidateController';
import { FileUploadService } from '../services/FileUploadService';

export class CandidateRoutes {
  private router: Router;
  private fileUploadService: FileUploadService;
  
  constructor(private readonly candidateController: CandidateController) {
    this.router = Router();
    this.fileUploadService = new FileUploadService();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // POST /api/candidates - Create a new candidate with optional CV upload
    this.router.post('/', 
      this.fileUploadService.getMulterConfig().single('cv'),
      (req, res) => this.candidateController.createCandidate(req, res)
    );
    
    // GET /api/candidates - Get all candidates
    this.router.get('/', (req, res) => this.candidateController.getAllCandidates(req, res));
    
    // GET /api/candidates/:id - Get candidate by ID
    this.router.get('/:id', (req, res) => this.candidateController.getCandidateById(req, res));
  }

  public getRouter(): Router {
    return this.router;
  }
} 