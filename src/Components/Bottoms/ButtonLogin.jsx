import React from 'react';
import { ViewBottomLogin, TitleButtonLogin } from './styles';

const Bottoms = ({ onPress, title }) => {
  return (
    <ViewBottomLogin activeOpacity={0.9} onPress={onPress}>
      <TitleButtonLogin>{title}</TitleButtonLogin>
    </ViewBottomLogin>
  );
};

export default Bottoms;
