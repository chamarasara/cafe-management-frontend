import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_BASE_URL;

export const useFetchCafes = (searchTerm) => {
  return useQuery({
    queryKey: ['cafes', searchTerm],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/cafes${searchTerm ? `?location=${searchTerm}` : ''}`);
      return data; 
    },
    enabled: true,
  });
};

export const fetchAllEmployees = async (cafe_Id) => {
  const response = await fetch(`${API_URL}/employees`);
  if (!response.ok) {
      throw new Error('Failed to fetch employees');
  }
  return response.json();
};

export const fetchEmployeesByCafe = async (cafe_Id) => {
  const response = await fetch(`${API_URL}/cafes/${cafe_Id}/employees`);
  if (!response.ok) {
      throw new Error('Failed to fetch employees');
  }
  return response.json();
};

export const createCafe = async (cafe) => {
  return await axios.post(`${API_URL}/cafe`, cafe);
};

export const updateCafe = async (id, cafe) => {
  return await axios.put(`${API_URL}/cafe/${id}`, cafe);
};

export const useDeleteCafe = async (id) => {
  return await axios.delete(`${API_URL}/cafe/${id}`);
};

export const createEmployee = async (employee) => {
  return await axios.post(`${API_URL}/employee`, employee);
};

export const updateEmployee = async (id, employee) => {
  return await axios.put(`${API_URL}/employee/${id}`, employee);
};

export const deleteEmployee = async (id) => {
  return await axios.delete(`${API_URL}/employee/${id}`);
};
