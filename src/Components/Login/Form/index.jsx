import React from 'react';
import { Container, InputSub, Input, TitleResetPassword } from './styles';

const Form = ({
  email,
  setEmail,
  password,
  setPassword,
  onPressResetPassword,
}) => {
  return (
    <>
      <Container>
        <InputSub
          onChangeText={(text) => setEmail(text)}
          placeholder="E-mail"
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          placeholder="Senha"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
      </Container>
      <TitleResetPassword onPress={onPressResetPassword}>
        Esqueci minha senha
      </TitleResetPassword>
    </>
  );
};

export default React.memo(Form);
