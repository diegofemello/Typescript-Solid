import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import fontFamily from '../../../Fontes/family';
import colors from '../../../Fontes/colors';

export const TextLogo = styled.Text`
  align-self: center;
  margin-bottom: 20px;
  color: ${colors.logo};
  font-size: 24px;
  font-family: ${fontFamily.fontFamily};
`;
export const ImageDesignTop = styled.Image`
  min-width: ${Dimensions.get('window').width}px;
  z-index: -1;
  position: absolute;
`;
export const ImageDesignBottom = styled(ImageDesignTop)`
  flex: 1;
  bottom: 0;
`;
export const IconLogo = styled.Image`
  width: ${Dimensions.get('window').width / 3}px;
  height: ${Dimensions.get('window').height / 6}px;
  align-self: center;
  margin-bottom: 20px;
  margin-top: 60px;
`;
