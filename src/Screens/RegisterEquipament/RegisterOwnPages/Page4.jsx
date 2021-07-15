import React, { useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';

import { Container, ViewSubContainer, ProcurandoContainer } from './styles';

const Page4 = ({ setModalVisible, handleAddEquipament }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      handleAddEquipament();
      Alert.alert('Sucesso', 'Equipamento adicionado com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            setModalVisible(false);
          },
        },
      ]);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Container>
      <ViewSubContainer>
        <ActivityIndicator size="large" color="#A7518A" />
        <ProcurandoContainer>
          Estamos configurando o equipamento...
        </ProcurandoContainer>
      </ViewSubContainer>
    </Container>
  );
};

export default Page4;
