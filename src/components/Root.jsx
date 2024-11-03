import { Outlet, Link } from '@tanstack/react-router';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import React from 'react';

const activeProps = {
    className: "font-bold",
};

const Root = () => {
    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
                <Toolbar>
                    <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <nav>
                            <Button
                                component={Link}
                                to="/"
                                activeProps={activeProps}
                                color="inherit"
                                sx={{
                                    '&:hover': { backgroundColor: '#1565c0' },
                                    marginLeft: '16px',
                                    transition: 'background-color 0.3s ease',
                                }}
                            >
                                Cafes
                            </Button>
                            <Button
                                component={Link}
                                to="/employees"
                                activeProps={activeProps}
                                color="inherit"
                                sx={{
                                    '&:hover': { backgroundColor: '#1565c0' },
                                    marginLeft: '16px',
                                    transition: 'background-color 0.3s ease',
                                }}
                            >
                                Employees
                            </Button>
                        </nav>
                        <Typography variant="h6" sx={{ textAlign: 'center', flexGrow: 1 }}>
                            CAFE EMPLOYEE MANAGEMENT
                        </Typography>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container
                sx={{
                    paddingTop: '20px',
                    marginTop: '30px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    maxWidth: '1500px'
                }}
            >
                <Outlet />
            </Container>
        </>
    );
};

export default Root;
