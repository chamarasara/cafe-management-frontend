import React, { useState, useEffect } from 'react';
import { useDeleteCafe, useFetchCafes } from '../api';
import { Button, Grid, CircularProgress, Alert, TextField } from '@mui/material';
import CafeTable from '../components/CafeTable';
import CafeForm from '../components/CafeForm';
import Modal from '@mui/material/Modal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

const CafesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const { data: cafesData, isLoading, error, refetch } = useFetchCafes(currentSearchTerm);
  const [cafes, setCafes] = useState(cafesData || []);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemType, setItemType] = useState('');

  useEffect(() => {
    if (cafesData) setCafes(cafesData);
  }, [cafesData]);

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

  const handleDeleteConfirmation = (id, name) => {
    setItemToDelete({ id, name });
    setItemType('cafe');
    setConfirmDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (itemToDelete) {
      try {
        await useDeleteCafe(itemToDelete.id);
        setCafes(cafes.filter(cafe => cafe.id !== itemToDelete.id));
      } catch (error) {
        console.error("Error deleting employee:", error);
      } finally {
        setConfirmDeleteOpen(false);
        setItemToDelete(null);
      }
    }
  };

  const handleCafeCreation = (newCafe) => {
    if (selectedCafe) {
      setCafes(cafes.map(cafe => (cafe.id === newCafe.id ? newCafe : cafe)));
    } else {
      setCafes([...cafes, newCafe]);
    }
    handleCloseModal();
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
            style={{ marginLeft: '10px', padding: '8px 12px' }}
          >
            Search
          </Button>
        </Grid>
        <Grid item>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => handleCafeModal(null)}
            style={{ padding: '8px 12px' }}
          >
            Add New Cafe
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12} style={{ width: '100%' }}>
        <CafeTable cafes={cafes} handleDelete={handleDeleteConfirmation} handleEditClick={handleCafeModal} />
      </Grid>

      <Modal open={openModal} onClose={handleCloseModal}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CafeForm cafeData={selectedCafe} refetch={refetch} onClose={handleCloseModal} onCafeCreation={handleCafeCreation} />
        </div>
      </Modal>

      <DeleteConfirmationModal
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={handleDelete}
        itemName={itemToDelete?.name}
        itemType={itemType}
      />
    </Grid>
  );
};

export default CafesPage;
