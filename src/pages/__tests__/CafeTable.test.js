import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CafeTable from '../../components/CafeTable';

jest.mock('@tanstack/react-router', () => ({
    Link: jest.fn(({ to, children }) => <a href={to}>{children}</a>),
    Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

jest.mock('@mui/material', () => ({
    Button: jest.fn(({ children, ...props }) => <button {...props}>{children}</button>),
}));

describe('CafeTable Component', () => {
    const mockHandleDelete = jest.fn();
    const mockHandleEditClick = jest.fn();

    const mockCafes = [
        { id: 1, name: 'Cafe A', description: 'A cozy place', employeeCount: 5, location: 'New York' },
        { id: 2, name: 'Cafe B', description: 'Modern and sleek', employeeCount: 10, location: 'Los Angeles' },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const renderCafeTable = () => {
        return render(
            <CafeTable 
                cafes={mockCafes}
                handleDelete={mockHandleDelete}
                handleEditClick={mockHandleEditClick}
            />
        );
    };

    test('renders the AgGrid table with cafes data', () => {
        renderCafeTable();

        expect(screen.getByText('Cafe A')).toBeInTheDocument();
        expect(screen.getByText('Cafe B')).toBeInTheDocument();
        expect(screen.getByText('A cozy place')).toBeInTheDocument();
        expect(screen.getByText('Modern and sleek')).toBeInTheDocument();
        expect(screen.getByText('5 Employees')).toBeInTheDocument();
        expect(screen.getByText('10 Employees')).toBeInTheDocument();
        expect(screen.getByText('New York')).toBeInTheDocument();
        expect(screen.getByText('Los Angeles')).toBeInTheDocument();
    });

    test('calls handleEditClick when the Edit button is clicked', () => {
        renderCafeTable();
    
        const editButtons = screen.getAllByLabelText('Edit');
    
        fireEvent.click(editButtons[0]);
    
        expect(mockHandleEditClick).toHaveBeenCalledWith(mockCafes[0]);
    });
    

    test('calls handleDelete when the Delete button is clicked', () => {
        renderCafeTable();

        const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
        
        fireEvent.click(deleteButtons[0]);
        
        expect(mockHandleDelete).toHaveBeenCalledWith(mockCafes[0].id);
    });
    
});
