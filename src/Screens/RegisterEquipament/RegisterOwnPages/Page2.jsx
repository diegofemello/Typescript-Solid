import React, { useState } from 'react';
import { Alert } from 'react-native';

import Button from '../../../Components/Bottoms/Button';
import { Container, ViewSubContainer, TitleCode, InputCode } from './styles';

const Page2 = ({ setModalPage }) => {
  const [value, setValue] = useState('');

  const onClick = () => {
    if (value.length < 3)
      return Alert.alert(
        'Atenção',
        'O código deve ter pelo menos 3 caracteres'
      );

    return setModalPage(3);
  };

  return (
    <Container>
      <ViewSubContainer>
        <TitleCode>Novo Código do equipamento</TitleCode>
        <InputCode
          placeholder="Digite o novo código..."
          value={value}
          onChangeText={setValue}
          secureTextEntry
        />
        <Button title="Salvar" onPress={() => onClick()} />
      </ViewSubContainer>
    </Container>
  );
};

export default Page2;
