import { render, screen } from '@testing-library/react';
import Home from '../app/page';

// Mock Next.js Image component
/*jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));*/

describe('Home Page', () => {
  it('renders the main heading and content', () => {
    render(<Home />);
    
    // Check that the main content is rendered
    expect(screen.getByText(/Dark Horse Kelly/i)).toBeInTheDocument();
    // expect(screen.getByText(/Save and see your changes instantly/i)).toBeInTheDocument();
  });

  /*it('renders navigation links', () => {
    render(<Home />);
    
    // Check that the navigation links are present
    expect(screen.getByText('Deploy now')).toBeInTheDocument();
    expect(screen.getByText('Read our docs')).toBeInTheDocument();
  });*/

  /*it('renders footer links', () => {
    render(<Home />);
    
    // Check that footer links are present
    expect(screen.getByText('Learn')).toBeInTheDocument();
    expect(screen.getByText('Examples')).toBeInTheDocument();
    expect(screen.getByText(/Go to nextjs.org/)).toBeInTheDocument();
  });

  it('renders with proper accessibility attributes', () => {
    render(<Home />);
    
    // Check that buttons and links have proper accessibility
    const deployButton = screen.getByRole('link', { name: /Deploy now/i });
    expect(deployButton).toHaveAttribute('target', '_blank');
    expect(deployButton).toHaveAttribute('rel', 'noopener noreferrer');
  });*/
});