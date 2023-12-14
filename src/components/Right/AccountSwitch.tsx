import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLogonUser } from '@contexts/LogonUser';
import UserAvatar from '@components/common/UserAvatar';

function AccountSwitch() {
  const logOnUser = useLogonUser();
  const navigate = useNavigate();
  const logonUser = useLogonUser();

  function handleToLogin() {
    navigate('/login');
  }

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Container>
      <Wrap>
        <Box>
          <ImgBox>
            <ImgWrap>
              <ImgFrame>
                {logonUser ? (
                  <ImgLink onClick={() => navigate(`/u/${logonUser.username}`)}>
                    <Img src={logOnUser?.avatar} />
                  </ImgLink>
                ) : (
                  <ImgLink>
                    <UserAvatar username="?" size={44} />
                  </ImgLink>
                )}
              </ImgFrame>
            </ImgWrap>
          </ImgBox>
          <ProfileBox>
            <ProfileWrap>
              {logonUser ? (
                <ProfileFrame>
                  <ProfileName
                    data-id="UserProfile"
                    onClick={() => navigate(`/u/${logonUser.username}`)}
                  >
                    {logOnUser?.username}
                  </ProfileName>
                  <ProfileAim>{logOnUser?.name}</ProfileAim>
                </ProfileFrame>
              ) : (
                <ProfileFrame>
                  <ProfileName>로그인 되어있지 않습니다</ProfileName>
                  <ProfileAim className="comment" onClick={handleToLogin}>
                    로그인 해주세요
                  </ProfileAim>
                </ProfileFrame>
              )}
            </ProfileWrap>
          </ProfileBox>
          <SwitchBox>
            <SwitchWrap>
              <SwitchFrame>
                <SwitchName>
                  {logonUser ? (
                    <Switch onClick={handleToLogin}>전환</Switch>
                  ) : (
                    <></>
                  )}
                </SwitchName>
              </SwitchFrame>
            </SwitchWrap>
          </SwitchBox>
          <BoxContainer>
            {showModal && (
              <ModalBackground onClick={handleCloseModal}>
                <ModalContent onClick={handleModalClick}>
                  <ModalHeader>
                    <CloseButton onClick={handleCloseModal}>
                      <CloseButtonLine />
                      <CloseButtonLine
                        style={{ transform: 'rotate(-45deg)' }}
                      />
                    </CloseButton>
                  </ModalHeader>
                  <ModalBox>
                    <ModalBoxLogo>
                      <ModalLogoImg src="https://lh6.googleusercontent.com/proxy/o78UGPJZFQ8ctYSvxLwy45dyQOYp5bS67ik-1zkZBdhd3Qe_CBBtyLaXxiFz-KdbAY-1wZv0KHTngeg-Vso8bT1rhyurFUmsMw4125xt9w8=s0-d"></ModalLogoImg>
                    </ModalBoxLogo>
                    <ModalBoxForm>
                      <ModalFormWrap>
                        <Form1>
                          <Form1Lavel>
                            <Form1Input />
                            <Form1Span>
                              전화번호, 사용자 이름 또는 이메일
                            </Form1Span>
                          </Form1Lavel>
                        </Form1>
                        <Form2>
                          <Form2Lavel>
                            <Form2Input type="password"></Form2Input>
                            <Form2Span>비밀번호</Form2Span>
                          </Form2Lavel>
                        </Form2>
                        <Form3>
                          <Form3Lavel>
                            <CheckWrap>
                              <CheckBox type="checkbox"></CheckBox>
                            </CheckWrap>
                            <CheckLabel>로그인 정보 저장하기</CheckLabel>
                          </Form3Lavel>
                        </Form3>
                        <Form4>로그인</Form4>
                      </ModalFormWrap>
                      <ModalPass>비밀번호를 잊으셨나요?</ModalPass>
                    </ModalBoxForm>
                  </ModalBox>
                </ModalContent>
              </ModalBackground>
            )}
          </BoxContainer>
        </Box>
      </Wrap>
    </Container>
  );
}
const Container = styled.div`
  width: 319px;
  height: 44px;
`;

const Wrap = styled.div`
  wdith: 319px;
  height: 44px;
`;
const Box = styled.div`
  width: 319px;
  height: 44px;
  display: flex;
  // background-color: pink;
`;
// 이미지칸
const ImgBox = styled.div`
  width: 56px;
  height: 44px;
  margin-left: 16px;
`;

const ImgWrap = styled.div`
  width: 44px;
  height: 44px;
  margin-right: 12px;
`;

const ImgFrame = styled.div`
  width: 44px;
  height: 44px;
`;

const ImgLink = styled.button`
  width: 44px;
  height: 100%;
`;

const Img = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
`;

const ProfileBox = styled.div`
  width: 195px;
  height: 44px;
`;

const ProfileWrap = styled.div`
  width: 195px;
  height: 36px;
  margin: 4px 0px;
`;

const ProfileFrame = styled.div`
  width: 195px;
  height: 36px;
`;

const ProfileName = styled.button<{}>`
  width: 100%;
  height: 18px;
  font-weight: 600;
  font-size: 14px;
`;

const ProfileAim = styled.button`
  height: 18px;
  font-weight: 300;
  font-size: 14px;

  color: #007aff;
  line-height: 18px;
  font-size: 12px;
  font-weight: bold;
  &:hover {
    color: black;
  }
`;
const Switch = styled.button`
  width: 24px;
  height: 18px;
  color: #007aff;
  line-height: 18px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  &:hover {
    color: black;
  }
`;

const SwitchBox = styled.div`
  width: 36px;
  height: 18px;
`;

const SwitchWrap = styled.div`
  width: 36px;
  height: 18px;
  margin: 12px 0px;
`;

const SwitchFrame = styled.div`
  width: 36px;
  height: 18px;
`;

const SwitchName = styled.div`
  width: 24px;
  height: 18px;
  margin-left: 12px;
`;

const BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  position: relative;
  width: 400px;
  height: 410px;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
`;

// 버튼 스타일
const CloseButtonLine = styled.div`
  width: 2px;
  height: 22px;
  background-color: #000;
  position: absolute;
  transform: rotate(45deg);
`;

// 모달 헤더 - 376 + 12;12 , 34 + 12
const ModalHeader = styled.div`
  width: 376px;
  height: 34px;
  margin-top: 12px;
  padding: 0px 12px;
`;

// 모달 헤더 - 닫기 버튼 구역
const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 25px;
  background-color: transparent;
  border: none;
  color: #000;
  cursor: pointer;
`;

// 모달 본문
const ModalBox = styled.div`
  width: 400px;
  height: 364px;
`;
// 모달 본문 - 로고
const ModalBoxLogo = styled.div`
  width: 174px;
  height: 54px;
  margin: 36px 113px 12px 113px; // (상 우 하 좌)
`;

// 모달 본문 - 로고 이미지
const ModalLogoImg = styled.img`
  width: 174px;
  height: 54px;
`;

// 모달 본문 -  폼 박스
const ModalBoxForm = styled.div`
  width: 350px;
  height: 252px;
  overflow: hidden; /* 추가 */
  margin: 0px 25px 10px 25px;
`;

// 모달 본문 - 폼 (350x176) (마진 위 24)
const ModalFormWrap = styled.div`
  width: 350px;
  height: 176px;
  margin-top: 24px;
`;

// 모달 본문 - 폼 1 사용자 이메일 (270x38) 마진: (0 40 6 40)
const Form1 = styled.div`
  width: 270px;
  height: 38px;
  margin: 0px 40px 6px 40px;
  position: relative;
`;
// 폼 1 라벨  270 38
const Form1Lavel = styled.div`
  width: 270px;
  height: 38px;
`;
// 폼 1 스팬 태그 (252 36)
const Form1Span = styled.span`
  width: 240px;
  height: 18px;
  margin: 3px 10px;
  font-size: 10px;
  position: absolute;
  top: 0;
  left: 0;
`;

// 폼 1 인풋 (250:20) 패딩 (14 0 2 8)
const Form1Input = styled.input`
        width: 252px;
        height: 20px;
        background-color: #EBEDF0;
        aria-label: "전화번호, 사용자 이름 또는 이메일";
        aria-require: "true";
        autocapitalize:"off";
        autocorrect="off";
        maxlength="75";
        dir type="text";
        name="username";
        border-radius: 5px;
        padding: 14px 0px 2px 8px;
    `;

// 모달 본문 - 폼 2 비밀번호
const Form2 = styled.div`
  width: 270px;
  height: 38px;
  position: relative;
  margin: 0px 40px 6px 40px;
`;
// 폼 2 라벨
const Form2Lavel = styled.div`
  width: 270px;
  height: 38px;
`;
// 폼 2 스팬 태그
const Form2Span = styled.span`
  width: 240px;
  height: 18px;
  margin: 3px 10px;
  font-size: 10px;
  position: absolute;
  top: 0;
  left: 0;
`;

// 폼 2 인풋
const Form2Input = styled.input`
  width: 252px;
  height: 20px;
  background-color: #ebedf0;
  aria-label: '비밀번호';
  aria-require: 'true';
  autocapitalize: 'off';
  autocorrect: 'off';
  maxlength: '75';
  name: 'password';
  border-radius: 5px;
  padding: 14px 0px 2px 8px;
`;

// 모달 본문 - 폼 3 로그인 정보 저장하기
const Form3 = styled.div`
  width: 270px;
  height: 40px;
  margin: 0px 40px 0px 40px;
  overflow: hidden; /* 추가 */
`;

const Form3Lavel = styled.div`
  width: 160px;
  height: 20px;
  margin: 14px 40px 14px 0px;
  display: flex;
`;
const CheckWrap = styled.div`
  width: 20px;
  height: 20px;
`;

const CheckBox = styled.input`
        width: 20px;
        height: 20px;
        margin:0px;
        dir="ltr";
        aria-label="속이 빈 체크 표시 아이콘" ;
        aria-checked="false"  ;
        name="LoginCheckbox";
    `;

const CheckLabel = styled.div`
  width: 160px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  margin-left: 8px;
`;

const Form4 = styled.div`
  width: 260px;
  height: 30px;
  border-radius: 10px;
  margin: 5px 40px 5px 40px;
  color: white;
  background-color: #0064e0;
  &:hover {
    background-color: #2d88ff;
  }
  line-height: 30px;
  text-align: center;
`;

const ModalPass = styled.div`
  width: 180px;
  height: 16px;
  margin: 12px 95px 24px 95px;
`;

export default AccountSwitch;
