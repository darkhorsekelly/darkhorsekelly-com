import fs from 'fs';
import path from 'path';

/**
 * Tests for the content directory structure that validates:
 * 1. Content directory exists
 * 2. Contains exactly 2 example .mdx files
 * 3. Each file has the correct structure and naming
 */

describe('Content Directory Structure', () => {
  const contentDir = path.join(process.cwd(), 'content');
  
  describe('Directory Existence', () => {
    it('should have a content directory at the project root', () => {
      expect(fs.existsSync(contentDir)).toBe(true);
      expect(fs.statSync(contentDir).isDirectory()).toBe(true);
    });
  });

  describe('MDX File Count', () => {
    it('should contain exactly 2 .mdx files as specified in the requirements', () => {
      const files = fs.readdirSync(contentDir);
      const mdxFiles = files.filter(file => file.endsWith('.mdx'));
      
      expect(mdxFiles).toHaveLength(2);
    });
  });

  describe('File Naming Convention', () => {
    it('should have descriptive filenames that indicate content type', () => {
      const files = fs.readdirSync(contentDir);
      const mdxFiles = files.filter(file => file.endsWith('.mdx'));
      
      // Check that filenames are descriptive and follow a pattern
      mdxFiles.forEach(filename => {
        expect(filename).toMatch(/^[a-z0-9-]+\.mdx$/);
        expect(filename.length).toBeGreaterThan(8); // At least some descriptive content
        expect(filename.length).toBeLessThan(50); // Reasonable length
      });
    });
  });

  describe('File Content Structure', () => {
    let mdxFiles: string[];

    beforeAll(() => {
      const files = fs.readdirSync(contentDir);
      mdxFiles = files.filter(file => file.endsWith('.mdx'));
    });

    it('should have files with proper YAML frontmatter delimiters', () => {
      mdxFiles.forEach(filename => {
        const filePath = path.join(contentDir, filename);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Should start with ---
        expect(content.trim().startsWith('---')).toBe(true);
        
        // Should have closing ---
        const lines = content.split('\n');
        const hasClosingDelimiter = lines.some(line => line.trim() === '---');
        expect(hasClosingDelimiter).toBe(true);
      });
    });

    it('should have non-empty content after frontmatter', () => {
      mdxFiles.forEach(filename => {
        const filePath = path.join(contentDir, filename);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Split content by frontmatter delimiters
        const parts = content.split('---');
        expect(parts.length).toBeGreaterThanOrEqual(3); // Opening ---, content, closing ---
        
        // Content after frontmatter should exist and not be just whitespace
        const contentAfterFrontmatter = parts.slice(2).join('---');
        expect(contentAfterFrontmatter.trim().length).toBeGreaterThan(0);
      });
    });

    it('should have files with reasonable file sizes', () => {
      mdxFiles.forEach(filename => {
        const filePath = path.join(contentDir, filename);
        const stats = fs.statSync(filePath);
        
        // File should be at least 100 bytes (reasonable minimum for content)
        expect(stats.size).toBeGreaterThan(100);
        
        // File should be less than 10KB (reasonable maximum for example content)
        expect(stats.size).toBeLessThan(10 * 1024);
      });
    });
  });

  describe('Example Content Types', () => {
    it('should have at least one dev log example', () => {
      const files = fs.readdirSync(contentDir);
      const mdxFiles = files.filter(file => file.endsWith('.mdx'));
      
      let hasDevLog = false;
      mdxFiles.forEach(filename => {
        const filePath = path.join(contentDir, filename);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Check if content mentions dev log or development
        if (content.toLowerCase().includes('dev log') || 
            content.toLowerCase().includes('development') ||
            filename.toLowerCase().includes('dev')) {
          hasDevLog = true;
        }
      });
      
      expect(hasDevLog).toBe(true);
    });

    it('should have at least one blog post example', () => {
      const files = fs.readdirSync(contentDir);
      const mdxFiles = files.filter(file => file.endsWith('.mdx'));
      
      let hasBlogPost = false;
      mdxFiles.forEach(filename => {
        const filePath = path.join(contentDir, filename);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Check if content mentions blog post or general content
        if (content.toLowerCase().includes('blog') || 
            content.toLowerCase().includes('post') ||
            filename.toLowerCase().includes('blog')) {
          hasBlogPost = true;
        }
      });
      
      expect(hasBlogPost).toBe(true);
    });
  });
});