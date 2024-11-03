import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import TextInput from '../../components/TextInput';

// Wrapper component to use useForm and provide it to the TextInput component
const Wrapper = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('TextInput Component', () => {
  test('renders correctly', () => {
    render(
      <Wrapper>
        <TextInput 
          name="test" 
          label="Test Label" 
        />
      </Wrapper>
    );

    const inputElement = screen.getByLabelText(/Test Label/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('does not display an error message when the input is valid', async () => {
    render(
      <Wrapper>
        <TextInput 
          name="test" 
          label="Test Label" 
          rules={{ required: 'This field is required' }} 
        />
      </Wrapper>
    );

    const inputElement = screen.getByLabelText(/Test Label/i);

    // Input a valid value
    fireEvent.change(inputElement, { target: { value: 'Some value' } });
    fireEvent.blur(inputElement); // Trigger validation

    // There should be no error message displayed
    const errorMessage = screen.queryByText(/This field is required/i);
    expect(errorMessage).not.toBeInTheDocument();
  });
});
