import { render, screen } from '@testing-library/react';
import React from 'react';
import Login from './Login';
import '@testing-library/jest-dom';
import KudosRating from './KudosRating';
import { BrowserRouter } from 'react-router-dom';

const MockLogin = () => {
    return (
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    )
}

it('renders the flower component', async() => {
    render(<KudosRating />);
    const flower = screen.getByTestId("review-count");
    expect(flower).toBeInTheDocument();
})

it('renders the login component', () => {
    render(<MockLogin />);
    const flower = screen.getAllByRole("img");
    expect(flower[0]).toBeInTheDocument();
})