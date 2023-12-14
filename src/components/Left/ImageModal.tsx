import { ImageListType } from '@interfaces/story.interface';
import { useState } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

interface ImageModalProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  image: ImageListType[];
  handler: {
    addUrl: (url: string) => void;
  };
  flowHandler: {
    next: () => void;
    prev: () => void;
  };
}

const ImageModal = ({
  isOpen,
  onClose,
  image,
  handler,
  flowHandler,
}: ImageModalProps) => {
  const [selectedImage, setSelectedImage] = useState<ImageListType[]>([]);

  const imageSelectHandler = (item: ImageListType) => {
    const isSelected = selectedImage.some(
      (selected) => selected.link === item.link
    );

    if (isSelected) {
      const updatedSelection = selectedImage.filter(
        (selected) => selected.link !== item.link
      );
      setSelectedImage(updatedSelection);
    } else {
      setSelectedImage([...selectedImage, item]);
    }
  };

  const imageSelectConfirmHandler = () => {
    selectedImage.forEach((item) => {
      handler.addUrl(item.link);
    });
    setSelectedImage([]);
    onClose(false);
    flowHandler.next();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => onClose(false)}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 100,
        },
        content: {
          width: '500px',
          height: '500px',
          zIndex: '150',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '10px',
          boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
          backgroundColor: '#fff',
          overflow: 'auto',
        },
      }}
    >
      <ModalContent>
        <ModalImageWrapper>
          {image?.map((item) => (
            <ModalImage
              $isSelected={selectedImage.some(
                (selected) => selected.link === item.link
              )}
              key={item.link}
              onClick={() => imageSelectHandler(item)}
            >
              <img src={item.link} alt="" />
            </ModalImage>
          ))}
          <ModalButton onClick={imageSelectConfirmHandler}>확인</ModalButton>
        </ModalImageWrapper>
      </ModalContent>
    </ReactModal>
  );
};

export default ImageModal;

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const ModalImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ModalImage = styled.div<{ $isSelected: boolean }>`
  width: 200px;
  height: 200px;
  margin: 10px;
  z-index: 1;
  box-sizing: border-box;

  ${({ $isSelected }) =>
    $isSelected &&
    `
    border: 3px solid #1890ff;
  `}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ModalButton = styled.button`
  width: 100px;
  height: 40px;
  background-color: #1890ff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: #fff;
  border: none;
  cursor: pointer;
  outline: none;
`;
