import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import colors from '../../Fontes/colors';

export const Wrapper = styled.View`
  background: ${colors.backgroundMain};
  min-height: ${Dimensions.get('window').height}px;
`;
export const Container = styled.ScrollView`
  flex: 1;
`;
export const SubContainer = styled.View`
  flex: 1;
  padding-bottom: 20px;
  min-height: ${Dimensions.get('window').height - 300}px;
`;
export const ListContainer = styled.View`
  margin-top: 15px;
  margin-bottom: 15px;
`;
