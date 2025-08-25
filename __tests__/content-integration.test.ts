import { PrismaClient } from '@prisma/client';

/**
 * Tests for content integration that validates:
 * 1. Frontmatter project_ids reference valid projects in the database
 * 2. Frontmatter tag_ids reference valid tags in the database
 * 3. Content metadata can be properly mapped to database records
 */

// Mock Prisma client for testing
const mockPrisma = {
  project: {
    findMany: jest.fn(),
    findUnique: jest.fn()
  },
  tag: {
    findMany: jest.fn(),
    findUnique: jest.fn()
  }
} as unknown as PrismaClient;

describe('Content Database Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Project ID Validation', () => {
    it('should validate that all project_ids in frontmatter reference existing projects', async () => {
      // Mock existing projects in database
      const existingProjects = [
        { id: '550e8400-e29b-41d4-a716-446655440000', name: 'Codename Island' },
        { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Personal Portfolio' }
      ];

      (mockPrisma.project.findMany as jest.Mock).mockResolvedValue(existingProjects);

      // Mock frontmatter with valid project IDs
      const validFrontmatter = {
        project_ids: ['550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001']
      };

      // This would call a validation function that checks against the database
      const result = await validateProjectReferences(validFrontmatter.project_ids, mockPrisma);
      
      expect(result.isValid).toBe(true);
      expect(result.validProjects).toHaveLength(2);
      expect(result.invalidIds).toHaveLength(0);
    });

    it('should reject frontmatter with non-existent project_ids', async () => {
      // Mock existing projects in database
      const existingProjects = [
        { id: '550e8400-e29b-41d4-a716-446655440000', name: 'Codename Island' }
      ];

      (mockPrisma.project.findMany as jest.Mock).mockResolvedValue(existingProjects);

      // Mock frontmatter with invalid project ID
      const invalidFrontmatter = {
        project_ids: ['550e8400-e29b-41d4-a716-446655440000', 'non-existent-id']
      };

      const result = await validateProjectReferences(invalidFrontmatter.project_ids, mockPrisma);
      
      expect(result.isValid).toBe(false);
      expect(result.invalidIds).toContain('non-existent-id');
    });

    it('should handle empty project_ids array', async () => {
      const emptyProjectIds: string[] = [];

      // Mock empty result for empty array
      (mockPrisma.project.findMany as jest.Mock).mockResolvedValue([]);

      const result = await validateProjectReferences(emptyProjectIds, mockPrisma);
      
      expect(result.isValid).toBe(true);
      expect(result.validProjects).toHaveLength(0);
      expect(result.invalidIds).toHaveLength(0);
    });
  });

  describe('Tag ID Validation', () => {
    it('should validate that all tag_ids in frontmatter reference existing tags', async () => {
      // Mock existing tags in database
      const existingTags = [
        { id: '550e8400-e29b-41d4-a716-446655440002', name: 'Next.js' },
        { id: '550e8400-e29b-41d4-a716-446655440003', name: 'Game Design' }
      ];

      (mockPrisma.tag.findMany as jest.Mock).mockResolvedValue(existingTags);

      // Mock frontmatter with valid tag IDs
      const validFrontmatter = {
        tag_ids: ['550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003']
      };

      const result = await validateTagReferences(validFrontmatter.tag_ids, mockPrisma);
      
      expect(result.isValid).toBe(true);
      expect(result.validTags).toHaveLength(2);
    });

    it('should reject frontmatter with non-existent tag_ids', async () => {
      // Mock existing tags in database
      const existingTags = [
        { id: '550e8400-e29b-41d4-a716-446655440002', name: 'Next.js' }
      ];

      (mockPrisma.tag.findMany as jest.Mock).mockResolvedValue(existingTags);

      // Mock frontmatter with invalid tag ID
      const invalidFrontmatter = {
        tag_ids: ['550e8400-e29b-41d4-a716-446655440002', 'non-existent-tag']
      };

      const result = await validateTagReferences(invalidFrontmatter.tag_ids, mockPrisma);
      
      expect(result.isValid).toBe(false);
      expect(result.invalidIds).toContain('non-existent-tag');
    });
  });

  describe('Content Metadata Mapping', () => {
    it('should map content frontmatter to database artifact structure', () => {
      const frontmatter = {
        title: 'Test Dev Log',
        publish_date: '2025-01-15T10:00:00Z',
        is_featured: true,
        project_ids: ['550e8400-e29b-41d4-a716-446655440000'],
        tag_ids: ['550e8400-e29b-41d4-a716-446655440002']
      };

      const mappedArtifact = mapFrontmatterToArtifact(frontmatter, '/content/test-dev-log.mdx');
      
      expect(mappedArtifact).toMatchObject({
        title: frontmatter.title,
        publish_date: new Date(frontmatter.publish_date),
        is_featured: frontmatter.is_featured,
        content_path: '/content/test-dev-log.mdx',
        type: 'Dev Log' // Should be inferred or specified
      });
    });

    it('should handle different content types correctly', () => {
      const blogPostFrontmatter = {
        title: 'Test Blog Post',
        publish_date: '2025-01-15T10:00:00Z',
        is_featured: false,
        project_ids: [],
        tag_ids: ['550e8400-e29b-41d4-a716-446655440002'],
        type: 'Blog Post'
      };

      const mappedArtifact = mapFrontmatterToArtifact(blogPostFrontmatter, '/content/test-blog-post.mdx');
      
      expect(mappedArtifact.type).toBe('Blog Post');
    });
  });

  describe('Content Synchronization', () => {
    it('should detect when content files are out of sync with database', async () => {
      // Mock database artifacts
      const dbArtifacts = [
        {
          id: '1',
          content_path: '/content/dev-log-001.mdx',
          title: 'Old Title',
          last_updated: new Date('2025-01-01T00:00:00Z')
        }
      ];

      // Mock file system content
      const fileContent = {
        path: '/content/dev-log-001.mdx',
        frontmatter: {
          title: 'New Title', // Different from database
          publish_date: '2025-01-15T10:00:00Z',
          is_featured: true,
          project_ids: ['550e8400-e29b-41d4-a716-446655440000'],
          tag_ids: ['550e8400-e29b-41d4-a716-446655440002']
        }
      };

      const syncStatus = await checkContentSync(dbArtifacts, [fileContent]);
      
      expect(syncStatus.needsUpdate).toBe(true);
      expect(syncStatus.outOfSyncFiles).toContain('/content/dev-log-001.mdx');
    });
  });
});

// Mock functions that would be implemented in the actual content utilities
async function validateProjectReferences(projectIds: string[], prisma: PrismaClient) {
  const validProjects = await prisma.project.findMany({
    where: { id: { in: projectIds } }
  });
  
  const validIds = validProjects.map(p => p.id);
  const invalidIds = projectIds.filter(id => !validIds.includes(id));
  
  return {
    isValid: invalidIds.length === 0,
    validProjects,
    invalidIds
  };
}

async function validateTagReferences(tagIds: string[], prisma: PrismaClient) {
  const validTags = await prisma.tag.findMany({
    where: { id: { in: tagIds } }
  });
  
  const validIds = validTags.map(t => t.id);
  const invalidIds = tagIds.filter(id => !validIds.includes(id));
  
  return {
    isValid: invalidIds.length === 0,
    validTags,
    invalidIds
  };
}

function mapFrontmatterToArtifact(frontmatter: any, contentPath: string) {
  return {
    title: frontmatter.title,
    publish_date: new Date(frontmatter.publish_date),
    is_featured: frontmatter.is_featured,
    content_path: contentPath,
    type: frontmatter.type || 'Dev Log'
  };
}

async function checkContentSync(dbArtifacts: any[], fileContents: any[]) {
  const outOfSyncFiles: string[] = [];
  
  fileContents.forEach(fileContent => {
    const dbArtifact = dbArtifacts.find(a => a.content_path === fileContent.path);
    if (dbArtifact && dbArtifact.title !== fileContent.frontmatter.title) {
      outOfSyncFiles.push(fileContent.path);
    }
  });
  
  return {
    needsUpdate: outOfSyncFiles.length > 0,
    outOfSyncFiles
  };
}