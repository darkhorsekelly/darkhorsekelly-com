import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Tests for the content feature that validates:
 * 1. Content directory structure exists
 * 2. MDX files have valid frontmatter
 * 3. Frontmatter matches the specification requirements
 */
describe('Content Feature', () => {
  const contentDir = path.join(process.cwd(), 'content');
  
  describe('Content Directory Structure', () => {
    it('should have a content directory', () => {
      expect(fs.existsSync(contentDir)).toBe(true);
    });

    it('should contain at least 2 .mdx files', () => {
      const files = fs.readdirSync(contentDir);
      const mdxFiles = files.filter(file => file.endsWith('.mdx'));
      expect(mdxFiles.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('MDX Frontmatter Validation', () => {
    let mdxFiles: string[];

    beforeAll(() => {
      const files = fs.readdirSync(contentDir);
      mdxFiles = files.filter(file => file.endsWith('.mdx'));
    });

    it('should parse frontmatter without errors for all MDX files', () => {
      mdxFiles.forEach(filePath => {
        const fullPath = path.join(contentDir, filePath);
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        
        expect(() => {
          matter(fileContent);
        }).not.toThrow();
      });
    });

    it('should have required frontmatter fields for each MDX file', () => {
      const requiredFields = ['title', 'publish_date', 'is_featured', 'project_ids', 'tag_ids'];
      
      mdxFiles.forEach(filePath => {
        const fullPath = path.join(contentDir, filePath);
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const { data } = matter(fileContent);
        
        requiredFields.forEach(field => {
          expect(data).toHaveProperty(field);
        });
      });
    });

    it('should have valid data types for frontmatter fields', () => {
      mdxFiles.forEach(filePath => {
        const fullPath = path.join(contentDir, filePath);
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const { data } = matter(fileContent);
        
        // title should be a string
        expect(typeof data.title).toBe('string');
        expect(data.title.length).toBeGreaterThan(0);
        
        // publish_date should be a valid ISO date string
        expect(typeof data.publish_date).toBe('string');
        expect(() => new Date(data.publish_date)).not.toThrow();
        
        // is_featured should be a boolean
        expect(typeof data.is_featured).toBe('boolean');
        
        // project_ids should be an array
        expect(Array.isArray(data.project_ids)).toBe(true);
        
        // tag_ids should be an array
        expect(Array.isArray(data.tag_ids)).toBe(true);
      });
    });

    it('should have valid UUID format for project_ids and tag_ids', () => {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      
      mdxFiles.forEach(filePath => {
        const fullPath = path.join(contentDir, filePath);
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const { data } = matter(fileContent);
        
        // project_ids should contain valid UUIDs
        data.project_ids.forEach((id: string) => {
          expect(id).toMatch(uuidRegex);
        });
        
        // tag_ids should contain valid UUIDs
        data.tag_ids.forEach((id: string) => {
          expect(id).toMatch(uuidRegex);
        });
      });
    });

    it('should have at least one featured artifact', () => {
      let hasFeatured = false;
      
      mdxFiles.forEach(filePath => {
        const fullPath = path.join(contentDir, filePath);
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const { data } = matter(fileContent);
        
        if (data.is_featured === true) {
          hasFeatured = true;
        }
      });
      
      expect(hasFeatured).toBe(true);
    });
  });

  describe('Content File Content', () => {
    it('should have non-empty content after frontmatter', () => {
      const files = fs.readdirSync(contentDir);
      const mdxFiles = files.filter(file => file.endsWith('.mdx'));
      
      mdxFiles.forEach(filePath => {
        const fullPath = path.join(contentDir, filePath);
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const { content } = matter(fileContent);
        
        // Content should exist and not be just whitespace
        expect(content.trim().length).toBeGreaterThan(0);
      });
    });
  });
});