import React from 'react';
import { ViewBottomInitialLogin, TitleButtonInitial } from './styles';

const Bottoms = ({ onPress, title }) => {
  return (
    <ViewBottomInitialLogin activeOpacity={0.9} onPress={onPress}>
      <TitleButtonInitial>{title}</TitleButtonInitial>
    </ViewBottomInitialLogin>
  );
};

export default Bottoms;
