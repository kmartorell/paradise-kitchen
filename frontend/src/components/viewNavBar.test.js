import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
import ViewNavBar from './ViewNavBar';

afterEach(() => {
    cleanup();
})

test('renders landing page', () => {
    render(<ViewNavBar />)
    
})