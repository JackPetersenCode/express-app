import { render, screen } from '@testing-library/react';
import React from 'react';
import Login from './Login';
import '@testing-library/jest-dom';
import KudosRating from './KudosRating';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register';

const MockRegister = () => {
    return (
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    )
}

it('renders the login component', () => {
    render(<MockRegister />);
    const flower = screen.getAllByRole("img");
    expect(flower[0]).toBeInTheDocument();
})