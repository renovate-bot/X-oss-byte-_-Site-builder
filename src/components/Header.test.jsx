import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter to provide a router context
import '@testing-library/jest-dom'; // Import this to use jest-dom matchers

import Header from './Header';

describe('Header Component', () => {
    test('renders a link to the homepage', () => {
        render(
            // Wrap the Header component with MemoryRouter to provide a router context for testing
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        // Test the presence of the link with the correct text and href
        const homepageLink = screen.getByRole('link', { name: /kinsta logo/i });
        expect(homepageLink).toBeInTheDocument();
        expect(homepageLink).toHaveAttribute('href', '/');
    });

    test('renders the Kinsta logo image', () => {
        render(
            // Wrap the Header component with MemoryRouter to provide a router context for testing
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        // Test the presence of the Kinsta logo image with the correct alt text
        const logoImage = screen.getByAltText(/kinsta logo/i);
        expect(logoImage).toBeInTheDocument();
        expect(logoImage).toHaveAttribute('src', './../kinsta-logo.png');
        expect(logoImage).toHaveClass('kinsta-logo');
    });
});
