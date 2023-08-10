import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter to provide a router context
import '@testing-library/jest-dom'; // Import this to use jest-dom matchers

import Home from './Home';

test('renders Home component with form elements', () => {
    render(
        // Wrap the Home component with MemoryRouter to provide a router context for testing
        <MemoryRouter>
            <Home />
        </MemoryRouter>
    );

    // Test the presence of the form elements
    const siteNameLabel = screen.getByText('Site name');
    const displayNameLabel = screen.getByText('Display name');
    const wpAdminUsernameLabel = screen.getByText('WordPress admin username');
    const wpAdminEmailLabel = screen.getByText('WordPress admin email');
    const wpAdminPasswordLabel = screen.getByText('WordPress admin password');
    const centerLocationLabel = screen.getByText('Data center location');
    const installWooCommerceLabel = screen.getByText('Install WooCommerce');
    const installYoastLabel = screen.getByText('Install Yoast SEO');
    const createSiteButton = screen.getByText('Create Site');

    // Assertions to check the presence of the form elements
    expect(siteNameLabel).toBeInTheDocument();
    expect(displayNameLabel).toBeInTheDocument();
    expect(wpAdminUsernameLabel).toBeInTheDocument();
    expect(wpAdminEmailLabel).toBeInTheDocument();
    expect(wpAdminPasswordLabel).toBeInTheDocument();
    expect(centerLocationLabel).toBeInTheDocument();
    expect(installWooCommerceLabel).toBeInTheDocument();
    expect(installYoastLabel).toBeInTheDocument();
    expect(createSiteButton).toBeInTheDocument();
});
