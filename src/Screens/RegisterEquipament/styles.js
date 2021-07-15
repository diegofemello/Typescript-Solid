import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import colors from '../../Fontes/colors';
import size from '../../Fontes/sizes';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`;
export const ContainerView = styled.View`
  background: ${colors.background};
  align-self: center;
  min-width: ${Dimensions.get('window').width / 1.1}px;
  padding: 10px;
  border-radius: 2px;
`;

export const ViewVideo = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 2px;
  margin-top: 10px;
  background: black;
  height: 250px;
`;
export const ViewSubContainer = styled.View`
  margin: 15px;
`;
export const ViewCloseContainer = styled.View`
  align-items: flex-end;
`;
export const CloseItem = styled.Text`
  font-weight: bold;
  padding-right: 10px;
  font-size: 16px;
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
  margin-bottom: 20px;
  font-size: ${size.medium}px;
  color: ${colors.letras_login};
`;
export const ViewSubContainer2 = styled.View`
  justify-content: center;
  align-items: center;
`;
export const ProcurandoContainer = styled.Text`
  font-size: ${size.medium_large}px;
  margin-top: 30px;
  margin-bottom: 30px;
  color: ${colors.botao_selecionado_login};
`;
