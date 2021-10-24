import React, {
  useContext, useEffect, useState,
} from 'react';

import { fetchAlbum } from '../../../services';
import { UserContext } from '../../../context/userContext';
import PhotoCard from '../../Common/PhotoCard';

import './styles.scss';
import Loader from '../../Common/Loader';

function AlbumGrid() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const { userId } = useContext(UserContext);

  useEffect(async () => {
    setLoading(true);
    const { err, data } = await fetchAlbum(userId);
    setLoading(false);
    if (err || !data) {
      setPhotos([]);
      return;
    }
    setPhotos(data.photos);
  }, []);

  const renderAlbumView = (photos) => {
    if (photos.length > 0) {
      return (
        <div className="album-grid-container">
          <div className="album-grid-item-container">
            {photos.map((photo) => (
              <div key={photo.id} className="image-container">
                <PhotoCard id={photo.id} source={photo.url} width="100%" height="100%" alt="albums" />
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="album-empty-container">
        <h2>There are no created albums</h2>
      </div>
    );
  };

  return (
    <>
      {loading ? <Loader /> : renderAlbumView(photos)}
    </>
  );
}

export default AlbumGrid;
