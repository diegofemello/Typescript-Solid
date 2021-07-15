import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import {
  Container,
  SubContainer,
  ImageItems,
  TitleButtonOption,
} from './styles';

const imageAdd = require('../../../../assets/AddOption.png');

const Itemcomponent = ({ handleAdd }) => {
  return (
    <TouchableWithoutFeedback onPress={handleAdd}>
      <Container activeOpacity={0.9}>
        <SubContainer>
          <ImageItems source={imageAdd} resizeMode="cover" />
          <TitleButtonOption>Adicionar</TitleButtonOption>
        </SubContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Itemcomponent;
