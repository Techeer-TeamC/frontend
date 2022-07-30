// OAuth.js 라는 컴포넌트를 따로 생성하여 관리

const CLIENT_ID = "ec12b7fe2ebf0aa8a207c7b5b7fe08f7";
const REDIRECT_URI = "http://localhost:3000/oauth/kakao";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const GOOGLE_CLIENT_ID =
  "108026517024-oed3bjn23c95d48gav7lk3s155i6ov0h.apps.googleusercontent.com";
const GOOGLE_REDIRECT_URI = "http://localhost:3000/oauth/google";
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
