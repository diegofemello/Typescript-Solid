import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
`;
export const SubContainer = styled.View`
  flex: 1;
  min-height: ${Dimensions.get('window').height - 300}px;
  padding-bottom: 20px;
`;
export const ListContainer = styled.View`
  margin-top: 25px;
`;
export const SubListContainer = styled.View`
  margin-top: 10px;
`;
