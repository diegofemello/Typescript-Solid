import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const ImageDesignBottom = styled.Image`
  align-self: flex-end;
  z-index: -1;
  position: absolute;
  bottom: 0;
  min-width: ${Dimensions.get('window').width}px;
`;
