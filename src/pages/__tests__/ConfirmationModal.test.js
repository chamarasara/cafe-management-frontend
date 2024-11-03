import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationModal from '../../components/DeleteConfirmationModal';

describe('ConfirmationModal', () => {
  const onClose = jest.fn();
  const onConfirm = jest.fn();
  const itemName = 'Test Cafe';
  const itemType = 'cafe';

  beforeEach(() => {
    // Render the modal before each test
    render(
      <ConfirmationModal 
        open={true} 
        onClose={onClose} 
        onConfirm={onConfirm} 
        itemName={itemName} 
        itemType={itemType} 
      />
    );
  });

  it('renders correctly', () => {
    // Check if modal is rendered
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('displays the correct message', () => {
    // Check if the confirmation message is correct
    expect(screen.getByText(`Are you sure you want to delete "${itemName}" cafe?`)).toBeInTheDocument();
  });

  it('calls onClose when Cancel button is clicked', () => {
    // Click the Cancel button
    fireEvent.click(screen.getByText('Cancel'));
    
    // Check if onClose is called
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onConfirm when Delete button is clicked', () => {
    // Click the Delete button
    fireEvent.click(screen.getByText('Delete'));
    
    // Check if onConfirm is called
    expect(onConfirm).toHaveBeenCalled();
  });
});