import React, { useState } from 'react';
import { Alert } from 'react-native';

import Button from '../../../Components/Bottoms/Button';
import {
  Container,
  ViewSubContainer,
  TitleCode,
  InputCode,
  InputContainer,
} from './styles';

const Page3 = ({ setModalPage }) => {
  const [rede, setRede] = useState('');
  const [senha, setSenha] = useState('');

  const onClick = () => {
    if (rede.length === '')
      return Alert.alert('Atenção', 'Campo rede obrigatório');
    if (senha.length === '')
      return Alert.alert('Atenção', 'Campo senha obrigatório');

    return setModalPage(4);
  };

  return (
    <Container>
      <ViewSubContainer>
        <InputContainer>
          <TitleCode>Rede do Wifi</TitleCode>
          <InputCode
            placeholder="Digite o nome da rede..."
            value={rede}
            onChangeText={setRede}
          />
        </InputContainer>
        <InputContainer>
          <TitleCode>Senha do Wifi</TitleCode>
          <InputCode
            placeholder="Digite a senha da rede..."
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        </InputContainer>
        <Button title="Salvar" onPress={() => onClick()} />
      </ViewSubContainer>
    </Container>
  );
};

export default Page3;
