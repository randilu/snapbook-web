/* eslint-disable no-console */
import { fetchAlbum, fetchPhotos } from '../services';

export const getFilteredGallery = async (userId) => {
  try {
    const [{ err: photosErr, data: photosData }, { err: albumErr, data: albumData }] = await Promise.all([fetchPhotos(), fetchAlbum(userId)]);
    if (photosErr || albumErr) {
      return { err: true };
    }
    if (!albumData) {
      return { err: false, photos: photosData, album: albumData };
    }

    const selectedPhotos = albumData.photos || [];
    const selectedPhotoIds = selectedPhotos.map((photo) => photo.id);
    const filteredPhotos = photosData.filter(({ id }) => !selectedPhotoIds.includes(id));
    return { err: false, photos: filteredPhotos, album: albumData };
  } catch (err) {
    console.log('[Error] Service helper error', err);
    return { err: true };
  }
};
