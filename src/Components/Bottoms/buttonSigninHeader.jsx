import React from 'react';
import { ButtonEntrar, TitleButtonEntrar } from './styles';

const Bottoms = ({ onPressConfig }) => {
  return (
    <ButtonEntrar activeOpacity={0.9} onPress={onPressConfig}>
      <TitleButtonEntrar>Entrar</TitleButtonEntrar>
    </ButtonEntrar>
  );
};

export default Bottoms;
