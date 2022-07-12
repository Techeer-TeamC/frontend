// OAuth.js 라는 컴포넌트를 따로 생성하여 관리하였음


const CLIENT_ID = "ec12b7fe2ebf0aa8a207c7b5b7fe08f7";
const REDIRECT_URI = "http://localhost:3000/oauth/kakao";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export default KAKAO_AUTH_URL;

