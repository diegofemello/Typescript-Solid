import styled from 'styled-components/native';
import colors from '../../Fontes/colors';
import size from '../../Fontes/sizes';

export const ContainerCabecalho = styled.ImageBackground`
  min-height: 314px;
  max-height: 314px;
  padding-top: 40px;
  background: ${colors.backgroundMain};
`;
export const TitleDescriptionCabecalho = styled.Text`
  font-size: ${size.medium_large}px;
  color: ${colors.background};
  text-align: center;
  margin-horizontal: 35px;
  font-weight: 900;
  font-family: 'segoe';
`;
