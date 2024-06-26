# THE-FIRST

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/THE-FIRST-DANCE/the-first/blob/master/README.md)
[![ko](https://img.shields.io/badge/lang-ko-blue.svg)](https://github.com/THE-FIRST-DANCE/the-first/blob/master/README.ko.md)

**THE-FIRST-DANCE**의 첫 작품이다.  
Instagram을 모방한 사진 공유 소셜 네트워크 서비스입니다.

## 팀원 소개
|[Juhyeon Lee](https://github.com/juhyeonni)|[Jihun Kim](https://github.com/hetame1)|[Jaeil Lee](https://github.com/cheiru94)|[Youngjin An](https://github.com/0gene68)|
|:--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: |
| <img src="https://github.com/juhyeonni.png" width=400px alt="Juhyeon"/> | <img src="https://github.com/hetame1.png" width=400px alt="Jihun"/> | <img src="https://github.com/cheiru94.png" width=400px alt="Jaeil"> | <img src="https://github.com/0gene68.png" width=400px alt="Youngjin"/> | 
|Leader|Frontend|Frontend|Frontend|

---

## 제작 계기

`THE-FIRST`를 기획하게 된 이유는, 이전 1학기 자바스크립트 프로젝트 `2951`을 만들면서 아쉬웠던 부분을 채우고 좀 더 다채로운 라이브러리를 사용하여 만들어 보고자 **했습니다**.

## 사용 기술

과제에서 요구되고 있는 것은 **백엔드를 직접 구현하지 않고** 프론트엔드를 중심적으로 개발해야 하는 점입니다.
그 점을 고려하여 기술을 선정했습니다.

아래는 주요 사용 기술입니다.

- **React**: 동적 컴포넌트 라이브러리
- **Styled-component**: React 어플리케이션 스타일링 라이브러리 (CSS-in-JS)
- **Vite**: 로컬 개발서버 및 빌드 등 프론트엔드 툴
- **framer-motion**: React 어플리케이션 애니메이션 및 제스쳐 제어 라이브러리
- **Json-server**: key-value 기반의 DB와 API서버를 생성해주는 패키지
- **Json-server-auth**: `json-server`의 jwt 인증처리 미들웨어
- **Cors-anywhere**: 웹 서버상에서 외부 OpenAPI를 사용하기 위해 Cors를 우회하기 위한 프록시 서버
- **Docker**:

이 중, 다른 팀과 차별점이라고 하자면 **백엔드를 직접 구현하지 않고 사용자 인증**을 구현했다는 점입니다.

-- 작성중입니다.

[👏 바로가기](http://home.juhyeonni.co.kr:4000)

## 실행 방법

### 로컬 개발서버

1. 프로젝트 클론
2. 환경변수 파일(.env) import
3. `yarn install` 를 입력하여, 종속 패키지 설치
4. `yarn serve` 를 입력하여, json-server 시작
5. `yarn dev` 를 입력하여, vite 로컬 개발서버 시작
6. 브라우저에서 vite 기본 포트로 접근

### 도커 배포환경

1. 프로젝트 클론
2. 환경변수 파일(.env) import
3. 도커가 설치되어 있는 상태에서, `docker compose up` 를 입력
   - 멀티 스테이지 빌드 후, nginx를 배포 (웹 어플리케이션)
   - 미들웨어가 포함하여 커스텀화된 `json-server` 이미지를 사용하여 json-server 실행
4. 브라우저에서 `3000`번 포트로 접근
