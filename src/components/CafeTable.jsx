import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const CafeTable = ({ cafes, handleDelete }) => {

    const columnDefs = [
    
        { field: 'name', headerName: 'Name', resizable: true },
        { field: 'description', headerName: 'Description', resizable: false, minWidth: 600 },
        {
            field: 'employeeCount',
            headerName: 'Employees',
            resizable: true,
            cellRenderer: (params) => (
                <Link to={`/${params.data.id}`}>
                    {params.value} Employees
                </Link>
            ),
        },
        { field: 'location', headerName: 'Location', resizable: true },
        {
            headerName: 'Actions',
            cellRenderer: (params) => (
                <div>
                    <Link to={`/edit-cafe/${params.data.id}`}>
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
        <div
            className="ag-theme-alpine"
            style={{
                width: '100%',
                height: '100%', 
                minHeight: '400px', 
            }}
        >
            <AgGridReact
                rowData={cafes}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
                domLayout="autoHeight" 
            />
        </div>
    );
};

export default CafeTable;
