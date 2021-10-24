import React, {
  useState, useContext, useEffect,
} from 'react';
import { toast } from 'react-toastify';
import DropPanel from '../../components/Gallery/DropPanel';
import PhotoGrid from '../../components/Gallery/PhotoGrid';
import Layout from '../Layout';
import {
  saveAlbum,
  updateAlbum,
} from '../../services';
import { UserContext } from '../../context/userContext';

import './styles.scss';
import { swapArrayItems } from '../../utils';
import { getFilteredGallery } from '../../helpers/serviceHelper';

function Gallery() {
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [albumId, setAlbumId] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const { userId } = useContext(UserContext);

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      const { err, photos: galleryPhotos, album } = await getFilteredGallery(userId);
      setLoading(false);
      if (err) {
        setPhotos([]);
        setSelectedPhotos([]);
        return;
      }
      setPhotos(galleryPhotos);
      if (!album) {
        setSelectedPhotos([]);
      } else {
        const { photos: albumPhotos, _id } = album;
        setSelectedPhotos(albumPhotos);
        setAlbumId(_id);
        setIsUpdate(true);
      }
    };
    getPhotos();
  }, []);

  useEffect(() => {
    if (selectedPhotos.length === 9) {
      setIsSaveDisabled(false);
    }
  }, [JSON.stringify(selectedPhotos)]);

  const dragStart = (e) => {
    const { target } = e;
    e.dataTransfer.setData('data-id', target.id);
  };
  const findIndexById = (array, itemId) => array.findIndex(
    (element) => element.id.toString() === itemId,
  );
  const drop = (e) => {
    e.preventDefault();
    try {
      const dragId = e.dataTransfer.getData('data-id');
      const { id: dropId } = e.target;
      const draggedGalleryItem = photos.find(
        (photo) => photo.id.toString() === dragId,
      );

      if (selectedPhotos.length === 9) {
        const dragIndex = findIndexById(selectedPhotos, dragId);
        const targetIndex = findIndexById(selectedPhotos, dropId);
        // drag and drop from gallery to fully filled drop panel
        if (draggedGalleryItem && dragIndex < 0) {
          const { picture, id: draggedGalleryItemId } = draggedGalleryItem;
          const selectedPhotosClone = [...selectedPhotos];
          selectedPhotosClone[targetIndex] = {
            url: picture,
            id: draggedGalleryItemId,
            sequence: selectedPhotos.length,
          };
          const removedPhoto = selectedPhotos.find(
            (photo) => photo.id.toString() === dropId,
          );
          const changedGallery = photos.filter(
            (photo) => photo.id.toString() !== dragId.toString(),
          );
          changedGallery.push({ picture: removedPhoto.url, id: removedPhoto.id });
          setPhotos(changedGallery);
          setSelectedPhotos(selectedPhotosClone);
          return;
        }
        // drag and drop within the fully filled drop panel
        const swappedList = swapArrayItems(selectedPhotos, dragIndex, targetIndex);
        setSelectedPhotos(swappedList);
      } else if (draggedGalleryItem && selectedPhotos.length < 9) {
        const { picture, id: draggedGalleryItemId } = draggedGalleryItem;
        const changedGallery = photos.filter(
          (photo) => photo.id.toString() !== dragId.toString(),
        );
        setSelectedPhotos([
          ...selectedPhotos,
          {
            url: picture,
            id: draggedGalleryItemId,
            sequence: selectedPhotos.length,
          },
        ]);
        setPhotos(changedGallery);
      }
    } catch (error) {
      toast.error('Failed to drag and drop!');
    }
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const saveSelectedPhotos = async () => {
    setIsSaveDisabled(true);
    const resp = await saveAlbum(userId, selectedPhotos);
    if (resp.err) {
      toast.error('Failed to save selection!');
      return;
    }
    setIsUpdate(true);
    toast.success('Saved selection!');
  };

  const updateSelectedPhotos = async () => {
    setIsSaveDisabled(true);
    const resp = await updateAlbum(
      userId,
      selectedPhotos,
      albumId,
    );
    if (resp.err) {
      toast.error('Failed to update selection!');
      return;
    }
    toast.success('Updated selection!');
  };

  return (
    <Layout>
      <div className="gallery-container">
        <aside>
          <DropPanel
            drop={drop}
            dragOver={dragOver}
            dragStart={dragStart}
            saveSelectedPhotos={saveSelectedPhotos}
            selectedPhotos={selectedPhotos}
            isUpdate={isUpdate}
            isSaveDisabled={isSaveDisabled}
            updateSelectedPhotos={updateSelectedPhotos} />
        </aside>
        <main>
          <PhotoGrid
            dragStart={dragStart}
            loading={loading}
            photos={photos} />
        </main>
      </div>
    </Layout>
  );
}

export default Gallery;
