import styled from 'styled-components/native';
import colors from '../../../Fontes/colors';
import size from '../../../Fontes/sizes';

export const TouchableWrapper = styled.TouchableWithoutFeedback``;
export const Container = styled.View`
  height: 150px;
  width: 140px;
  background: ${({ readonly }) => (readonly ? '#EEE' : colors.background)};
  border-radius: 2px;
  margin: 12px;
  padding: 2px;
  shadow-color: ${colors.logo};
  shadow-offset: 0px 1px;
  shadow-opacity: ${({ btnPressed }) => (btnPressed ? 0.7 : 0.22)};
  shadow-radius: 4.65px;
  elevation: 2;
  z-index: 0;
  margin-bottom: 2px;
`;
export const SubContainer = styled.View`
  flex: 1;
  background: ${({ opened, readonly, selected }) => {
    if (selected) return colors.selected;
    if (opened || readonly) return 'rgba(194, 218, 243, 0.5)';
    return colors.background;
  }};
  opacity: ${({ opened, selected }) => (opened || selected ? 0.8 : 1)};
  align-items: center;
  justify-content: center;
`;
export const Image = styled.Image`
  max-height: 105px;
  max-width: 105px;
  align-self: center;
`;
export const ContainerTitleItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 140px;
  position: absolute;
  bottom: 7px;
`;
export const IconOptionTitle = styled.Text`
  align-self: flex-end;
  text-align: right;
  flex-direction: row;
  margin-right: 10px;
`;
export const TitleButtonOption = styled.Text`
  font-size: ${size.medium}px;
  color: ${colors.botao_selecionado_login};
  font-family: 'segoe';
  align-self: center;
  text-align: center;
  margin-top: 10px;
`;
export const SubTitleButtonOption = styled(TitleButtonOption)`
  font-size: ${size.small}px;
  color: ${colors.logo};
  margin-top: 0px;
`;
export const SubTitleOptionDesatived = styled(SubTitleButtonOption)`
  color: #848484;
`;
export const SubTitle = styled(SubTitleButtonOption)`
  margin-top: 10px;
  color: ${colors.botao_selecionado_login};
`;
export const View = styled.View`
  flex: 1;
  align-items: center;
`;
