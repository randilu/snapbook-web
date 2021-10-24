import React from 'react';
import Loader from '../../Common/Loader';
import PhotoCard from '../../Common/PhotoCard';

import './styles.scss';

function PhotoGrid(props) {
  const { dragStart, loading, photos } = props;

  const renderPhotoGrid = (pics) => (
    <>
      <div className="grid-item-container">
        {pics.map(({ id, picture }) => (
          <div
            key={id}
            draggable="true"
            data-id={`photo-card-${id}`}
            onDragStart={dragStart}>
            <PhotoCard
              draggable
              key={id}
              id={id}
              source={picture}
              alt=""
              width="100%"
              height="100%" />
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="photo-grid-wrapper">
      {loading ? <Loader /> : renderPhotoGrid(photos)}
    </div>
  );
}

export default PhotoGrid;
