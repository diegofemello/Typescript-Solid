import styled from 'styled-components/native';
import colors from '../../Fontes/colors';
import size from '../../Fontes/sizes';

export const ContainerCabecalho = styled.ImageBackground`
  min-height: 314px;
  max-height: 314px;
`;
export const SubContainerCabecalho = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 50px;
`;
export const ButtonEntrar = styled.TouchableOpacity`
  min-height: 36px;
  max-height: 36px;
  min-width: 98px;
  background: ${colors.background};
  align-self: flex-end;
  margin-top: 40px;
  margin-right: 20px;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
`;
export const ButtonContainer = styled.View`
  position: absolute;
  right: 0;
`;
export const TitleButtonEntrar = styled.Text`
  font-size: ${size.medium_large}px;
  color: ${colors.botao_selecionado_login};
  font-family: 'segoe';
`;
export const TitleDescriptionCabecalho = styled.Text`
  font-size: ${size.medium_large}px;
  color: ${colors.background};
  text-align: center;
  margin-horizontal: 35px;
  font-weight: 900;
  font-family: 'segoe';
`;
export const TitleDescriptionType = styled.Text`
  font-size: ${size.large}px;
  color: ${colors.background};
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
  font-family: 'segoe';
`;
export const ViewButtonsTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding-left: 20px;
`;
export const ImageProfileOption = styled.Image`
  max-width: 100px;
  max-height: 100px;
`;
