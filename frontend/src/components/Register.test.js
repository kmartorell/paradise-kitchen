import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
import Register from "./Register"

afterEach(() => {
    cleanup();
})

test('renders Register page', () => {
    render(<Register />)
    
})