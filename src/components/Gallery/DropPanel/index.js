import React from 'react';
import Button from '../../Common/Button';
import PhotoCard from '../../Common/PhotoCard';

import './styles.scss';

function DropPanel(props) {
  const {
    drop,
    dragOver,
    dragStart,
    saveSelectedPhotos,
    selectedPhotos,
    isUpdate,
    updateSelectedPhotos,
    isSaveDisabled,
  } = props;

  return (
    <>
      <div className="drop-panel">
        <div
          className="drop-item-wrapper"
          onDrop={drop}
          onDragOver={dragOver}
          id="drop-item-wrapper">
          {selectedPhotos.map(
            ({ id, url }, index) => id && (
            <PhotoCard
              draggable
              key={id}
              id={id}
              source={url}
              alt={index}
              width="80%"
              height="80%"
              dragStart={dragStart} />
            ),
          )}
        </div>
        <div className="button-container">
          {isUpdate ? (
            <Button disabled={isSaveDisabled} onClick={updateSelectedPhotos}>
              <span>Update</span>
            </Button>
          ) : (
            <Button disabled={isSaveDisabled} onClick={saveSelectedPhotos}>
              <span>Save</span>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default DropPanel;
