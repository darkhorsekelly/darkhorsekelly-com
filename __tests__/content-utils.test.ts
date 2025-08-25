import { parseContentFile, validateFrontmatter, ContentMetadata } from '../app/lib/content-utils';

/**
 * Tests for content utility functions that handle:
 * 1. Parsing MDX files with gray-matter
 * 2. Validating frontmatter against schemas
 * 3. Extracting content metadata
 */

// Mock content data for testing
const mockValidFrontmatter = {
  title: 'Test Dev Log',
  publish_date: '2025-01-15T10:00:00Z',
  is_featured: true,
  project_ids: ['550e8400-e29b-41d4-a716-446655440000'],
  tag_ids: ['550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002']
};

const mockInvalidFrontmatter = {
  title: '', // Empty title
  publish_date: 'invalid-date', // Invalid date
  is_featured: 'yes', // Wrong type
  project_ids: 'not-an-array', // Wrong type
  tag_ids: ['invalid-uuid'] // Invalid UUID
};

describe('Content Utility Functions', () => {
  describe('parseContentFile', () => {
    it('should parse valid MDX content and extract frontmatter and content', () => {
      const mockMdxContent = `---
title: ${mockValidFrontmatter.title}
publish_date: ${mockValidFrontmatter.publish_date}
is_featured: ${mockValidFrontmatter.is_featured}
project_ids: [${mockValidFrontmatter.project_ids.map(id => `'${id}'`).join(', ')}]
tag_ids: [${mockValidFrontmatter.tag_ids.map(id => `'${id}'`).join(', ')}]
---

# Test Content

This is a test dev log content.
`;

      const result = parseContentFile(mockMdxContent);
      
      expect(result).toHaveProperty('frontmatter');
      expect(result).toHaveProperty('content');
      expect(result.frontmatter).toEqual(mockValidFrontmatter);
      expect(result.content.trim()).toBe('# Test Content\n\nThis is a test dev log content.');
    });

    it('should handle MDX content without frontmatter', () => {
      const mockMdxContent = `# No Frontmatter

This content has no frontmatter section.`;

      const result = parseContentFile(mockMdxContent);
      
      expect(result).toHaveProperty('frontmatter');
      expect(result).toHaveProperty('content');
      expect(result.frontmatter).toEqual({});
      expect(result.content.trim()).toBe('# No Frontmatter\n\nThis content has no frontmatter section.');
    });

    it('should throw error for malformed YAML frontmatter', () => {
      const malformedMdxContent = `---
title: 'Unclosed quote
publish_date: 2025-01-15T10:00:00Z
---

# Content`;

      expect(() => {
        parseContentFile(malformedMdxContent);
      }).toThrow();
    });
  });

  describe('validateFrontmatter', () => {
    it('should validate correct frontmatter data', () => {
      const result = validateFrontmatter(mockValidFrontmatter);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(mockValidFrontmatter);
      }
    });

    it('should reject frontmatter with missing required fields', () => {
      const incompleteFrontmatter = {
        title: 'Test',
        publish_date: '2025-01-15T10:00:00Z'
        // Missing is_featured, project_ids, tag_ids
      };

      const result = validateFrontmatter(incompleteFrontmatter);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(3); // 3 missing fields
      }
    });

    it('should reject frontmatter with invalid data types', () => {
      const result = validateFrontmatter(mockInvalidFrontmatter);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });

    it('should reject frontmatter with invalid UUIDs', () => {
      const invalidUuidFrontmatter = {
        ...mockValidFrontmatter,
        project_ids: ['invalid-uuid-format'],
        tag_ids: ['also-invalid']
      };

      const result = validateFrontmatter(invalidUuidFrontmatter);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });

    it('should reject frontmatter with invalid date format', () => {
      const invalidDateFrontmatter = {
        ...mockValidFrontmatter,
        publish_date: 'not-a-date'
      };

      const result = validateFrontmatter(invalidDateFrontmatter);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Content Type Validation', () => {
    it('should accept valid content types', () => {
      const validTypes = ['Dev Log', 'Blog Post', 'Link', 'Image'];
      
      validTypes.forEach(type => {
        const frontmatterWithType = {
          ...mockValidFrontmatter,
          type
        };
        
        const result = validateFrontmatter(frontmatterWithType);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid content types', () => {
      const invalidTypeFrontmatter = {
        ...mockValidFrontmatter,
        type: 'Invalid Type'
      };

      const result = validateFrontmatter(invalidTypeFrontmatter);
      
      expect(result.success).toBe(false);
    });
  });

  describe('Array Validation', () => {
    it('should accept empty arrays for project_ids and tag_ids', () => {
      const emptyArraysFrontmatter = {
        ...mockValidFrontmatter,
        project_ids: [],
        tag_ids: []
      };

      const result = validateFrontmatter(emptyArraysFrontmatter);
      
      expect(result.success).toBe(true);
    });

    it('should reject non-array values for project_ids and tag_ids', () => {
      const nonArrayFrontmatter = {
        ...mockValidFrontmatter,
        project_ids: 'not-an-array',
        tag_ids: 123
      };

      const result = validateFrontmatter(nonArrayFrontmatter);
      
      expect(result.success).toBe(false);
    });
  });
});