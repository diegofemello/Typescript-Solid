import styled from 'styled-components/native';
import colors from '../../../Fontes/colors';
import size from '../../../Fontes/sizes';

export const Container = styled.View`
  margin: 10px 0;
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
  justify-content: center;
  align-items: center;
  margin: 15px;
`;
export const ProcurandoContainer = styled.Text`
  font-size: ${size.medium_large}px;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
  color: ${colors.botao_selecionado_login};
`;
export const InputContainer = styled.View`
  width: 100%;
`;
export const TitleCode = styled.Text`
  font-size: ${size.medium_large}px;
  margin-top: 10px;
  font-weight: bold;
  color: ${colors.botao_selecionado_login};
`;
export const InputCode = styled.TextInput`
  max-height: 90px;
  min-height: 90px;
  width: 100%;
  margin-top: 10px;
  border-radius: 2px;
  border-width: 1px;
  border-color: ${colors.logo};
  padding: 20px;
  margin-bottom: 20px;
  font-size: ${size.medium}px;
  color: ${colors.letras_login};
`;
