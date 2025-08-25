import { render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('Home Page', () => {
  it('renders the main heading', async () => {
    const Page = await Home({});
    render(Page);
    
    // Check that the main content is rendered
    expect(screen.getByText('Dark Horse Kelly')).toBeInTheDocument();
  });

  it('displays the titles from the markdown files', async () => {
    const Page = await Home({});
    render(Page);

    expect(screen.getByText('Launch post')).toBeInTheDocument();
    expect(screen.getByText('A Second Post for Testing')).toBeInTheDocument();
  });
});