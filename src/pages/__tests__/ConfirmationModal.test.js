import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationModal from '../../components/DeleteConfirmationModal';

describe('ConfirmationModal', () => {
  const onClose = jest.fn();
  const onConfirm = jest.fn();
  const itemName = 'Test Cafe';
  const itemType = 'cafe';

  beforeEach(() => {
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
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('displays the correct message', () => {
    expect(screen.getByText(`Are you sure you want to delete "${itemName}" cafe?`)).toBeInTheDocument();
  });

  it('calls onClose when Cancel button is clicked', () => {
    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onConfirm when Delete button is clicked', () => {
    fireEvent.click(screen.getByText('Delete'));
    expect(onConfirm).toHaveBeenCalled();
  });
});