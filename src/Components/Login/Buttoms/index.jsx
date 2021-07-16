import React from 'react';
import {
  Container,
  ButtonOption,
  TitleButtoms,
  ViewButtomRegister,
} from './styles';

const Buttoms = ({ onPressLogin, login, onPressRegister, register }) => {
  return (
    <Container>
      <ButtonOption onPress={onPressLogin} atived={login}>
        <TitleButtoms atived={login}>ENTRAR</TitleButtoms>
      </ButtonOption>
      <ViewButtomRegister onPress={onPressRegister} atived={register}>
        <TitleButtoms atived={register}>CADASTRAR</TitleButtoms>
      </ViewButtomRegister>
    </Container>
  );
};

export default Buttoms;
