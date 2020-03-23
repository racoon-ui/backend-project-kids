# 리액트 프로젝트를 위한 백엔드 시스템

유초등 개발팀에서 진행되는 리액트 파일럿 프로젝트 지원을 위한 백엔드 시스템입니다. 이 프로젝트는 다음과 같은 논의를 기반으로 만들어졌습니다.

[2020.03.20 업무회의 논의사항]

```
1. Authenticate & Authorization
  - 로그인
  - 회원가입
  - JWT (Json Web Token)
2. 지점정보 관리
  - 지점관리 (리스트 / 검색 / 등록 / 삭제)
    - 지점명
    - 주소
    - 전화번호
    - 영업시간
    - 특징
    - latitude
    - longitude
3. 상품관리
  - 카테고리 관리
  - 상품관리 (리스트 / 검색 / 등록 / 삭제)
    - 이미지
    - 상품명
    - 가격
    - 판매유무
    - 간략설명
    - 상세설명
4. 빠른상담
  - 상담신청
  - 내역은 그냥 DB 에서 보는걸로
```

### 설치 및 이용방법

프로젝트를 실행하기 위해서는 다음과 같은 순서로 실행하면 됩니다.

```
$ git clone https://github.com/racoon-ui/backend-project-kids.git
$ cd backend-project-kids
$ npm install
$ docker-compose up -d
$ npm run dev
```

### 프로젝트 정보

이 프로젝트는 프론트엔드 분들도 관심이 있다면 코드를 보고 이해할 수 있도록 다음과 같은 기술을 이용하여 제작했습니다.

- Docker
- NodeJS
- Express
- Typescript
- MongoDB
- Redis
