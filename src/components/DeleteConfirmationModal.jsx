import React from 'react';
import { Button, Modal, Typography } from '@mui/material';

const ConfirmationModal = ({ open, onClose, onConfirm, itemName, itemType }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div role="dialog" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <Typography variant="h6">
            Are you sure you want to delete "{itemName}" {itemType === 'cafe' ? 'cafe' : 'employee'}?
          </Typography>
          <div style={{ marginTop: '20px' }}>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={onConfirm}
              style={{ marginLeft: '10px' }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
