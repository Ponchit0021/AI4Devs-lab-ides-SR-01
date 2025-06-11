import { Request, Response } from 'express';
import { ICandidateService } from '../services/CandidateService';
import { CreateCandidateRequest } from '../types/Candidate';
import { FileUploadService } from '../services/FileUploadService';

export class CandidateController {
  private fileUploadService: FileUploadService;

  constructor(private readonly candidateService: ICandidateService) {
    this.fileUploadService = new FileUploadService();
  }

  async createCandidate(req: Request, res: Response): Promise<void> {
    try {
      const candidateData: CreateCandidateRequest = req.body;
      const file = req.file;

      // Handle file upload if provided
      let cvFileName: string | undefined;
      let cvFilePath: string | undefined;

      if (file) {
        const fileValidation = this.fileUploadService.validateFile(file);
        if (!fileValidation.success) {
          // Delete the uploaded file if validation fails
          this.fileUploadService.deleteFile(file.path);
          res.status(400).json({
            success: false,
            message: 'File upload failed',
            error: fileValidation.error
          });
          return;
        }
        cvFileName = fileValidation.fileName;
        cvFilePath = fileValidation.filePath;
      }

      // Add file information to candidate data
      const candidateWithFile = {
        ...candidateData,
        cvFileName,
        cvFilePath
      };

      const result = await this.candidateService.createCandidate(candidateWithFile);
      
      if (result.success) {
        res.status(201).json(result);
      } else {
        // If candidate creation fails and we have a file, delete it
        if (cvFilePath) {
          this.fileUploadService.deleteFile(cvFilePath);
        }
        res.status(400).json(result);
      }
    } catch (error) {
      // Clean up uploaded file on error
      if (req.file) {
        this.fileUploadService.deleteFile(req.file.path);
      }
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }

  async getAllCandidates(req: Request, res: Response): Promise<void> {
    try {
      const candidates = await this.candidateService.getAllCandidates();
      res.status(200).json({
        success: true,
        message: 'Candidates retrieved successfully',
        candidates
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve candidates',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }

  async getCandidateById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid candidate ID',
          error: 'ID must be a number'
        });
        return;
      }

      const candidate = await this.candidateService.getCandidateById(id);
      
      if (candidate) {
        res.status(200).json({
          success: true,
          message: 'Candidate retrieved successfully',
          candidate
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Candidate not found',
          error: 'No candidate found with the provided ID'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve candidate',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }

  async downloadCV(req: Request, res: Response): Promise<void> {
    try {
      const fileName = req.params.fileName;
      const filePath = `uploads/cvs/${fileName}`;
      
      res.download(filePath, (err) => {
        if (err) {
          res.status(404).json({
            success: false,
            message: 'File not found',
            error: 'The requested CV file could not be found'
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to download file',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }
} 