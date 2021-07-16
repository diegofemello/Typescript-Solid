import React from 'react';

import {
  TouchableWrapper,
  Container,
  SubContainer,
  Image,
  TitleButtonOption,
} from './styles';

import ImageAdd from '../../../../assets/AddOption.png';

const ListAddItem = ({ handleAdd }) => {
  return (
    <TouchableWrapper onPress={handleAdd}>
      <Container>
        <SubContainer>
          <Image source={ImageAdd} resizeMode="cover" />
          <TitleButtonOption>Adicionar</TitleButtonOption>
        </SubContainer>
      </Container>
    </TouchableWrapper>
  );
};

export default ListAddItem;
