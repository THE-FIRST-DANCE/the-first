import { useLogonUser } from '@contexts/LogonUser';
import { Post, PostWithUser } from '@interfaces/post.interface';
import { deletePosts, getPostUser, patchPost } from '@services/posts.service';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Slider, { Settings } from 'react-slick';
import { useNavigate } from 'react-router-dom';

type ModalProps = {
  post: Post;
  onClose: () => void;
};

const PostModal = ({ post, onClose }: ModalProps) => {
  useEffect(() => {
    console.log(post);
  }, []);

  const navigate = useNavigate();

  const [current, setCurrent] = useState<PostWithUser>();

  const closeModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose();
  };

  /* 게시글 삭제 드롭다운 */
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOpenDropdown = () => {
    isDropdownOpen ? setIsDropdownOpen(false) : setIsDropdownOpen(true);
  };

  useEffect(() => {
    getPostUser(post.id).then((data) => {
      // console.log(data);
      setCurrent(data);
    });
  }, []);

  const logonUser = useLogonUser();

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleEditedContent = {
    input: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditedContent(e.target.value);
      console.log(e.target.value);
    },
  };

  return (
    current && (
      <ModalBackgroundStyle>
        <ButtonStyle onClick={closeModal}>×</ButtonStyle>
        <ModalStyle>
          <PostWrapperStyle>
            <div className="mainImg_container" style={{ height: '650px' }}>
              <StyledSlider {...settings}>
                {post.photos.map((photo) => (
                  <div key={post.id} className="mainImg_box">
                    <img
                      className="element-userImg"
                      alt="Element userImg"
                      src={photo}
                      style={{ height: '650px' }}
                    />
                  </div>
                ))}
              </StyledSlider>
            </div>
            <PostContainerStyle>
              <WriterStyle>
                <p>{current.user.username}</p>
                <DropdownImageStyle
                  src="/public/main_imgs/three_dot.png"
                  onClick={handleOpenDropdown}
                />
                {isDropdownOpen && (
                  <DropdownStyle>
                    <p
                      onClick={() => {
                        setIsEditing(!isEditing);
                      }}
                    >
                      게시글 수정
                    </p>
                    <p
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => {
                        if (logonUser && current.userId === logonUser.id) {
                          if (confirm('정말로 게시글을 삭제하시겠습니까?')) {
                            deletePosts(post.id);
                            alert('삭제되었습니다.');
                            navigate(
                              `/redirect?dest=/u/${current.user.username}`
                            );
                          }
                        } else {
                          alert('삭제 권한이 없습니다.');
                        }
                      }}
                    >
                      게시글 삭제
                    </p>
                  </DropdownStyle>
                )}
              </WriterStyle>
              <HrStyle />
              <ContentStyle>
                <PostStyle>
                  <span style={{ height: '510px' }}>
                    {current.user.username}
                  </span>
                  &nbsp;
                  <textarea
                    style={{ width: '405px', height: '450px' }}
                    readOnly={!isEditing}
                    onChange={handleEditedContent.input}
                    value={editedContent}
                  />
                  {isEditing && (
                    <button
                      style={{
                        width: '100px',
                        height: '50px',
                        position: 'absolute',
                        bottom: '70px',
                        right: 0,
                        color: 'blue',
                        textAlign: 'center',
                      }}
                      onClick={() => {
                        patchPost({
                          id: current.id,
                          content: editedContent,
                        })
                          .then((data) => console.log(data))
                          .catch((e) => console.error(e))
                          .finally(() => {
                            console.log('umm');
                          });
                        alert('수정되었습니다.');
                        navigate(`/redirect?dest=/u/${current.user.username}`);
                      }}
                    >
                      수정
                    </button>
                  )}
                </PostStyle>
              </ContentStyle>
              <HrStyle />
              <PostInfoStyle>
                <p>{new Date(current.updated_at).toLocaleString()}</p>
              </PostInfoStyle>
            </PostContainerStyle>
          </PostWrapperStyle>
        </ModalStyle>
      </ModalBackgroundStyle>
    )
  );
};

const ModalBackgroundStyle = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ButtonStyle = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  right: 0;
  top: 0;
  color: white;
  font-size: 3em;
  cursor: pointer;
  z-index: 2;
`;

const ModalStyle = styled.div`
  background: white;
  border-radius: 5px;
  position: absolute;
  right: 8%;
`;

const DropdownImageStyle = styled.img`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 20px;
  height: 20px;
  margintop: 10px;
  cursor: pointer;
`;
const DropdownStyle = styled.div`
  width: 100px;
  position: absolute;
  right: 2%;
  top: 8%;
  background-color: white;
  border: 1px solid gray;
  border-radius: 5px;
  text-align: center;
  z-index: 1;
`;

const PostWrapperStyle = styled.div`
  width: 1100px;
  height: 650px;
  position: relative;
  display: flex;
`;

const PostContainerStyle = styled.div`
  width: 500px;
  height: 400px;
  line-height: 1.5;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const WriterStyle = styled.div`
  height: 40px;
  padding: 10px;
  display: flex;
  line-height: 2.5;
`;

const HrStyle = styled.hr`
  margin: 0 0 0 0;
  width: 498px;
  position: absolute;
  right: 0;
  opacity: 0.3;
`;

const ContentStyle = styled.div`
  width: 480px;
  height: 500px;
  padding: 10px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PostStyle = styled.div`
  width: 480px;
  display: flex;
  // border: 1px solid black;

  textarea {
    border-right: 0px;
    border-top: 0px;
    boder-left: 0px;
    boder-bottom: 0px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    outline: none;
  }

  textarea:read-only {
    border: none;
  }
`;

const PostInfoStyle = styled.div`
  height: 90px;
  padding: 10px;
`;

const settings: Settings = {
  infinite: true, // 무한 롤링
  speed: 500, // 애니메이션 속도
  slidesToShow: 1, // 한 번에 슬라이드 되는 이미지 개수
  slidesToScroll: 1, // 스크롤시 이동하는 이미지 개수
  arrows: true,
  dots: true,
};

const StyledSlider = styled(Slider)`
  width: 600px;
  height: 650px;

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

export default PostModal;
