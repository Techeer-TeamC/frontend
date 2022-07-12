import React from 'react';
import {Background, LoadingText} from './Styles';
import Spinner from '../assets/images/loading.gif';


function KLoading() {
  return (
      <Background>
        <LoadingText>로그인 중 입니다 </LoadingText>
        <img src={Spinner} alt="로딩중" className="img-fluid" />
      </Background>
  );
};

export default KLoading;