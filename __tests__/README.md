# Testing Guide

This project uses Jest + React Testing Library (RTL) for testing components and functionality.

## Setup

The testing infrastructure is already configured with:
- Jest as the test runner
- React Testing Library for component testing
- Jest DOM for additional DOM matchers
- TypeScript support

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Structure

Tests are organized in the `__tests__` directory mirroring the app structure:
- `__tests__/ui/` - UI component tests
- `__tests__/utils/` - Test utilities and helpers

## Writing Tests

Follow the TDD workflow: Red → Green → Refactor

### Example Test

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../app/ui/Button';

describe('Button', () => {
  it('renders with children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Testing Best Practices

1. **Test behavior, not implementation** - Focus on what the user sees and does
2. **Use semantic queries** - Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Write accessible tests** - Ensure your components work for all users
4. **Keep tests simple** - One assertion per test when possible
5. **Use descriptive test names** - Make it clear what each test validates

## Available Matchers

Jest DOM provides additional matchers:
- `toBeInTheDocument()`
- `toHaveClass()`
- `toBeDisabled()`
- `toHaveTextContent()`
- And many more...

## Test Utilities

Use the custom render function from `__tests__/utils/test-utils.tsx` for consistent test setup across your test suite.
