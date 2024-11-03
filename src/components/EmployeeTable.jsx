import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const EmployeeTable = ({ employees, handleEdit, handleDelete }) => {
  const columnDefs = [
    { field: 'id', headerName: 'Employee ID', resizable: true },
    { field: 'name', headerName: 'Employee Name', resizable: true },
    { field: 'email_address', headerName: 'Email', resizable: true, minWidth: 300 },
    { field: 'phone_number', headerName: 'Phone', resizable: true },
    { field: 'days_worked', headerName: 'Days Worked', resizable: true, maxWidth: 130 },
    { field: 'gender', headerName: 'Gender', resizable: true, maxWidth: 100 },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <div>
          <Button
            variant="outlined"
            style={{ marginRight: '4px', padding: '4px 8px' }}
            onClick={() => handleEdit(params.data)}
          >
            <Edit fontSize="small" />
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete(params.data.id)}
            style={{ padding: '4px 8px' }}
          >
            <Delete fontSize="small" />
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
