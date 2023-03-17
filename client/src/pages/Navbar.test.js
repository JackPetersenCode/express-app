import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './NavBar';

const MockNavbar = () => {
    return (
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    )
}

it('renders the login component', () => {
    render(<MockNavbar />);
    const flower = screen.getAllByRole("img");
    expect(flower[0]).toBeInTheDocument();
})

it('renders top nav links', () => {
    render(<MockNavbar />);
    let text = [];
    text.push(screen.getByText(/for business/i));
    text.push(screen.getByText(/write a review/i));
    text.forEach((element) => {
        expect(element).toBeInTheDocument();
    })
})