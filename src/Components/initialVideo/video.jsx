import React from 'react';
import { Text } from 'react-native';
import { LAST_UPDATE_DATE } from "@env";
import {
  ContainerView,
  ViewVideo,
  ViewSubContainer,
  TitleCode,
  InputCode,
  Footer,
} from './styles';

const initialVideo = ({ value, onChangeText, doneCode }) => {
  return (
    <ContainerView>
      <ViewVideo>
        <Text style={{ color: 'white' }}>VIDEO HERE</Text>
      </ViewVideo>
      <ViewSubContainer>
        <TitleCode>Código do equipamento</TitleCode>
        <InputCode
          placeholder="Digite o código..."
          clearTextOnFocus
          returnKeyType="done"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={doneCode}
        />
        <Footer>
          <Text style={{ color: '#c2c2c2' }}>Atualizado em: ${LAST_UPDATE_DATE}</Text>
        </Footer>
      </ViewSubContainer>
    </ContainerView>
  );
};

export default initialVideo;
