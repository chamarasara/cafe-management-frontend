import React, { useState } from 'react';
import { useFetchCafes, useDeleteCafe } from '../api';
import { Button, Grid, CircularProgress, Alert, TextField } from '@mui/material';
import CafeTable from '../components/CafeTable';
import CafeForm from '../components/CafeForm';
import Modal from '@mui/material/Modal';

const CafesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const { data: cafesData, isLoading, error } = useFetchCafes(currentSearchTerm);
  // const { mutate: deleteCafe } = useDeleteCafe(); // Uncomment this line to enable deletion

  const [selectedCafe, setSelectedCafe] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleCafeModal = (cafe) => {
    setSelectedCafe(cafe);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCafe(null);
    setOpenModal(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    setCurrentSearchTerm(searchTerm);
  };

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
      <Grid item xs={12} container spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            size="small"
            label="Search Cafes"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleSearchClick}
            style={{marginLeft:"10px", padding:"8px 12px"}}
          >
            Search
          </Button>
        </Grid>
        <Grid item>
          <Button size="small" variant="contained" color="primary" onClick={() => handleCafeModal(null)}
          style={{padding:"8px 12px"}}
          >
            Add New Cafe
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12} style={{ width: '100%' }}>
        <CafeTable cafes={cafesData} handleDelete={handleDelete} handleEditClick={handleCafeModal} />
      </Grid>

      <Modal open={openModal} onClose={handleCloseModal}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CafeForm cafeData={selectedCafe} onClose={handleCloseModal} />
        </div>
      </Modal>
    </Grid>
  );
};

export default CafesPage;
