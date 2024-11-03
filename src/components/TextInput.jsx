import React from 'react';
import { TextField } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const TextInput = ({ name, label, rules, select, children }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue="" 
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          select={select} 
          error={!!error}
          helperText={error ? error.message : null}
          fullWidth
          value={field.value || ""} 
          sx={{ mt: 2, mb: 2 }}
        >
          {select && children} 
        </TextField>
      )}
    />
  );
};

export default TextInput;
