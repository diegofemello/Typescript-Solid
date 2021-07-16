import React, { useContext } from 'react';
import {
  Alert,
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ButtomRegister from '../../../Components/Bottoms/ButtonLogin';

import UserContext from '../../../Contexts/User';
import AppContext from '../../../Contexts/App';

import colors from '../../../Fontes/colors';
import size from '../../../Fontes/sizes';

const Register = ({
  name,
  email,
  password,
  confirmPassword,
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
}) => {
  const { createUser } = useContext(UserContext);
  const { setLoading } = useContext(AppContext);
  const navigation = useNavigation();
  const handleSubmit = async () => {
    if (!name || name === '') {
      return Alert.alert('Atenção', 'Campo nome é obrigatório!');
    }

    if (!email || email === '') {
      return Alert.alert('Atenção', 'Campo e-mail é obrigatório!');
    }

    if (!password || password === '') {
      return Alert.alert('Atenção', 'Campo senha é obrigatório!');
    }

    if (password !== confirmPassword) {
      return Alert.alert('Atenção', 'As senhas não conferem!');
    }

    setLoading(true);
    const { status, data } = await createUser();
    setLoading(false);
    if (status === 200) {
      return navigation.navigate('Main');
    }

    if (status === 409) {
      return Alert.alert('Atenção', 'E-mail já existe, favor usar outro');
    }
    console.log('Inside src/Login/Register/index.jsx', status, data);
    return Alert.alert(
      'Ops!',
      'Servidor não respondeu, tente novamente mais tarde.'
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView>
        <View style={styles.view}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={name}
            onChangeText={(value) => setName(value)}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
            secureTextEntry={true}
          />
        </View>
        <ButtomRegister onPress={handleSubmit} title="Cadastrar" />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Register;
const styles = StyleSheet.create({
  view: {
    borderWidth: 0.9,
    borderColor: colors.letras_login,
    marginBottom: 10,
    marginTop: 20,
    marginHorizontal: 44,
    borderRadius: 4,
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  container: {
    flex: 1,
    marginBottom: 30,
  },
  input: {
    minHeight: 68,
    maxHeight: 68,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: size.medium_large,
    color: colors.letras_login,
    borderBottomWidth: 1,
    borderColor: colors.bordas,
  },
});
