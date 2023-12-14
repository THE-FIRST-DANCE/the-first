import { Ref, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PlusIcon from '@assets/icons/plus';
import { ImageListType } from '@interfaces/story.interface';
import { convertURLtoFile } from '@utils/file';
import getImages from '@services/imageSearch.service';
import ImageSlider from './ImageSlider';
import InputArea from './InputArea';
import ImageModal from './ImageModal';
import { tagExtractor } from '@utils/\btagger';
import { createPost } from '@services/posts.service';
import { HrLine, VrLine } from '@components/common/Line';
import React from 'react';
import { useLogonUser } from '@contexts/LogonUser';
import UserAvatar from '@components/common/UserAvatar';

interface CreatePostExtendProps {
  open?: boolean;
  observe?: Ref<HTMLDivElement>;
  closeHandler: () => void;
}

enum PostFlow {
  Photo,
  Form,
  Posting,
}

const useText = (initValue?: string) => {
  const [text, setText] = useState<string>(initValue || '');

  const handler = {
    input: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    clear: () => setText(''),
    add: (text: string) => setText((p) => p + text),
  };

  return [text, handler] as const;
};

const useFlow = (initFlow?: number) => {
  const [flow, setFlow] = useState<PostFlow>(initFlow || PostFlow.Photo);

  const handler = {
    next: () => setFlow((p) => p + 1),
    prev: () => setFlow((p) => p - 1),
    init: () => setFlow(initFlow || PostFlow.Photo),
  };

  return [flow, handler] as const;
};

export const usePhotos = () => {
  const [photos, setPhotos] = useState<File[]>([]);

  const handler = {
    add: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target?.files) return;
      const newPhotos = Array.from(e.target.files);
      setPhotos((p) => [...p, ...newPhotos]);
    },
    clear: () => setPhotos([]),
    remove: (index: number) => {
      setPhotos((p) => p.filter((_, i) => i !== index));
    },
    addUrl: async (url: string) => {
      const newPhoto = await convertURLtoFile(url);
      setPhotos((p) => [...p, newPhoto]);
    },
  };

  return [photos, handler] as const;
};

const CreatePostExtend = (props: CreatePostExtendProps) => {
  const [content, contentHandler] = useText();
  const [flow, flowHandler] = useFlow();
  const [photos, photoHandler] = usePhotos();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [image, setImage] = useState<ImageListType[]>([]);
  const [input, setInput] = useState<string>('');
  const logonUser = useLogonUser();

  useEffect(() => {
    if (photos.length === 0 && flow === PostFlow.Form) flowHandler.prev();
  }, [photos]);

  const getImage = async (query: string) => {
    const data = await getImages(query);
    setImage(data);
  };

  const handler = {
    photo: (e: React.ChangeEvent<HTMLInputElement>) => {
      photoHandler.add(e);
      flowHandler.next();
    },

    post: () => {
      if (!logonUser) return;

      const payload = {
        content,
        photos,
        tags: tagExtractor(content),
        userId: logonUser.id,
        placeId: 1,
      };

      createPost(payload).finally(() => {
        handler.close();
      });

      flowHandler.next();
    },

    close: () => {
      props.closeHandler();
      contentHandler.clear();
      photoHandler.clear();
      flowHandler.init();
    },
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSearch = () => {
    setModalIsOpen(true);
    getImage(input);
  };

  return (
    logonUser && (
      <BackgroundLayer ref={props.observe} $open={props.open}>
        <Container
          variants={containerVariants}
          initial="closed"
          animate={props.open ? 'open' : 'closed'}
          layout="preserve-aspect"
        >
          <Header>
            {flow === PostFlow.Photo && (
              <>
                <div />
                <h3>새 게시물 만들기</h3>
                <div />
              </>
            )}
            {flow === PostFlow.Form && (
              <>
                <button onClick={flowHandler.prev}>{'<'}</button>
                <h3>게시물 만들기</h3>
                <button onClick={handler.post}>공유</button>
              </>
            )}
          </Header>

          <HrLine />
          <Content>
            {flow === PostFlow.Photo && (
              <div
                style={{
                  display: 'flex',
                  width: '360px',
                  height: '360px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <label
                  htmlFor="photos"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    rowGap: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  <PlusIcon width={64} height={64} />
                  <span>컴퓨터에서 선택</span>
                  <input
                    id="photos"
                    type="file"
                    multiple
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      photoHandler.add(e);
                      flowHandler.next();
                    }}
                  />
                  <ImageSearch
                    type="text"
                    placeholder="이미지 검색"
                    value={input}
                    onChange={onInput}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onSearch();
                      }
                    }}
                  />
                  <ImageModal
                    isOpen={modalIsOpen}
                    onClose={setModalIsOpen}
                    image={image}
                    handler={photoHandler}
                    flowHandler={flowHandler}
                  />
                </label>
              </div>
            )}

            {flow === PostFlow.Form && (
              <div style={{ display: 'flex' }}>
                <ImageContainer>
                  <ImageSlider
                    images={photos}
                    deleteHandler={(e) => {
                      photoHandler.remove(e);
                      if (photos.length === 0) flowHandler.prev();
                    }}
                  />
                  <AddPhoto>
                    <label htmlFor="photos">
                      <PlusIcon />
                    </label>
                    <input
                      id="photos"
                      type="file"
                      multiple
                      hidden
                      accept="image/*"
                      onChange={photoHandler.add}
                    />
                  </AddPhoto>
                </ImageContainer>
                <VrLine />
                {/* user input form */}
                <UserInputForm>
                  <Author>
                    <UserAvatar
                      username={logonUser.username}
                      src={logonUser?.avatar}
                      size={32}
                    />
                    {/* <div className="avatar">
                      <img src={logonUser?.avatar} alt="avatar" />
                    </div> */}
                    <span>{logonUser.username}</span>
                  </Author>
                  <div className="content">
                    <InputArea text={content} textHandler={contentHandler} />
                  </div>
                  <HrLine />
                  <div className="placeinput" />
                </UserInputForm>
              </div>
            )}
          </Content>
        </Container>
      </BackgroundLayer>
    )
  );
};

export default CreatePostExtend;

const containerVariants = {
  open: {
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 220,
      damping: 20,
    },
  },
  closed: {
    scale: 0.5,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20,
    },
  },
};
const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin: auto;

  border-radius: 12px;

  @media screen and (max-height: 500px) {
    height: calc(100vh - 40px);
  }

  background-color: ${({ theme }) => theme.lightTheme.bgColor};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
`;

const Content = styled.div`
  display: flex;
`;

const BackgroundLayer = styled.div<{ $open?: boolean }>`
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};

  position: fixed;
  display: flex;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  z-index: 100;

  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
`;

const ImageContainer = styled.div`
  position: relative;
  height: fit-content;
`;

const UserInputForm = styled.div`
  padding: 0.5rem;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.lightTheme.borderColor};

  & > div.avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  & > span {
    font-weight: bold;
  }
`;

const AddPhoto = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.5rem;

  & > label {
    cursor: pointer;
  }
`;

const ImageSearch = styled.input`
  position: absolute;
  bottom: 0.5rem;
  width: 80%;
  height: 2rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: ${({ theme }) => theme.lightTheme.borderColor};
`;
