import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
import FavoritesBody from './FavoritesBody';

afterEach(() => {
    cleanup();
})

test('renders favorites page', () => {
    render(<FavoritesBody />)
    
})