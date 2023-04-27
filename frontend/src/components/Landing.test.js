import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
import LandingBody from './LandingBody';

afterEach(() => {
    cleanup();
})

test('renders landing page', () => {
    render(<LandingBody />)
    
})