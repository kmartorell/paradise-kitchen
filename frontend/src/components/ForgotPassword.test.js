import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
import ForgotPassword from "./ForgotPassword";

afterEach(() => {
    cleanup();
})

test('renders confirm page', () => {
    render(<ForgotPassword />)
    
})
