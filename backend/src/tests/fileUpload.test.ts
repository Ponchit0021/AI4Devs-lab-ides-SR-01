import { FileUploadService } from '../services/FileUploadService';
import path from 'path';

describe('FileUploadService', () => {
  let fileUploadService: FileUploadService;

  beforeEach(() => {
    fileUploadService = new FileUploadService();
  });

  describe('validateFile', () => {
    it('should validate a valid PDF file', () => {
      const mockFile = {
        originalname: 'resume.pdf',
        mimetype: 'application/pdf',
        size: 1024 * 1024, // 1MB
        filename: 'cv-123456789.pdf',
        path: '/uploads/cvs/cv-123456789.pdf'
      } as Express.Multer.File;

      const result = fileUploadService.validateFile(mockFile);

      expect(result.success).toBe(true);
      expect(result.fileName).toBe('cv-123456789.pdf');
      expect(result.filePath).toBe('/uploads/cvs/cv-123456789.pdf');
    });

    it('should validate a valid DOCX file', () => {
      const mockFile = {
        originalname: 'resume.docx',
        mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        size: 2 * 1024 * 1024, // 2MB
        filename: 'cv-987654321.docx',
        path: '/uploads/cvs/cv-987654321.docx'
      } as Express.Multer.File;

      const result = fileUploadService.validateFile(mockFile);

      expect(result.success).toBe(true);
      expect(result.fileName).toBe('cv-987654321.docx');
    });

    it('should reject files that are too large', () => {
      const mockFile = {
        originalname: 'large-resume.pdf',
        mimetype: 'application/pdf',
        size: 10 * 1024 * 1024, // 10MB (exceeds 5MB limit)
        filename: 'cv-large.pdf',
        path: '/uploads/cvs/cv-large.pdf'
      } as Express.Multer.File;

      const result = fileUploadService.validateFile(mockFile);

      expect(result.success).toBe(false);
      expect(result.error).toContain('File size too large');
    });

    it('should reject invalid file types', () => {
      const mockFile = {
        originalname: 'resume.txt',
        mimetype: 'text/plain',
        size: 1024,
        filename: 'cv-invalid.txt',
        path: '/uploads/cvs/cv-invalid.txt'
      } as Express.Multer.File;

      const result = fileUploadService.validateFile(mockFile);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid file extension');
    });

    it('should reject files with invalid extensions', () => {
      const mockFile = {
        originalname: 'resume.exe',
        mimetype: 'application/pdf', // Mimetype doesn't match extension
        size: 1024,
        filename: 'cv-malicious.exe',
        path: '/uploads/cvs/cv-malicious.exe'
      } as Express.Multer.File;

      const result = fileUploadService.validateFile(mockFile);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid file extension');
    });

    it('should handle missing file', () => {
      const result = fileUploadService.validateFile(null as any);

      expect(result.success).toBe(false);
      expect(result.error).toBe('No file provided');
    });
  });

  describe('getFileUrl', () => {
    it('should generate correct file URL', () => {
      const fileName = 'cv-123456789.pdf';
      const url = fileUploadService.getFileUrl(fileName);

      expect(url).toBe('/api/files/cv/cv-123456789.pdf');
    });
  });
}); 