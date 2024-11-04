import React, { useEffect } from 'react';
import { Button, Grid, Paper, MenuItem } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { createEmployee, updateEmployee, useFetchCafes } from '../api';
import TextInput from './TextInput';

const EmployeeForm = ({ employeeData, onClose }) => {
  const { data: cafesData } = useFetchCafes();
  const methods = useForm({
    defaultValues: employeeData || {},
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (employeeData) {
      reset(employeeData);
    }
  }, [employeeData, reset]);

  const onSubmit = async (formValues) => {
    try {
      if (employeeData) {
        await updateEmployee(employeeData.id, formValues);
      } else {
        await createEmployee(formValues);
      }
      onClose();
      location.reload()
    } catch (err) {
      console.error('Error saving employee:', err);
    }
  };

  return (
    <FormProvider {...methods}>
      <Grid container direction="column" alignItems="center" justifyContent="center">
        <Paper elevation={1} style={{ padding: '30px', width: '350px' }}>
          <h1>{employeeData ? 'Edit Employee' : 'Add New Employee'}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              name="name"
              label="Name"
              rules={{ required: 'Name is required' }}
            />
            <TextInput
              name="email_address"
              label="Email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Email is not valid',
                },
              }}
            />
            <TextInput
              name="phone_number"
              label="Phone Number"
              rules={{
                required: 'Phone Number is required',
                pattern: {
                  value: /^[89]\d{7}$/, 
                  message: 'Phone number must start with 8 or 9 and be 8 digits long',
                },
              }}
            />
            <TextInput
              name="gender"
              label="Gender"
              rules={{ required: 'Gender is required' }}
              select
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextInput>
            <TextInput
              name="cafeId"
              label="Cafe"
              select
              rules={{ required: 'Cafe selection is required' }}
            >
              <MenuItem value="">Select Cafe</MenuItem>
              {cafesData && cafesData.map((cafe) => (
                <MenuItem key={cafe.id} value={cafe.id}>{cafe.name}</MenuItem>
              ))}
            </TextInput>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose} style={{ marginLeft: '5px', marginTop: '20px' }}>
              Cancel
            </Button>
          </form>
        </Paper>
      </Grid>
    </FormProvider>
  );
};

export default EmployeeForm;
