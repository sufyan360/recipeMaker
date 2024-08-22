import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/';

// Recipes API
export const getRecipes = () => axios.get(`${API_BASE_URL}recipes/`);
export const getRecipe = (id) => axios.get(`${API_BASE_URL}recipes/${id}/`);
export const createRecipe = (data) => axios.post(`${API_BASE_URL}recipes/`, data);
export const updateRecipe = (id, data) => axios.put(`${API_BASE_URL}recipes/${id}/`, data);
export const deleteRecipe = (id) => axios.delete(`${API_BASE_URL}recipes/${id}`);

// Ingredients API
export const getIngredients = () => axios.get(`${API_BASE_URL}ingredients/`);
export const createIngredient = (data) => axios.post(`${API_BASE_URL}ingredients/`, data);
export const deleteIngredient = (id) => axios.delete(`${API_BASE_URL}ingredients/${id}`);

// Categories API
export const getCategories = () => axios.get(`${API_BASE_URL}categories/`);
export const createCategory = (data) => axios.post(`${API_BASE_URL}categories/`, data);
export const deleteCategory = (id) => axios.delete(`${API_BASE_URL}categories/${id}`);

// Search Recipes
export const searchRecipes = (query) => axios.get(`${API_BASE_URL}recipes/?search=${query}`);