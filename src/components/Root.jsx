import { Outlet } from '@tanstack/react-router';
import { Grid } from '@mui/material';
import React from 'react';

const Root = () => {
    return (
        <>
            <div
                style={{
                    padding: '20px',
                    margin: '20px',
                }}
            >
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ marginBottom: '20px' }}
                >
                    <h1>CAFE EMPLOYEE MANAGEMENT</h1>
                </Grid>
                <Outlet />
            </div>
        </>
    );
};

export default Root;
