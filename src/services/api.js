import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getCharacters = async (page = 1) => {
  try {
    const response = await api.get(`/character?page=${page}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCharacter = async (id) => {
  try {
    const response = await api.get(`/character/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getEpisodes = async (page = 1) => {
  try {
    const response = await api.get(`/episode?page=${page}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getEpisode = async (id) => {
  try {
    const response = await api.get(`/episode/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getLocations = async (page = 1) => {
  try {
    const response = await api.get(`/location?page=${page}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getLocation = async (id) => {
  try {
    const response = await api.get(`/location/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCharacterFromUrl = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getEpisodeFromUrl = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

