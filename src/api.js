// src/api.js
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

export const fetchEmployees = async (cafeId) => {
  const response = await fetch(`${API_URL}/cafes/${cafeId}/employees`);
  if (!response.ok) {
      throw new Error('Failed to fetch employees');
  }
  return response.json();
};

export const createCafe = async (cafe) => {
  return await axios.post(`${API_URL}/cafe`, cafe);
};

export const updateCafe = async (id, cafe) => {
  return await axios.put(`${API_URL}/cafes/${id}`, cafe);
};

export const useDeleteCafe = async (id) => {
  return await axios.delete(`${API_URL}/cafes/${id}`);
};

export const createEmployee = async (employee) => {
  return await axios.post(`${API_URL}/employees`, employee);
};

export const updateEmployee = async (id, employee) => {
  return await axios.put(`${API_URL}/employees/${id}`, employee);
};

export const deleteEmployee = async (id) => {
  return await axios.delete(`${API_URL}/employees/${id}`);
};
