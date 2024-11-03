import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeTable from '../../components/EmployeeTable';

const mockEmployees = [
  { id: 1, name: 'John Doe', email_address: 'john@example.com', phone_number: '1234567890', days_worked: 20, gender: 'Male' },
  { id: 2, name: 'Jane Smith', email_address: 'jane@example.com', phone_number: '0987654321', days_worked: 15, gender: 'Female' },
];

const mockHandleEdit = jest.fn();
const mockHandleDelete = jest.fn();

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

    expect(screen.getByText(/Employee ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Employee Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByText(/Days Worked/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByText(/Actions/i)).toBeInTheDocument();

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/jane@example.com/i)).toBeInTheDocument();
  });

  test('calls handleEdit when the Edit button is clicked', () => {
    renderEmployeeTable();

    const editButtons = screen.getAllByRole('button', { name: /Edit/i });
    fireEvent.click(editButtons[0]);

    expect(mockHandleEdit).toHaveBeenCalledWith(mockEmployees[0]);
  });

  test('calls handleDelete when the Delete button is clicked', () => {
    renderEmployeeTable();

    const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButtons[0]);

    expect(mockHandleDelete).toHaveBeenCalledWith(mockEmployees[0].id);
  });

  test('renders pagination with correct number of items per page', () => {
    renderEmployeeTable();

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeGreaterThan(1); 

    expect(rows[1]).toHaveTextContent('John Doe');
    expect(rows[2]).toHaveTextContent('Jane Smith');
  });
});
