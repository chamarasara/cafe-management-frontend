import React, { useState } from 'react';
import EmployeeTable from '../components/EmployeeTable';
import { getRouteApi, useMatch } from '@tanstack/react-router';
import { Button, Grid, Modal } from '@mui/material';
import EmployeeForm from '../components/EmployeeForm';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { deleteEmployee } from '../api';

const EmployeesPage = () => {
  const match = useMatch("/$id");
  const cafeId = match?.params?.id; 
  const routeApi = getRouteApi(cafeId ? "/$id" : "/employees");
  const [employees, setEmployees] = useState(routeApi.useLoaderData());
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [itemType, setItemType] = useState('');

  const handleEmployeeModal = (employee) => {
    setSelectedEmployee(employee);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
    setOpenModal(false);
  };

  const handleDeleteConfirmation = (id, name) => {
    setItemToDelete({ id, name });
    setItemType('employee');
    setConfirmDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (itemToDelete) {
      try {
        await deleteEmployee(itemToDelete.id);
        setEmployees(employees.filter(employee => employee.id !== itemToDelete.id));
      } catch (error) {
        console.error("Error deleting employee:", error);
      } finally {
        setConfirmDeleteOpen(false);
        setItemToDelete(null);
      }
    }
  };


  return (
    <Grid container spacing={3} direction="column" alignItems="flex-start">
      <Grid item xs={12}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => handleEmployeeModal(null)}>Add New Employee</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ width: '100%' }}>
        <EmployeeTable employees={employees} handleDelete={handleDeleteConfirmation} handleEdit={handleEmployeeModal} />
      </Grid>
      <DeleteConfirmationModal
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={handleDelete}
        itemName={itemToDelete?.name}
        itemType={itemType}
      />
      <Modal open={openModal} onClose={handleCloseModal}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <EmployeeForm employeeData={selectedEmployee} cafeId={cafeId} onClose={handleCloseModal} />
        </div>
      </Modal>
    </Grid>
  );
};

export default EmployeesPage;
