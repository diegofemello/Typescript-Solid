import styled from 'styled-components/native';
import { Dimensions, Platform } from 'react-native';
import colors from '../../Fontes/colors';
import size from '../../Fontes/sizes';

export const Container = styled.ScrollView`
  flex: 1;
`;
export const SubContainer = styled.View`
  flex: 1;
  min-height: ${Dimensions.get('window').height}px;
  margin-bottom: ${Platform.OS === 'ios' ? 0 : 60}px;
`;
export const TextTitle = styled.Text`
  font-size: ${size.medium_large}px;
  color: ${colors.black};
  font-family: 'segoe';
  padding-horizontal: 38px;
  align-self: center;
  text-align: justify;
  margin-top: 20px;
  margin-bottom: 20px;
`;
export const InputCode = styled.TextInput`
  min-height: 68px;
  max-height: 68px;
  margin-horizontal: 38px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: ${size.medium_large}px;
  color: ${colors.letras_login};
  font-family: 'segoe';
  border-color: ${colors.logo};
  border-width: 1px;
  border-radius: 2px;
`;
