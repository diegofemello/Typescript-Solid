import styled from 'styled-components/native';
import colors from '../../../Fontes/colors';
import size from '../../../Fontes/sizes';
import fontFamily from '../../../Fontes/family';

export const Container = styled.View`
  flex-direction: row;
  margin-horizontal: 44px;
  justify-content: space-between;
  margin-bottom: 20px;
`;
export const ButtonOption = styled.TouchableOpacity`
  flex: 1;
  min-height: 40px;
  max-height: 40px;
  justify-content: center;
  border-bottom-width: 3px;
  border-bottom-color: ${(props) =>
    props.atived ? colors.botao_selecionado_login : colors.background};
`;
export const ViewButtomRegister = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
  justify-content: center;
  border-bottom-width: 3px;
  border-bottom-color: ${(props) =>
    props.atived ? colors.botao_selecionado_login : colors.background};
`;
export const TitleButtoms = styled.Text`
  font-size: ${size.large}px;
  color: ${(props) =>
    props.atived
      ? colors.botao_selecionado_login
      : colors.botao_deselecionado_login};
  font-weight: 900;
  font-family: ${fontFamily.fontFamily};
`;
