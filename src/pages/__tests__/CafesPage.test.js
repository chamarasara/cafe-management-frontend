import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CafesPage from '../CafesPage';
import { useFetchCafes, useDeleteCafe } from '../../api';

// Mock the API calls
jest.mock('../../api', () => ({
    useFetchCafes: jest.fn(),
    useDeleteCafe: jest.fn(),
}));

const queryClient = new QueryClient();

const renderCafesPage = () => {
    return render(
        <QueryClientProvider client={queryClient}>
            <CafesPage />
        </QueryClientProvider>
    );
};

describe('CafesPage', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
    });

    test('renders loading state', () => {
        useFetchCafes.mockReturnValue({ data: null, isLoading: true, error: null });
        
        renderCafesPage();

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    test('renders error state', () => {
        useFetchCafes.mockReturnValue({ data: null, isLoading: false, error: { message: 'Error fetching cafes' } });
        
        renderCafesPage();

        expect(screen.getByText(/Error fetching cafes/i)).toBeInTheDocument();
    });


    test('handles search input change', () => {
        useFetchCafes.mockReturnValue({ data: [], isLoading: false, error: null });
        
        renderCafesPage();

        const searchInput = screen.getByLabelText(/Search Cafes/i);
        fireEvent.change(searchInput, { target: { value: 'Cafe 1' } });
        
        expect(searchInput.value).toBe('Cafe 1');
    });
});
