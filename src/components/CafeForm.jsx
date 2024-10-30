import React, { useEffect, useState } from 'react';
import { Button, TextField, Snackbar, Alert, Grid, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from '@tanstack/react-router'; // Make sure to import useNavigate
import { createCafe } from '../api';

const CafeForm = () => {
  const navigate = useNavigate(); // Use the navigate function
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm();

  // Optionally, handle fetching existing cafe data when editing
  // useEffect(() => {
  //   if (id) {
  //     fetchCafe(id)
  //       .then(data => {
  //         if (data) {
  //           setValue('name', data.name);
  //           setValue('description', data.description);
  //           setValue('location', data.location);
  //         } else {
  //           setFetchError('Cafe not found');
  //         }
  //       })
  //       .catch(err => {
  //         console.error("Failed to fetch cafe:", err);
  //         setFetchError('Error fetching cafe data');
  //       });
  //   }
  // }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await createCafe(data);
      navigate('/'); // Redirect to cafes page after submission
    } catch (err) {
      console.error("Error saving cafe:", err);
      // Handle error saving the cafe
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      setSnackbarOpen(true);
    } else {
      navigate('/'); 
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
      style={{ minHeight: '100vh' }} 
    >
      <Paper elevation={3} style={{ padding: '20px', width: '400px' }}> 
        <h1>Add New Cafe</h1>
        {/* {fetchError && <Alert severity="error">{fetchError}</Alert>} */}
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
