import React, { useState, useContext } from 'react';
import { KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Network from 'expo-network';
import { Container, LoginContainer } from './styles';

import Form from '../../Components/Login/Form/index';
import Buttons from '../../Components/Login/Buttoms/index';
import ButtomLogin from '../../Components/Bottoms/ButtonLogin';
import Register from './Register/index';
import HeaderComponentLogin from '../../Components/Login/ImageDesign/index';
import BottomComponentLogin from '../../Components/Login/ImageDesign/bottom';

import UserContext from '../../Contexts/User';
import AppContext from '../../Contexts/App';

const Login = (props) => {
  const [login, setLogin] = useState(true);
  const [register, setRegister] = useState(false);
  const {
    setEmail,
    setPassword,
    setName,
    setConfirmPassword,
    LoginUser,
    email,
    password,
    confirmPassword,
    name,
  } = useContext(UserContext);
  const { setLoading } = useContext(AppContext);
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);
    const { status } = await LoginUser();
    if (status === 200) {
      return navigation.navigate('Main');
    }
    setLoading(false);
    if (status === 404) {
      return Alert.alert('Ops!', 'Usuário e/ou senha inválidos');
    }

    return Alert.alert(
      'Ops!',
      'Servidor não respondeu, tente novamente mais tarde.'
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      <Container>
        <HeaderComponentLogin />
        <Buttons
          onPressLogin={() => {
            setLogin(true);
            setRegister(false);
          }}
          register={register}
          login={login}
          onPressRegister={() => {
            setRegister(true);
            setLogin(false);
          }}
        />
        {login ? (
          <LoginContainer>
            <Form
              onPressResetPassword={() =>
                props.navigation.navigate('ResetCode')
              }
              setEmail={(value) => setEmail(value)}
              email={email}
              password={password}
              setPassword={(value) => setPassword(value)}
            />
            <ButtomLogin title="Entrar" onPress={handleLogin} />
          </LoginContainer>
        ) : (
          <Register
            email={email}
            name={name}
            password={password}
            confirmPassword={confirmPassword}
            
            setName={(value) => setName(value)}
            setEmail={(value) => setEmail(value)}
            setPassword={(value) => setPassword(value)}
            setConfirmPassword={(value) => setConfirmPassword(value)}
          />
        )}
        <BottomComponentLogin />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Login;
