import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container, Title } from './styles';

const Loading = () => {
  return (
    <Container>
      <ActivityIndicator size="large" color="#FFF" />
      <Title>Aguardando servidor</Title>
    </Container>
  );
};

export default Loading;
