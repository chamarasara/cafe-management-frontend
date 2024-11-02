import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { Visibility, Edit, Delete } from '@mui/icons-material'; 
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

const CafeTable = ({ cafes, handleDelete, handleEditClick }) => {

    const columnDefs = [
        { field: 'name', headerName: 'Cafe Name', resizable: true },
        { field: 'description', headerName: 'Description', resizable: false, minWidth: 500 },
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
            width: 300,
            cellRenderer: (params) => (
                <div>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleEditClick(params.data)}
                        style={{ marginRight: '4px', padding: '4px 8px' }}
                    >
                        <Visibility fontSize="small"/>
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleEditClick(params.data)}
                        style={{ marginRight: '4px', padding: '4px 8px' }}
                    >
                        <Edit fontSize="small"/> 
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleDelete(params.data.id)}
                        style={{ padding: '4px 8px' }}
                    >
                        <Delete fontSize="small"/>
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
