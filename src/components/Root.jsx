import { Outlet } from '@tanstack/react-router';
import { Grid } from '@mui/material';
import React from 'react';

const Root = ({ handleSubmit, pristine, submitting }) => {
    return <>
        <div container spacing={0} direction="column" alignItems="center" justifyContent="center">
            <Grid spacing={0} direction="column" alignItems="center" justifyContent="center">
                <h1>CAFE EMPLOYEE MANAGEMENT</h1>
            </Grid>
            <Outlet />
        </div>
      
    </>
}

export default Root;