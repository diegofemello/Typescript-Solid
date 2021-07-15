import styled from 'styled-components/native';
import color from '../../Fontes/colors';
import size from '../../Fontes/sizes';
import fontFamily from '../../Fontes/family';

export const ViewButton = styled.TouchableOpacity`
  min-height: 60px;
  max-height: 60px;
  min-width: 200px;
  max-width: 200px;
  background: ${color.logo};
  margin-top: 30px;
  shadow-color: ${color.logo};
  shadow-offset: 6px 4px;
  shadow-opacity: 0.22;
  shadow-radius: 4.65px;
  elevation: 1;
  align-self: center;
  border-radius: 1px;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;
export const ViewBottomLogin = styled.TouchableOpacity`
  min-height: 60px;
  max-height: 60px;
  min-width: 200px;
  max-width: 200px;
  background: ${color.logo};
  margin-top: 30px;
  shadow-color: ${color.logo};
  shadow-offset: 6px 4px;
  shadow-opacity: 0.22;
  shadow-radius: 4.65px;
  elevation: 1;
  align-self: center;
  border-radius: 1px;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;
export const ViewBottomInitialLogin = styled(ViewBottomLogin)`
  background: ${color.background};
  margin-top: 110px;
`;
export const TitleButtonLogin = styled.Text`
  font-size: ${size.medium_large}px;
  color: ${color.background};
  font-family: ${fontFamily.fontFamily};
`;
export const TitleButtonInitial = styled(TitleButtonLogin)`
  color: ${color.botao_selecionado_login};
  font-size: ${size.medium_large}px;
  font-weight: bold;
`;

export const ButtonEntrar = styled.TouchableOpacity`
  min-height: 36px;
  max-height: 36px;
  min-width: 98px;
  background: ${color.background};
  align-self: flex-end;
  margin-right: 20px;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
`;
export const TitleButtonEntrar = styled.Text`
  font-size: ${size.medium_large}px;
  color: ${color.botao_selecionado_login};
  font-family: 'segoe';
`;
export const ViewButtonProfile = styled(ButtonEntrar)`
  min-height: 36px;
  max-height: 36px;
  min-width: 98px;
  background: transparent;
  align-self: flex-end;
  margin-right: 20px;
  border-radius: 2px;
  align-items: flex-end;
  justify-content: center;
  margin-top: 0px;
`;
export const IconButtonProfile = styled.Image`
  max-height: 34px;
  max-width: 34px;
`;
