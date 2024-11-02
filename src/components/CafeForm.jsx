import React, { useState } from 'react';
import { Button, TextField, Snackbar, Alert, Grid, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from '@tanstack/react-router';
import { createCafe, updateCafe } from '../api'; 

const CafeForm = ({ cafeData, onClose, onCafeCreation }) => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      name: cafeData ? cafeData.name : '',
      description: cafeData ? cafeData.description : '',
      location: cafeData ? cafeData.location : '',
    },
  });

  const onSubmit = async (data) => {
    try {
      if (cafeData) {
        await updateCafe(cafeData.id, data);
      } else {
        const newCafe = await createCafe(data);
        onCafeCreation(newCafe.data); 
      }
      onClose();
      navigate('/');
    } catch (err) {
      console.error("Error saving cafe:", err);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      setSnackbarOpen(true);
    } else {
      onClose();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Paper elevation={1} style={{ padding: '30px', width: '350px' }}>
        <h1>{cafeData ? 'Edit Cafe' : 'Add New Cafe'}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name"
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 6, message: 'Minimum length is 6 characters' },
              maxLength: { value: 10, message: 'Maximum length is 10 characters' },
            })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            {...register('description', { maxLength: { value: 256, message: 'Maximum length is 256 characters' } })}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ''}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Location"
            {...register('location', { required: 'Location is required' })}
            error={!!errors.location}
            helperText={errors.location ? errors.location.message : ''}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </form>
      </Paper>

      <Snackbar open={snackbarOpen} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="warning">
          You have unsaved changes!
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default CafeForm;
