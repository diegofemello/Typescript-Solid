/* eslint-disable no-nested-ternary */
import styled from 'styled-components/native';
import colors from '../../../Fontes/colors';
import size from '../../../Fontes/sizes';

export const Container = styled.View`
  height: 150px;
  width: 140px;
  background: ${(props) => (props.readonly ? '#EEE' : colors.background)};
  border-radius: 2px;
  margin-right: 20px;
  margin-top: 10px;
  padding: 2px;
  shadow-color: ${colors.logo};
  shadow-offset: 0px 1px;
  shadow-opacity: 0.22;
  shadow-radius: 4.65px;
  elevation: 2;
  z-index: 0;
  margin-bottom: 2px;
`;
export const SubContainer = styled.View`
  flex: 1;
  background: ${(props) =>
    props.atived
      ? colors.selected
      : props.readonly
      ? '#EEE'
      : props.pressed
      ? '#EEE'
      : colors.background};
  opacity: ${(props) => (props.atived ? 0.6 : 1)};
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;
export const ImageItems = styled.Image`
  max-height: 105px;
  max-width: 105px;
  align-self: center;
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
  margin-bottom: 10px;
`;
export const IconOptionTitle = styled.Text`
  align-self: flex-end;
  text-align: right;
  flex-direction: row;
  margin-right: 10px;
`;
export const ViewOptions = styled.View`
  flex: 1;
  padding: 10px;
  justify-content: center;
`;
export const View = styled.View`
  flex: 1;
  align-items: center;
`;
export const TextVolume = styled.Text`
  font-size: ${size.large}px;
  color: ${colors.botao_selecionado_login};
  align-self: center;
  text-align: center;
`;
