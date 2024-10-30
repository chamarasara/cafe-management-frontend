import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const EmployeeTable = ({ employees, handleDelete }) => {
  const columnDefs = [
    { field: 'id', headerName: 'Employee ID', resizable: true },
    { field: 'name', headerName: 'Name', resizable: true },
    { field: 'email_address', headerName: 'Email', resizable: true },
    { field: 'phone_number', headerName: 'Phone', resizable: true },
    { field: 'days_worked', headerName: 'Days Worked', resizable: true },
    { field: 'gender', headerName: 'Gender', resizable: true },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <div>
          <Link to={`/edit-employee/${params.data.id}`}>
            <Button variant="outlined">Edit</Button>
          </Link>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete(params.data.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '600px' }}>
      <div className="ag-theme-alpine" style={{ width: '100%', height: '100%' }}>
        <AgGridReact
          rowData={employees}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
};

export default EmployeeTable;
