import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
import NavBar from "./ViewNavBar";

afterEach(() => {
    cleanup();
})

test('renders Navbar', () => {
    render(<NavBar />)

})