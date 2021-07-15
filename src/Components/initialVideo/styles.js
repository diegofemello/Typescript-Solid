import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import colors from '../../Fontes/colors';
import size from '../../Fontes/sizes';

export const ImageDesignBottom = styled.Image`
  align-self: flex-end;
  position: absolute;
  bottom: 0;
  z-index: 1;
  min-width: 100%;
`;
export const ImageDesignTop = styled.Image`
  position: absolute;
  top: 0;
  min-width: ${Dimensions.get('window').width}px;
`;
export const ContainerView = styled.View`
  background: ${colors.background};
  min-height: 400px;
  min-width: 280px;
  padding: 20px;
  border-radius: 2px;
`;

export const ViewVideo = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 2px;
  margin-top: 10px;
  background: black;
`;
export const ViewSubContainer = styled.View`
  flex: 1;
`;
export const TitleCode = styled.Text`
  font-size: ${size.medium_large}px;
  margin-top: 10px;
  color: ${colors.botao_selecionado_login};
`;
export const InputCode = styled.TextInput`
  max-height: 90px;
  min-height: 90px;
  margin-top: 10px;
  border-radius: 2px;
  border-width: 1px;
  border-color: ${colors.logo};
  padding: 20px;
  font-size: ${size.medium}px;
  color: ${colors.letras_login};
`;

export const Footer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  z-index: 100;
  justify-content: center;
`;
