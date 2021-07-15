import React from 'react';
import { Container, SubContainer, TextTitle, InputCode } from './styles';
import HeaderComponentLogin from '../../Components/Login/ImageDesign/index';
import BottomComponentLogin from '../../Components/Login/ImageDesign/bottom';
import Buttom from '../../Components/Bottoms/ButtonLogin';

const ResertCode = () => (
  <Container>
    <SubContainer>
      <HeaderComponentLogin />
      <TextTitle>Confirme o código enviado para seu e-mail.</TextTitle>
      <InputCode placeholder="Digite o código..." />
      <Buttom title="Concluir" />
      <BottomComponentLogin />
    </SubContainer>
  </Container>
);

export default ResertCode;
