import styled from 'styled-components/native';
import colors from '../../Fontes/colors';
import size from '../../Fontes/sizes';

export const Container = styled.View`
  background: ${({ subList }) =>
    subList ? colors.backgroundSubList : 'transparent'};
  padding-bottom: ${({ subList }) => (subList ? '10px' : 0)};
`;
export const Title = styled.Text`
  margin-bottom: 4px;
  margin-left: 24px;
  font-size: ${size.medium_large}px;
  border-bottom-width: 2px;
  border-color: ${colors.azul};
  font-family: 'segoe';
  font-weight: bold;
`;
export const SubContainerScroll = styled.ScrollView``;
export const SubContainer = styled.View`
  flex-direction: row;
`;
export const SubListContainer = styled.View`
  margin-top: 10px;
`;
