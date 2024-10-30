// src/components/EmployeeForm.js
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { createEmployee, updateEmployee } from '../api';
import { useNavigate, useParams } from '@tanstack/react-router';
import { Button } from '@mui/material';

const EmployeeForm = ({ handleSubmit, pristine, submitting }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit = async (formValues) => {
    if (id) {
      await updateEmployee(id, formValues);
    } else {
      await createEmployee(formValues);
    }
    navigate('/employees');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <Field name="name" component="input" type="text" required />
      </div>
      <div>
        <label>Email</label>
        <Field name="email" component="input" type="email" required />
      </div>
      <div>
        <label>Phone Number</label>
        <Field name="phone" component="input" type="tel" required />
      </div>
      <div>
        <label>Gender</label>
        <Field name="gender" component="select">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Field>
      </div>
      <div>
        <label>Assigned Café</label>
        <Field name="cafeId" component="input" type="text" required />
      </div>
      <Button type="submit" disabled={pristine || submitting}>Submit</Button>
      <Button type="button" onClick={() => navigate('/employees')}>Cancel</Button>
    </form>
  );
};

export default reduxForm({ form: 'employeeForm' })(EmployeeForm);
