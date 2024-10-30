// src/pages/EmployeesPage.js
import React from 'react';
import EmployeeTable from '../components/EmployeeTable';
import { deleteEmployee } from '../api';
import { AgGridReact } from 'ag-grid-react';
import { Link, getRouteApi } from '@tanstack/react-router';
import { Button, Grid } from '@mui/material';

const routeApi = getRouteApi("/$id")
const EmployeesPage = () => {

  const employees = routeApi.useLoaderData();

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    refetch();
  };

  return (
    <Grid container spacing={3} direction="column" alignItems="flex-start" justifyContent="flex-end">
      <Grid item xs={12}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Link to="/add-employee">
              <Button variant="contained" color="primary">Add New Employee</Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ width: '100%' }}>
        <EmployeeTable employees={employees} handleDelete={handleDelete} />
      </Grid>
    </Grid>
  );
};

export default EmployeesPage;
