import React from 'react';
import {Background, LoadingText} from './Styles';
import Spinner from '../assets/images/loading.gif';


function Loading() {
  return (
      <Background>
        <LoadingText>데이터를 크롤링 중 입니다.. </LoadingText>
        <img src={Spinner} alt="로딩중" className="img-fluid" />
      </Background>
  );
};

export default Loading;
