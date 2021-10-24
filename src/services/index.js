/* eslint-disable no-console */
import axios from 'axios';
import { PHOTOS_URL, SERVICE_URL } from '../constants';

export const fetchPhotos = async () => {
  try {
    const response = await axios.get(PHOTOS_URL);
    if (response && response.status === 200) {
      return { err: false, data: response?.data?.entries };
    }
    return { err: true, success: false };
  } catch (err) {
    console.log('[Error] Fetch photos failed:', err);
    return { err: true, success: false };
  }
};

export const saveAlbum = async (userId, photos) => {
  try {
    const response = await axios.post(`${SERVICE_URL}/albums`, { userId, photos });
    console.log('res', response);
    if (response && response.status === 201) {
      return { err: false, success: true, data: response?.data?.data };
    }
    return { err: true, success: false };
  } catch (err) {
    console.log('[Error] Save photos failed:', err);
    return { err: true, success: false };
  }
};

export const updateAlbum = async (userId, photos, id) => {
  try {
    const response = await axios.put(`${SERVICE_URL}/albums/${id}`, {
      userId,
      photos,
    });
    if (response && response.status === 200) {
      return { err: false, success: true, data: response?.data?.data };
    }
    return { err: true, success: false };
  } catch (err) {
    console.log('[Error] Update photos failed:', err);
    return { err: true, success: false };
  }
};

export const fetchAlbum = async (userId) => {
  try {
    const response = await axios.get(`${SERVICE_URL}/albums?userId=${userId}`);
    if (response && response.data) {
      return { err: false, data: response?.data?.data };
    }
    return { err: true, success: false };
  } catch (err) {
    console.log('[Error] Fetch photos failed:', err);
    return { err: true, success: false };
  }
};
