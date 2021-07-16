import React from 'react';
import { ViewButton, TitleButtonLogin } from './styles';

const Button = ({ onPress, title }) => {
  return (
    <ViewButton activeOpacity={0.9} onPress={onPress}>
      <TitleButtonLogin>{title}</TitleButtonLogin>
    </ViewButton>
  );
};

export default Button;
