import styled from 'styled-components';
import { Mousewheel, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { StoryContentType } from '@interfaces/story.interface';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState } from 'react';
import StoryModal from '@components/Main/StoryModal';
import { useLogonUser } from '@contexts/LogonUser';
import { useNavigate, useParams } from 'react-router-dom';
import { baseAxios } from '@axios';

interface SwiperBoxProps {
  data: StoryContentType[];
  dataChange: () => void;
  storyUser: number;
}

function SwiperBox({ data, dataChange, storyUser }: SwiperBoxProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentContent, setCurrentContent] = useState<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const logonUser = useLogonUser();

  const handler = () => {
    setIsOpen(false);
    dataChange();
  };

  const editHandler = (editId: number) => {
    setCurrentContent(editId);
    setIsOpen(true);
  };

  const deleteHandler = async (deleteId: number) => {
    const deleteContent = data.filter((item) => item.id !== deleteId);
    const prevData = await baseAxios.get(`/story/${Number(id) + 1}`);
    const deleteData = {
      ...prevData.data,
      content: deleteContent,
    };

    if (deleteContent.length === 0) {
      baseAxios.delete(`/story/${Number(id) + 1}`);
      dataChange();
      navigate('/');
      return;
    }

    baseAxios.put(`/story/${Number(id) + 1}`, deleteData);
    dataChange();
  };

  return (
    <SwiperContainer
      modules={[Mousewheel, Navigation]}
      mousewheel
      allowTouchMove={false}
      navigation
    >
      {data?.map((item) => (
        <Slide key={item.id}>
          {logonUser?.id === storyUser && (
            <Header>
              <HeaderContainer>
                <HeaderButton
                  onClick={() => {
                    editHandler(item.id);
                  }}
                >
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-4/32/edit-1024.png"
                    alt=""
                  />
                </HeaderButton>
                <HeaderButton
                  onClick={() => {
                    deleteHandler(item.id);
                  }}
                >
                  <img
                    src="https://cdn3.iconfinder.com/data/icons/user-interface-169/32/trash-1024.png"
                    alt=""
                  />
                </HeaderButton>
              </HeaderContainer>
            </Header>
          )}

          <Text readOnly value={item.content} />
          {item.img && <img src={item.img} alt="" />}
        </Slide>
      ))}

      {isOpen && (
        <StoryModal
          isOpen={isOpen}
          handler={handler}
          user={logonUser}
          edit
          contentId={currentContent}
          storyId={Number(id) + 1}
        />
      )}
    </SwiperContainer>
  );
}

export default SwiperBox;

const SwiperContainer = styled(Swiper)`
  width: 100%;
  height: 100%;
  border-radius: 4vmin;
  overflow: hidden;
`;

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  color: #000;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
`;

const HeaderButton = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Slide = styled(SwiperSlide)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 600;
  color: #000;
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Text = styled.textarea`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
  resize: none;
  border: none;
  outline: none;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
  line-height: 1.5;
  min-width: 100%;
  min-height: 100%;
  margin-top: 3rem;
`;
