import React, { useState } from 'react';
import { Button, Snackbar, Alert, Grid, Paper } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from '@tanstack/react-router';
import { createCafe, updateCafe } from '../api'; 
import TextInput from './TextInput';

const CafeForm = ({ cafeData, onClose,refetch, onCafeCreation }) => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const methods = useForm({
    defaultValues: {
      name: cafeData ? cafeData.name : '',
      description: cafeData ? cafeData.description : '',
      location: cafeData ? cafeData.location : '',
    },
  });

  const { handleSubmit, formState: { isDirty } } = methods;

  const onSubmit = async (data) => {
    try {
      if (cafeData) {
        await updateCafe(cafeData.id, data);
        navigate('/');
      } else {
        const newCafe = await createCafe(data);
        onCafeCreation(newCafe.data); 
      }
      refetch();
      onClose();
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
    <FormProvider {...methods}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Paper elevation={1} style={{ padding: '30px', width: '350px' }}>
          <h1>{cafeData ? 'Edit Cafe' : 'Add New Cafe'}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              name="name"
              label="Name"
              rules={{
                required: 'Name is required',
                minLength: { value: 6, message: 'Minimum length is 6 characters' },
                maxLength: { value: 10, message: 'Maximum length is 10 characters' },
              }}
            />
            <TextInput
              name="description"
              label="Description"
              rules={{
                maxLength: { value: 256, message: 'Maximum length is 256 characters' },
              }}
            />
            <TextInput
              name="location"
              label="Location"
              rules={{ required: 'Location is required' }}
            />
            <Button type="submit" variant="contained" color="primary" style={{marginTop:"20px"}}>
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel} style={{marginLeft:"5px", marginTop:"20px"}}>
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
    </FormProvider>
  );
};

export default CafeForm;
