import { baseAxios } from '@axios';
import { User } from '@interfaces/user.interface';
import { registerPhoto } from '@services/posts.service';
import { useState } from 'react';
import ReactModal from 'react-modal';
import { SyncLoader } from 'react-spinners';
import styled from 'styled-components';

interface StoryModalProps {
  isOpen: boolean;
  handler: () => void;
  user: User | null;
  edit?: boolean;
  contentId?: number;
  storyId?: number;
}

const custonStyles: ReactModal.Styles = {
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
};

const StoryModal = ({
  isOpen,
  handler,
  user,
  edit,
  contentId,
  storyId,
}: StoryModalProps) => {
  const [currentContent, setCurrentContent] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const imageClickHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        setImage(file);
        setCurrentContent(1);
      }
    };
  };

  const postStory = async () => {
    let imageUrl = null;
    if (image) {
      setIsLoading(true);
      imageUrl = await registerPhoto(image);
    }

    if (edit) {
      const { data } = await baseAxios.get(`/story/${storyId}`);
      const editContent = data.content[contentId! - 1];

      editContent.content = text;
      editContent.img = imageUrl;
      data.content[contentId! - 1] = editContent;
      await baseAxios.put(`/story/${storyId}`, data);

      setIsLoading(false);
      handler();
      return;
    }

    // story에 같은 userId 가 있는지 확인
    const { data } = await baseAxios.get('/story');

    const isStory = data.find(
      (item: { userId: number }) => item.userId === user?.id
    );

    const newContentId = isStory ? isStory.content.length + 1 : 1;

    const newContent = {
      content: text,
      img: imageUrl,
      id: newContentId,
    };

    const newData = {
      userId: user?.id,
      name: user?.username,
      img: user?.avatar,
      content: [newContent],
    };

    if (isStory) {
      setIsLoading(true);
      isStory.content.push(newContent);
      await baseAxios.put(`/story/${isStory.id}`, isStory);
      setIsLoading(false);
      handler();
    } else {
      setIsLoading(true);
      await baseAxios.post('/story', newData);
      setIsLoading(false);
      handler();
    }
  };

  const moveContent = () => {
    if (currentContent === 0) {
      setCurrentContent(1);
    } else {
      setCurrentContent(0);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={() => handler()}
      style={custonStyles}
    >
      <Container>
        <Header>{currentContent === 0 ? '사진 선택' : '글쓰기'}</Header>
        <ContentContainer>
          <Content>
            {currentContent === 0 ? (
              <ModalInput onClick={imageClickHandler}>+</ModalInput>
            ) : (
              <WirterContainer>
                {image && <Image src={URL.createObjectURL(image)} />}
                <TextContainer>
                  <Writer
                    value={text}
                    placeholder="내용을 입력하세요"
                    onChange={(e) => setText(e.target.value)}
                  />
                </TextContainer>
              </WirterContainer>
            )}
            {isLoading && (
              <SyncLoader
                color="#36d7b7"
                loading={isLoading}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            )}
          </Content>
        </ContentContainer>

        <Footer>
          <button type="button" onClick={() => handler()}>
            닫기
          </button>
          <button type="button" onClick={moveContent}>
            {currentContent === 0 ? '다음' : '이전'}
          </button>
          <button type="button" onClick={postStory}>
            {currentContent === 1 ? '완료' : null}
          </button>
        </Footer>
      </Container>
    </ReactModal>
  );
};

export default StoryModal;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalInput = styled.div`
  font-size: 3rem;
  cursor: pointer;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 1rem;
  justify-content: center;
  align-items: center;
`;

const WirterContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
`;

const TextContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid #fff;
`;

const Writer = styled.textarea`
  position: absolute;
  width: 70%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: transparent;
  box-sizing: border-box;
  border: none;
  resize: none;
  outline: none;
  color: #fff;
  text-align: center;

  &::placeholder {
    color: #fff;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 16px;
`;
