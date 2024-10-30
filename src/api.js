// src/api.js
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_URL = 'http://localhost:3000/api';

export const useFetchCafes = () => {
  return useQuery({
    queryKey: ['cafes'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/cafes?location=`);
      console.log(data); 
      return data; 
    },
  });
};

export const fetchEmployees = async (cafeId) => {
  console.log(cafeId)
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
