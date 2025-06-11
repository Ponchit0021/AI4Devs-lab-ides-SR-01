import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

export interface FileUploadResult {
  success: boolean;
  fileName?: string;
  filePath?: string;
  error?: string;
}

export class FileUploadService {
  private readonly uploadDir: string;
  private readonly maxFileSize: number = 5 * 1024 * 1024; // 5MB
  private readonly allowedMimeTypes: string[] = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/msword' // .doc
  ];
  private readonly allowedExtensions: string[] = ['.pdf', '.docx', '.doc'];

  constructor() {
    this.uploadDir = path.join(process.cwd(), 'uploads', 'cvs');
    this.ensureUploadDirExists();
  }

  private ensureUploadDirExists(): void {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  public getMulterConfig(): multer.Multer {
    const storage = multer.diskStorage({
      destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, this.uploadDir);
      },
      filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        // Generate unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `cv-${uniqueSuffix}${ext}`);
      }
    });

    return multer({
      storage,
      limits: {
        fileSize: this.maxFileSize
      },
      fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        const isValidMimeType = this.allowedMimeTypes.includes(file.mimetype);
        const ext = path.extname(file.originalname).toLowerCase();
        const isValidExtension = this.allowedExtensions.includes(ext);

        if (isValidMimeType && isValidExtension) {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type. Only PDF and DOCX files are allowed.'));
        }
      }
    });
  }

  public validateFile(file: Express.Multer.File): FileUploadResult {
    if (!file) {
      return {
        success: false,
        error: 'No file provided'
      };
    }

    const ext = path.extname(file.originalname).toLowerCase();
    
    if (!this.allowedExtensions.includes(ext)) {
      return {
        success: false,
        error: 'Invalid file extension. Only PDF and DOCX files are allowed.'
      };
    }

    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      return {
        success: false,
        error: 'Invalid file type. Only PDF and DOCX files are allowed.'
      };
    }

    if (file.size > this.maxFileSize) {
      return {
        success: false,
        error: 'File size too large. Maximum size is 5MB.'
      };
    }

    return {
      success: true,
      fileName: file.filename,
      filePath: file.path
    };
  }

  public deleteFile(filePath: string): boolean {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  public getFileUrl(fileName: string): string {
    return `/api/files/cv/${fileName}`;
  }
} 