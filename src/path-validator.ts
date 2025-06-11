import path from 'path';

/**
 * Validates that a given file path is within a specified base directory
 * Prevents directory traversal attacks by checking path resolution
 * 
 * @param filePath - The file path to validate
 * @param baseDirectory - The base directory where files are allowed to be served from
 * @returns boolean indicating whether the path is valid
 */
export function isValidFilePath(filePath: string, baseDirectory: string): boolean {
  // Normalize and resolve the paths to handle different path formats
  const normalizedFilePath = path.normalize(filePath);
  const normalizedBaseDir = path.normalize(baseDirectory);

  // Resolve the absolute path of the file
  const resolvedFilePath = path.resolve(baseDirectory, normalizedFilePath);

  // Check if the resolved file path starts with the base directory
  // This prevents directory traversal attacks (e.g., ../../../etc/passwd)
  return resolvedFilePath.startsWith(normalizedBaseDir);
}

/**
 * Sanitizes a file path by removing any potentially dangerous path traversal elements
 * 
 * @param filePath - The file path to sanitize
 * @returns sanitized file path
 */
export function sanitizeFilePath(filePath: string): string {
  // Remove any potentially dangerous path traversal elements
  return filePath
    .replace(/\.\./g, '')  // Remove parent directory references
    .replace(/^\/+/, '')   // Remove leading slashes
    .replace(/\/\/+/g, '/'); // Replace multiple consecutive slashes
}