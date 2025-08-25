# Content Feature Tests

This document describes the failing tests created for the content feature as part of the TDD (Test-Driven Development) approach.

## Overview

Following the user's instruction to "write the failing test(s) for this feature" instead of implementing it, we have created comprehensive test coverage that defines the expected behavior for the content management system.

## Test Files Created

### 1. `content.test.ts` - Core Content Validation
**Status**: ❌ FAILING - Missing `gray-matter` dependency

**Tests**:
- Content directory structure exists
- Contains at least 2 .mdx files
- Frontmatter parsing works without errors
- Required frontmatter fields are present
- Data types are correct (string, boolean, arrays, valid dates)
- UUIDs are in correct format
- At least one featured artifact exists
- Content after frontmatter is non-empty

**Why it's failing**: The `gray-matter` package is not installed, and the content directory doesn't exist yet.

### 2. `content-structure.test.ts` - Directory Structure Validation
**Status**: ❌ FAILING - Missing content directory

**Tests**:
- Content directory exists at project root
- Contains exactly 2 .mdx files (as per requirements)
- Files follow naming conventions
- Files have proper YAML frontmatter delimiters
- Files have reasonable sizes
- At least one dev log example exists
- At least one blog post example exists

**Why it's failing**: The `/content` directory doesn't exist yet, and no .mdx files have been created.

### 3. `content-utils.test.ts` - Utility Function Testing
**Status**: ❌ FAILING - Missing utility functions

**Tests**:
- `parseContentFile()` function parses MDX content correctly
- `validateFrontmatter()` function validates data against schemas
- Handles missing required fields
- Rejects invalid data types
- Validates UUID formats
- Validates date formats
- Accepts valid content types
- Handles empty arrays correctly

**Why it's failing**: The utility functions don't exist yet in `app/lib/content-utils.ts`.

### 4. `content-integration.test.ts` - Database Integration
**Status**: ❌ FAILING - Missing integration functions

**Tests**:
- Project ID references are valid against database
- Tag ID references are valid against database
- Content metadata maps to database structure
- Detects content synchronization issues
- Handles empty arrays correctly

**Why it's failing**: The integration functions don't exist yet.

## Test Coverage Summary

The failing tests cover:

✅ **Content Structure**: Directory existence, file count, naming conventions
✅ **Frontmatter Validation**: Required fields, data types, UUID formats, dates
✅ **Content Parsing**: MDX parsing, error handling, content extraction
✅ **Database Integration**: Project/tag reference validation, metadata mapping
✅ **Error Handling**: Malformed YAML, invalid data, missing dependencies

## Next Steps (Implementation)

To make these tests pass, the following needs to be implemented:

1. **Install Dependencies**:
   - `gray-matter` for frontmatter parsing
   - `next-mdx-remote` for MDX rendering

2. **Create Content Directory**:
   - `/content/` directory at project root
   - 2 example .mdx files with valid frontmatter

3. **Implement Utility Functions**:
   - `app/lib/content-utils.ts` with parsing and validation logic
   - Zod schemas for frontmatter validation

4. **Create Example Content**:
   - Dev log example with proper frontmatter
   - Blog post example with proper frontmatter
   - Valid UUIDs that reference existing projects/tags

## TDD Benefits

By writing these tests first, we have:

- **Clear Requirements**: Each test defines a specific behavior requirement
- **Design Validation**: Tests reveal the API design before implementation
- **Regression Prevention**: Future changes won't break existing functionality
- **Documentation**: Tests serve as living documentation of expected behavior

## Running the Tests

```bash
# Run all content tests
npm test -- __tests__/content*.test.ts

# Run specific test file
npm test -- __tests__/content.test.ts

# Run with coverage
npm run test:coverage -- __tests__/content*.test.ts
```

All tests are currently failing as expected, providing a clear roadmap for implementation.