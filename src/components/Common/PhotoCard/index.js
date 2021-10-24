import React from 'react';
import { DEFAULT_IMAGE_HEIGHT_IN_PX, DEFAULT_IMAGE_WIDTH_IN_PX } from '../../../constants';
import './styles.scss';

function PhotoCard(props) {
  const {
    id, alt, source, width, height, dragStart, draggable,
  } = props;

  const getFormattedSource = (src) => {
    const url = new URL(src);
    return `${url.origin}/${DEFAULT_IMAGE_WIDTH_IN_PX}/${DEFAULT_IMAGE_HEIGHT_IN_PX}/any?id=${id}`;
  };

  return (
    <img
      id={id}
      alt={alt}
      src={getFormattedSource(source)}
      width={width}
      height={height}
      className={draggable ? 'photo-card drag' : 'photo-card'}
      data-id={`photo-card-${id}`}
      onDragStart={dragStart} />
  );
}

PhotoCard.defaultProps = {
  alt: '',
  width: '50%',
  height: '50%',
};

export default PhotoCard;
