import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ContainerCabecalho,
  SubContainerCabecalho,
  TitleDescriptionCabecalho,
  TitleDescriptionType,
  ButtonContainer,
} from './styles';

const MainLogout = ({ ButtonConfig, info }) => {
  return (
    <LinearGradient
      // Button Linear Gradient
      colors={['#A7518A', '#A7518A', '#B9E2F3']}
    >
      <ContainerCabecalho source={info.image} resizeMode="cover">
        <ButtonContainer>{ButtonConfig}</ButtonContainer>
        <SubContainerCabecalho>
          <TitleDescriptionCabecalho>
            {info.description}
          </TitleDescriptionCabecalho>
          <TitleDescriptionType>{info.name}</TitleDescriptionType>
        </SubContainerCabecalho>
      </ContainerCabecalho>
    </LinearGradient>
  );
};

export default MainLogout;
