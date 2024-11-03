import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeTable from '../../components/EmployeeTable';

// Mock data for employees
const mockEmployees = [
  { id: 1, name: 'John Doe', email_address: 'john@example.com', phone_number: '1234567890', days_worked: 20, gender: 'Male' },
  { id: 2, name: 'Jane Smith', email_address: 'jane@example.com', phone_number: '0987654321', days_worked: 15, gender: 'Female' },
];

// Mock functions
const mockHandleEdit = jest.fn();
const mockHandleDelete = jest.fn();

// Helper function to render the EmployeeTable component
const renderEmployeeTable = () => {
  render(
    <EmployeeTable
      employees={mockEmployees}
      handleEdit={mockHandleEdit}
      handleDelete={mockHandleDelete}
    />
  );
};

describe('EmployeeTable component', () => {

  test('renders employee table with correct data', () => {
    renderEmployeeTable();

    // Check if the table headers are rendered
    expect(screen.getByText(/Employee ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Employee Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByText(/Days Worked/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByText(/Actions/i)).toBeInTheDocument();

    // Check if the employee data is rendered
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/jane@example.com/i)).toBeInTheDocument();
  });

  test('calls handleEdit when the Edit button is clicked', () => {
    renderEmployeeTable();

    // Find the Edit button for the first employee and click it
    const editButtons = screen.getAllByRole('button', { name: /Edit/i });
    fireEvent.click(editButtons[0]);

    // Check if handleEdit was called with the correct data
    expect(mockHandleEdit).toHaveBeenCalledWith(mockEmployees[0]);
  });

  test('calls handleDelete when the Delete button is clicked', () => {
    renderEmployeeTable();

    // Find the Delete button for the first employee and click it
    const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButtons[0]);

    // Check if handleDelete was called with the correct employee ID
    expect(mockHandleDelete).toHaveBeenCalledWith(mockEmployees[0].id);
  });

  test('renders pagination with correct number of items per page', () => {
    renderEmployeeTable();

    // Check if pagination controls are rendered
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeGreaterThan(1); 

    // Ensure the page contains the correct number of employees
    expect(rows[1]).toHaveTextContent('John Doe');
    expect(rows[2]).toHaveTextContent('Jane Smith');
  });
});
