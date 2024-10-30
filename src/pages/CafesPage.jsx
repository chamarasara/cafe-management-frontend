import React from 'react';
import { useFetchCafes, useDeleteCafe } from '../api';
import { Link } from '@tanstack/react-router';
import { Button, Grid, CircularProgress, Alert } from '@mui/material';
import CafeTable from '../components/CafeTable';

const CafesPage = () => {
  
  const { data: cafes, isLoading, error } = useFetchCafes(); // Using the corrected hook
  const { mutate: deleteCafe } = useDeleteCafe();

  console.log(cafes);
  
  if (isLoading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Alert severity="error">Error fetching cafes: {error.message}</Alert>
      </Grid>
    );
  }

  const handleDelete = (id) => {
    deleteCafe(id);
  };

  return (
    <Grid container spacing={3} direction="column" alignItems="flex-start" justifyContent="flex-end">
      <Grid item xs={12}>
        {/* Container for heading and button */}
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Link to="/add-cafe">
              <Button variant="contained" color="primary">Add New Café</Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} style={{ width: '100%' }}>
        <CafeTable cafes={cafes} handleDelete={handleDelete} />
      </Grid>
    </Grid>
  );
};

export default CafesPage;
