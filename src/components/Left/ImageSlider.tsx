import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';

interface ImageSliderProps {
  images: File[];
  deleteHandler: (index: number) => void;
}

const ImageSlider = (props: ImageSliderProps) => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Container>
      <StyledSlider {...settings}>
        {props.images.map((image, i) => (
          <div key={i}>
            <div style={{ position: 'relative' }}>
              <Image src={URL.createObjectURL(image)}></Image>
              <DeleteButton onClick={() => props.deleteHandler(i)}>
                x
              </DeleteButton>
            </div>
          </div>
        ))}
      </StyledSlider>
    </Container>
  );
};

export default ImageSlider;

const StyledSlider = styled(Slider)`
  & .slick-dots {
    display: flex !important;
    justify-content: center;
    align-items: center;
    bottom: 24px;
    width: 100%;
    position: absolute;
  }

  & .slick-dots li {
    width: 1px;
    height: 1px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid rgba(255, 255, 255, 0.7);
  }

  & .slick-dots li button {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .slick-dots li button:before {
    display: block;
    position: initial;
  }

  & .slick-prev {
    left: 8px;

    &::before {
      color: gray;
    }
  }

  & .slick-next {
    right: 8px;

    &::before {
      color: gray;
    }
  }

  & .slick-prev,
  .slick-next {
    z-index: 1;
    opacity: 0.2;
    transition: opacity 0.2s ease-in-out;
  }

  &:hover {
    .slick-prev,
    .slick-next {
      opacity: 1;
    }
  }
`;

const Container = styled.div`
  max-width: 380px;
  width: 360px;
  height: 360px;
`;

const Image = styled.img`
  width: 360px;
  height: 360px;

  object-fit: contain;
  border-radius: 12px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 3px 16px 16px 3px;
`;
