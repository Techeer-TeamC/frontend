import React from "react";
import { Background, LoadingText } from "./Styles";
import Spinner from "../assets/images/loading.gif";

type LoadingProps = {
  text: string;
};
function Loading({ text }: LoadingProps) {
  return (
    <Background>
      <LoadingText>{text} </LoadingText>
      <img src={Spinner} alt="로딩중" className="img-fluid" />
    </Background>
  );
}

export default Loading;
