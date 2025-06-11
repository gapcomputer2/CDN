import { describe, it, expect } from 'vitest';
import path from 'path';
import { isValidFilePath, sanitizeFilePath } from './path-validator';

describe('Path Validation', () => {
  const baseDirectory = path.resolve(process.cwd(), 'cdn');

  describe('isValidFilePath', () => {
    it('should allow files within the base directory', () => {
      const validPaths = [
        'image.jpg',
        'documents/report.pdf',
        './test.txt',
        'subdirectory/file.txt'
      ];

      validPaths.forEach(validPath => {
        expect(isValidFilePath(validPath, baseDirectory), 
          `Path should be valid: ${validPath}`
        ).toBe(true);
      });
    });

    it('should prevent directory traversal attempts', () => {
      const invalidPaths = [
        '../sensitive-file.txt',
        '../../etc/passwd',
        '/etc/hosts',
        '../../../../some/external/path'
      ];

      invalidPaths.forEach(invalidPath => {
        expect(isValidFilePath(invalidPath, baseDirectory), 
          `Path should be invalid: ${invalidPath}`
        ).toBe(false);
      });
    });
  });

  describe('sanitizeFilePath', () => {
    it('should remove potentially dangerous path elements', () => {
      const testCases = [
        { input: '../secret.txt', expected: 'secret.txt' },
        { input: '../../etc/passwd', expected: 'etc/passwd' },
        { input: '///multiple///slashes', expected: 'multiple/slashes' },
        { input: '/absolute/path', expected: 'absolute/path' }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(sanitizeFilePath(input)).toBe(expected);
      });
    });
  });
});