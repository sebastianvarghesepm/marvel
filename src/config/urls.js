export const API_BASE_URL = 'https://gateway.marvel.com:443/v1';
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint;
export const GET_ALL_CHARACTERS = getApiUrl('/public/characters');
export const GET_ALL_STORIES_BY_ID = getApiUrl('/public/characters/_userId/stories');
export const GET_ALL_EVENTS_BY_ID = getApiUrl('/public/characters/_userId/events');
export const GET_ALL_SERIES_BY_ID = getApiUrl('/public/characters/_userId/series');
export const GET_CHARACTER_PROFILE_DATA_BY_ID = getApiUrl('/public/characters/_userId');
