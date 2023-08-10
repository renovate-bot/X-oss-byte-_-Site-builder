import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Footer from './Footer';

describe('Footer Component', () => {
    test('renders the correct links with proper attributes', () => {
        render(<Footer />);
        // Test the footer links and their attributes
        const kinstaLink = screen.getByText('Kinsta');
        expect(kinstaLink).toBeInTheDocument();
        expect(kinstaLink).toHaveAttribute('href', 'https://kinsta.com/');
        expect(kinstaLink).toHaveAttribute('target', '_blank');
        expect(kinstaLink).toHaveAttribute('rel', 'noreferrer');

        const kinstaAPILink = screen.getByText('Kinsta API');
        expect(kinstaAPILink).toBeInTheDocument();
        expect(kinstaAPILink).toHaveAttribute('href', 'https://kinsta.com/docs/kinsta-api-intro/');
        expect(kinstaAPILink).toHaveAttribute('target', '_blank');
        expect(kinstaAPILink).toHaveAttribute('rel', 'noreferrer');
    });
});
