import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../Services/Api';

const UserContext = createContext({
  user: {},
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  isLogged: false,
  LoginUser: () => {},
  createUser: () => {},
  LogoutUser: () => {},
  RegisterUser: () => {},
  setName: () => {},
  setEmail: () => {},
  setPassword: () => {},
  setConfirmPassword: () => {},
  userAtual: {},
  checkUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('user04@teste.com');
  const [password, setPassword] = useState('123');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [userAtual, setUserAtual] = useState(null);

  function RegisterUser() {
    return true;
  }
  async function LoginUser() {
    const { status, data } = await Api.post('/auth', { email, password });
    if (status !== 200) {
      console.log('src/Contexts/User.js', status, data);
      return { status };
    }

    await AsyncStorage.setItem('@sii_universe/token', data.token);
    Api.defaults.headers.Authorization = `Bearer ${data.token}`;
    setUserAtual({ ...data });
    setIsLogged(true);
    setName('');
    setEmail('');
    setPassword('');
    return { status, data };
  }
  async function createUser() {
    const { status, data } = await Api.post('/auth/new-user', {
      email,
      password,
      name,
    });
    if (status !== 200) {
      return { status, data };
    }

    await AsyncStorage.setItem('@sii_universe/token', data.token);
    Api.defaults.headers.Authorization = `Bearer ${data.token}`;
    setUserAtual({ ...data });
    setIsLogged(true);
    setName('');
    setEmail('');
    setPassword('');
    return { status, data };
  }
  async function LogoutUser() {
    await AsyncStorage.removeItem('@sii_universe/token');
    setUserAtual(null);
    setIsLogged(false);
  }
  async function checkUser() {
    const token = await AsyncStorage.getItem('@sii_universe/token');
    if (token) {
      Api.defaults.headers.Authorization = `Bearer ${token}`;
      const { status, data } = await Api.get('/check-auth', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (status !== 200) {
        await AsyncStorage.clear();
      } else {
        Api.defaults.headers.Authorization = `Bearer ${token}`;
        setUserAtual({ ...data });
        setIsLogged(true);
        setName('');
        setEmail('');
        setPassword('');
      }
    }
  }
  return (
    <UserContext.Provider
      value={{
        isLogged,
        name,
        email,
        password,
        confirmPassword,
        setName: (value) => setName(value),
        setEmail: (value) => setEmail(value),
        setPassword: (value) => setPassword(value),
        setConfirmPassword: (value) => setConfirmPassword(value),
        LoginUser,
        createUser,
        LogoutUser,
        RegisterUser: () => RegisterUser(),
        userAtual,
        checkUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
