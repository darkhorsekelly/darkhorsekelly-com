import { render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('Home Page', () => {
  it('renders the main heading and content', () => {
    render(<Home />);
    
    // Check that the main content is rendered
    expect(screen.getByText('Dark Horse Kelly')).toBeInTheDocument();
    // expect(screen.getByText(`'A Generalist's Notebook'`)).toBeInTheDocument();
  });
});