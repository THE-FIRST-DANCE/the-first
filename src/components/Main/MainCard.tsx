/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
/* --------------------------------------import start-------------------------------------- */
import { useState, useEffect, ReactNode } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { createPortal } from 'react-dom';
import Button from '@components/Button';
import Input from '@components/Input';
import { setAuth } from '@utils/auth';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

/* 📎 service.ts (axios) */
import {
  getHeartsInfo,
  postHeartsInfo,
  deleteHeartsInfo,
  deletePosts,
} from '@services/posts.service';
import { login } from '@services/auth.service';

/* 📎폰트 어썸 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// 색 없는 하트
import {
  faEllipsis,
  faHeart as solidHeart,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
// 유색 하트
import {
  faHeart as regularHeart,
  faComment,
} from '@fortawesome/free-regular-svg-icons';

/* 📎캐러셀 */
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';

/* 📎 인터페이스 : MainCardProps */
import { Post, PostWithUser, HeartsInfo } from '@interfaces/post.interface';

/* 📎 로그인 관리 */
import { useLogonUser } from '@contexts/LogonUser';
import UserAvatar from '@components/common/UserAvatar';
import LogoIcon from '@assets/icons/logo';
import PostModal from '@components/Profile/PostModal';

/* --------------------------------------import end-------------------------------------- */

/* --------------------------------------interaface start-------------------------------------- */
interface MainCardProps {
  post: PostWithUser;
  onlyPost: Post;
  setIsPostDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}
/* --------------------------------------interaface end-------------------------------------- */

/* -------------------------------------MainCard------------------------------------- */
const MainCard = ({ post, setIsPostDeleted }: MainCardProps): JSX.Element => {
  /* 📝 로그인 창 */

  // 1.
  const [errorMsg, setErrorMsg] = useState<string>('');

  // 2.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 3.
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    login({
      email: data['email'],
      password: data['password'],
    })
      .then((data) => {
        setAuth(data);
        window.location.href = '/';
      })
      .catch((e) => {
        setErrorMsg(e.message);
      });
  };

  /*  📝 사용자 게시글 입력 */
  const textContent = post.content;
  const maxLength = 30; // 원하는 글자 수

  /* 📂 1. 게시글 flug */
  const [isTextShown, setIsTextShown] = useState(false);

  /* 📂 2. 하트 flug  */
  const [isHeartShown, setIsHeartShown] = useState(false);

  // 2.1 물리적 하트 변경
  const toggleHeart = () => {
    setIsHeartShown((prev) => !prev);
  };

  // 2.2 하트
  const [heartInfo, setHeartInfo] = useState<HeartsInfo[]>([]);

  // 2.3 하트 수정 함수
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-shadow
  const postHeart = async (heartInfo: { user_id: number; post_id: number }) => {
    const res = await postHeartsInfo(heartInfo);
    return res;
  };

  // 2.4 하트 삭제 함수
  const deleteHeart = async (heartId: number) => {
    const res = await deleteHeartsInfo(heartId);
    return res;
  };

  /* 📂 3. 바운스 flug */
  const [bounce, setBounce] = useState(false);

  /* 📂 4. 현재 로그인 유저 */
  const logonUser = useLogonUser(); /* logonUser.id를 사용해야 함 */

  /* 📂 5. 메인 포스트 삭제 메서드  */
  const deletePost = async (postId: number) => {
    const res = await deletePosts(postId);
    if (res) {
      setIsModalOpen(false);
    }
    return res;
  };
  // 5.1 ... 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 5.1 ... 버튼 누르면 모달 생성
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 5.2 ... 모달 취소
  const closeModal = () => {
    setIsModalOpen(false);
  };

  /* 📂 6. post 삭제 후 리로드 메서드 */
  const reloaPage = () => {
    setIsPostDeleted((prev) => !prev);
  };

  /* 📂 7. 비 로그인 시 모달 생성 */
  const [modalOpen, setModalOpen] = useState(false);
  // 7.1 index.tsx로 potal시키기
  const ModalPortal = ({ children }: { children: ReactNode }) => {
    const target = document.querySelector('.container.start');
    return createPortal(children, target as Element | DocumentFragment);
  };

  const [openedPostModalId, setOpenedPostModalId] = useState<null | number>(
    null
  );

  const openPostModal = (id: number) => {
    setOpenedPostModalId(id);
  };

  const closePostModal = () => {
    setOpenedPostModalId(null);
  };
  //  -----------------------------------------useEffect start----------------------------------

  /* 🖍️ 1. 하트 정보 */
  useEffect(() => {
    const getHeartsInfoFun = async () => {
      const result = await getHeartsInfo();
      setHeartInfo(result);
    };
    getHeartsInfoFun();
  }, [isHeartShown]);

  /* 🖍️ 2. 로그인 모달 생성스 스크롤 방지 */
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // 컴포넌트가 언마운트될 때 기본 스크롤로 돌아가도록
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalOpen]);

  //  -----------------------------------------useEffect end----------------------------------

  return (
    <StyledMainCard>
      {/* 🟢 1. 상단 bar 🟢 */}
      <div className="element-top">
        {/* 1.1 상단 좌측 유저 이미지 */}
        <div className="element-image">
          <Link to={`/u/${post.user.username}`}>
            <UserAvatar
              username={post.user.username}
              src={post.user?.avatar}
              size={80}
            />
          </Link>
        </div>

        {/* 1.2 상단 좌측 아이디 */}
        <div className="element-account">
          <span className="userId">
            {post.user.name} {/* 🟡 사용자 아이디 입력 🟡 */}
            {/* 1.2.1 파란색 체크 이미지 */}
            <img
              className="element-userImg"
              alt="Element userImg"
              src="/main_imgs/blue_check.png"
              style={{ width: '30px', height: '30px', marginLeft: '10px' }}
            />
          </span>
        </div>

        {/* 1.3 우측 상단 ・・・ 아이콘 */}
        <FontAwesomeIcon
          className="faEllipsis"
          icon={faEllipsis}
          style={{ color: '#000000' }}
          onClick={() => {
            // 로그인 상태
            if (logonUser) {
              openModal();
              // 비로그인 상태
            } else {
              setModalOpen((prev) => !prev);
            }
          }}
        />

        {/* 1.4 삭제 취소 모달 */}
        {isModalOpen && (
          <div
            className="frameWrap"
            style={{ position: 'absolute', right: '0px' }}
          >
            {/* 삭제 취소 전체 모달 컴포넌트 */}
            <Frame>
              <div className="DivWrapper">
                {/* 1.4.1 삭제 버튼 */}
                <button
                  className="TextWrapper"
                  onClick={() => {
                    deletePost(post.id);
                    reloaPage();
                  }}
                >
                  삭제
                </button>
              </div>
              <div className="Div" />
              <div className="DivWrapper2">
                {/* 1.4.2 취소 버튼 */}
                <button className="TextWrapper2" onClick={closeModal}>
                  취소
                </button>
              </div>
            </Frame>
          </div>
        )}
      </div>

      {/* 🟢 2. 메인 이미지 🟢 */}
      <div className="mainImg_container">
        {/* 2.1 캐러셀 */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <StyledSlider {...settings}>
          {post.photos.map((photo) => (
            <div key={post.id} className="mainImg_box">
              <img
                className="element-userImg"
                alt="Element userImg"
                src={photo}
              />
            </div>
          ))}
        </StyledSlider>
      </div>

      {/* 🟢 3. 좋아요  + 게시글 모달 🟢 */}
      <div className="element-wrap-image">
        {/* 3.1 좋아요  */}
        {heartInfo.find((heart) => {
          //   로그인한 유저 = 좋아요한 유저    +    현재 포스트 id = 좋아요에 등록된 포스트 id
          return logonUser?.id === heart.user_id && post.id === heart.post_id;
        }) ? (
          /* 3.1.1 ❤️ */
          <FontAwesomeIcon
            key={post.id}
            bounce={bounce}
            className="solidHeart"
            icon={solidHeart}
            onClick={() => {
              toggleHeart();
              // 좋아요 누르기 취소
              const heartToDelete = heartInfo.find(
                (heart) =>
                  logonUser?.id === heart.user_id && post.id === heart.post_id
              );
              if (heartToDelete) {
                deleteHeart(heartToDelete.id);
              }
            }}
          />
        ) : (
          /* 3.1.2 ♡ */
          <StyledSolidHeart
            key={post.id}
            className="regularHeart"
            icon={regularHeart}
            onClick={() => {
              //  로그인 한 상태라면
              if (logonUser) {
                toggleHeart();
                setBounce(true);
                setTimeout(() => setBounce(false), 1000);
                postHeart({ user_id: logonUser?.id, post_id: post.id });
                // 로그인 하지 않은 상태라면?
              } else {
                setModalOpen((prev) => !prev);
              }
            }}
          />
        )}

        {/* 3.2  🔍 */}
        <FontAwesomeIcon
          className="comment"
          icon={faComment}
          flip="horizontal"
          onClick={() => {
            if (logonUser) {
              {
                openPostModal(post.id);
              }
            } else {
              setModalOpen((prev) => !prev);
            }
          }}
        />
        {openedPostModalId && (
          <PostModal post={post} onClose={closePostModal} />
        )}
      </div>

      {/* 🟢 4. 아이디 + 게시글 작성 내용 🟢 */}
      <div className="element-content">
        {/* 4.1 사용자 아이디 */}
        {/* 🟡 사용자 아이디 입력 🟡 */}
        <span className="userId">
          {/* cheiru94 */}
          {post.user.username}
        </span>

        {/* 4.2 게시글 내용 */}
        <span className="element-contents">
          {/* 30글자 이상일 시 더보기 or 닫기 toggle */}
          {/* eslint-disable-next-line no-nested-ternary */}
          {textContent.length > maxLength
            ? isTextShown
              ? textContent
              : `${textContent.substring(0, maxLength)}...`
            : textContent}
          {textContent.length > maxLength && (
            <button type="button" onClick={() => setIsTextShown(!isTextShown)}>
              {isTextShown ? '접기' : '더보기'}
            </button>
          )}
        </span>
      </div>

      {/* 🟢 5. 댓글 달기  🟢 */}
      <div className="element-comment">
        <div className="element">
          <textarea className="text-wrapper" placeholder="댓글 달기..." />
        </div>
        <button
          type="button"
          className="element-upload"
          // FIXME: 코맨트 추가
        >
          게시
        </button>
      </div>

      {/* 🟢 6.로그인 화면 전체 모달 🟢 */}
      {modalOpen && (
        <ModalPortal>
          <Modal>
            <div className="modal_content">
              <Body>
                {/* 6.1 우측 상단 취소 버튼 */}
                <FontAwesomeIcon
                  onClick={() => {
                    if (modalOpen) {
                      setModalOpen(false);
                    }
                  }}
                  icon={faXmark}
                  style={{
                    color: '#6d6d6f',
                    width: '35px',
                    height: '35px',
                    position: 'absolute',
                    right: '-30px',
                    cursor: 'pointer',
                  }}
                />

                {/* 6.2 상단 중앙 the first dance 로고 */}
                <Header>
                  <LogoIcon width={300} height={150} />
                </Header>

                {/* 6.3 아이디, 비밀번호 입력 form */}
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    id="email"
                    type="email"
                    label="이메일"
                    placeholder="이메일"
                    register={register}
                    required
                    errors={errors}
                  />
                  <Input
                    id="password"
                    type="password"
                    label="비밀번호"
                    placeholder="비밀번호"
                    register={register}
                    required
                    errors={errors}
                    minLength={6}
                  />

                  {/* 6.4 에러 처리용 */}
                  <div
                    style={{
                      height: '1rem',
                      padding: '0.5rem',
                      color: 'red',
                    }}
                  >
                    {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
                  </div>

                  <Button label="로그인" />
                </Form>
              </Body>

              {/* 6.5 중앙 하단, 계정 생성 */}
              <Bottom>
                <BottomText>
                  계정이 없으신가요? <Link to="/register">가입하기</Link>
                </BottomText>
              </Bottom>
            </div>
          </Modal>
        </ModalPortal>
      )}
    </StyledMainCard>
  );
};
/* ------------------------------------- MainCard end ------------------------------------- */
const Body = styled.div`
  border-radius: 2px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Header = styled.div`
  text-align: center;
  margin-top: 36px;
  margin-bottom: 12px;
  font-size: 28px;
  font-weight: 700;
  line-height: 32px;
  font-style: italic;
`;

const Form = styled.form`
  width: 350px;
  margin: 0 2.5rem;
`;

const Bottom = styled.div`
  margin-top: 1rem;
  padding: 1rem;

  border-radius: 2px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

const BottomText = styled.div`
  line-height: 32px;

  a {
    margin-left: 0.25rem;
    color: #0095f6;
    font-weight: 600;
  }
`;

const ErrorMsg = styled.span`
  color: red;

  animation: warningShake 0.82s ease-in-out;
`;

/* ------------------------------------- 💅 Styled Component start ------------------------------------- */
//  바운스 키프레임
const bounceAnimation = keyframes`
  0%, 100% {
    transform: scale(1.0);
  }
  50% {
    transform: scale(1.1);
  }
`;

// FontAwesomeIcon에 바운스 적용
const StyledSolidHeart = styled(FontAwesomeIcon)`
  animation: ${(props) =>
    props.bounce
      ? css`
          ${bounceAnimation} 1s infinite
        `
      : 'none'};
  &:hover {
    color: #5b5b5b;
  }
`;

/* ... 버튼  */
const Frame = styled.div`
  align-items: flex-start;
  background-color: #dadada;
  display: inline-flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  position: relative;

  .div-wrapper {
    align-items: center;
    display: flex;
    gap: 10px;
    height: 36px;
    justify-content: center;
    padding: 10px 0px;
    position: relative;
    width: 220px;

    .text-wrapper {
      color: #000000;
      font-family: 'Inter-Regular', Helvetica;
      font-size: 30px;
      font-weight: 400;
      height: 35px;
      letter-spacing: 0;
      line-height: normal;
      margin-bottom: -8.5px;
      margin-top: -10.5px;
      position: relative;
      text-align: center;
      white-space: nowrap;
      width: 190px;
    }
  }

  .div {
    background-color: #ffffff;
    height: 1px;
    position: relative;
  }

  .div-wrapper-2 {
    align-items: center;
    display: flex;
    gap: 10px;
    height: 33px;
    justify-content: center;
    padding: 10px 0px;
    position: relative;
    width: 220px;

    .text-wrapper-2 {
      color: #000000;
      font-family: 'Inter-Regular', Helvetica;
      font-size: 30px;
      font-weight: 400;
      height: 35px;
      letter-spacing: 0;
      line-height: normal;
      margin-bottom: -10px;
      margin-top: -12px;
      position: relative;
      text-align: center;
      white-space: nowrap;
      width: 190px;
    }
  }
`;

/* 로그인 모달 */
const Modal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  & .modal_content {
    background-color: #fff;
    padding: 20px 50px;
    border-radius: 10px;
  }
`;

/* 전체 Main */
const StyledMainCard = styled.div`
  transition: backdrop-filter 0.2s ease-in-out;
  margin-top: 30px;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 1px;
  position: relative;
  height: auto;
  width: 550px;
  box-sizing: content-box;
  margin-bottom: 100px;

  /* 🟢 1 Top. top 전체 감싸는 div  */
  & .element-top {
    align-items: center;
    align-self: stretch;
    border-radius: 5.56px;
    display: flex;
    height: 100px;
    /* justify-content: center; */
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  /* 🟢 1.1 Top. 좌측 상단 이미지 틀 */
  & .element-image {
    height: 80px;
    width: 80px;
    position: relative;
    overflow: hidden;
    margin-right: 2px;
    border-radius: 50%;
    cursor: pointer;
  }
  /* 1.1.1 Top. 좌측 상단 이미지 */
  & .element-userImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* 🟢 1.2 Top. 아이디 wrap div */
  & .element-account {
    flex-direction: column;
    padding: 9.27px 9.27px 9.27px 10.01px;
    position: relative;
    width: 77%;
  }

  /* 1.2.1 Top. 아이디 입력 상자  */
  & .userId {
    font-size: 25px;
    font-weight: 600;
    margin-right: 30px;
  }

  /* 1.3 Top. 우측 상단 ・・・ 아이콘 */
  & .element-threeDot {
    height: 40px;
    position: relative;
    width: 40px;
    margin-right: 5px;
    cursor: pointer;
  }

  & .faEllipsis {
    height: 40px;
    position: relative;
    width: 40px;
    margin-right: 5px;
    cursor: pointer;
  }

  /* 🟢🟢🟢🟢🟢🟢 2 Main. 메인 이미지 🟢🟢🟢🟢🟢🟢*/
  & .mainImg_container {
    width: 100%;
    height: 500px;
    margin-bottom: 10px;
    background-color: white;
  }

  & .mainImg_box {
    display: flex; // 추가
    align-items: center; // 추가
  }

  & .mainImg_box img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 5px;
  }

  & .element-wrap-image {
    display: flex;
    margin-bottom: 10px;
  }

  /* 하트 아이콘 */
  & .solidHeart {
    color: #ff0000;
    height: 40px;
    width: 40px;
    cursor: pointer;
  }
  /* 빈하트 아이콘 */
  & .regularHeart {
    height: 40px;
    width: 40px;
    cursor: pointer;
  }
  /* 코멘트 아이콘 */
  & .comment {
    height: 40px;
    width: 40px;
    margin-left: 30px;
    cursor: pointer;
    &:hover {
      color: #5b5b5b;
    }
  }

  /*  아이디 + 작성 내용 ...* */
  & .element-content {
    align-items: start;
    margin-bottom: 20px;
    border-radius: 4.63px;
    display: block;

    position: relative;
    width: 100%;
    float: left;
    width: 100%;
    line-height: 1.5;
  }

  /* 사용자가 올린 글 */
  & .element-contents {
    /* position: relative; */
    font-size: 24px;
    width: 470px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }

  & .element-comment {
    align-items: center;
    align-self: stretch;
    justify-content: start;
    /* background-color: orange; */
    display: flex;
    gap: 5.72px;
    height: 59px;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  /* 댓글달기 .... */
  & .element {
    align-items: center;
    background-color: #ffffff;
    display: flex;
    gap: 12.52px;
    /* height: 100%; */
    margin-bottom: -3px;
    margin-top: -3px;
    /* padding: 12.52px; */
    position: relative;
    width: 100%;
  }

  & .element textarea.text-wrapper {
    border: none;
    border-bottom: 1px solid black;
    color: #000000;
    font-family: 'Inter-Regular', Helvetica;
    font-size: 23px;
    font-weight: 400;
    letter-spacing: 0;
    position: relative;
    overflow: auto;
    width: 100%;
    height: 50%;
    resize: none;
  }
  & textarea:focus {
    outline: none;
  }

  & .element-upload {
    color: #0500ff;
    font-family: 'Inter-Bold', Helvetica;
    font-size: 25px;
    font-weight: 700;
    letter-spacing: 0;
    line-height: normal;
    position: relative;
    text-align: center;
    width: 67.58px;
  }

  & .frame {
    flex: 0 0 auto;
    margin-right: -0.53px;
    position: relative;
  }
`;

/* 🟡 캐러셀 스타일링 始🟡 */
const settings: Settings = {
  infinite: true, // 무한 롤링
  speed: 500, // 애니메이션 속도
  slidesToShow: 1, // 한 번에 슬라이드 되는 이미지 개수
  slidesToScroll: 1, // 스크롤시 이동하는 이미지 개수
  arrows: true,
  dots: true,
};

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
`; /* 🟡 캐러셀 스타일링 終🟡 */
/* ------------------------------------- 💅 Styled Component end ------------------------------------- */

export default MainCard;
