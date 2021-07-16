import React, { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, Text, Alert } from 'react-native';
import * as Network from 'expo-network';
import Webservice from '../../../Services/InternalWebservice';
import Api from '../../../Services/Api';

import Button from '../../../Components/Bottoms/Button';
import {
  Container,
  ViewVideo,
  ViewSubContainer,
  ProcurandoContainer,
  InputCode,
} from './styles';

const Page1 = ({ setModalVisible, show, modalPage }) => {
  const [text, setText] = useState('Conecte na rede do seu equipamento');
  const [step, setStep] = useState(1);
  const [equipMac, setEquipMac] = useState('');
  const [intervalState, setIntervalState] = useState(false);
  const [sending, setSending] = useState(false);
  const [values, setValues] = useState({ name: '', password: '', equipPwd: '' });
  const [auxText, setAuxText] = useState('');
  const [tryStep, setTryStep] = useState(0);
  const [count, setCount] = useState(120);
  const countRef = useRef();

  countRef.current = count;

  const createEquip = async (intervalRequest) => {
    const { status } = await Api.post('/equipments/register', {
      mac: equipMac,
    });
    if (status === 200) {
      clearInterval(intervalState);
      clearInterval(intervalRequest);

      return Alert.alert(
        'Sucesso',
        'Equipamento vinculado com sucesso! Vá até sua área web para configurá-lo para uso.',
        [
          {
            text: 'OK',
            onPress: () => {
              setTryStep(0);
              setModalVisible(false);
            },
          },
        ]
      );
    }
    if (status === 409) {
      clearInterval(intervalState);
      clearInterval(intervalRequest);

      return Alert.alert(
        'Erro',
        'Equipamento já foi registrado no sistema, por favor contate o administrador para mais informações',
        [
          {
            text: 'OK',
            onPress: () => {
              setTryStep(0);
              setModalVisible(false);
            },
          },
        ]
      );
    }
    console.log('Resposta do servidor', status);
    return setTimeout(() => createEquip(intervalRequest), 4000);
  };

  useEffect(() => {
    const getNetInfo = async () => {
      const { isConnected, type } = await Network.getNetworkStateAsync();
      if (!isConnected && step === 1) {
        setStep(1);
        setText('Conecte na rede do seu equipamento');
      }

      values.equipPwd = "";
      const { status, data } = await Webservice.get(`/varget?id=15`, { timeout: 5000, });

      if (!sending && step === 1 && isConnected && type === 'WIFI' && status !== 500) {
        setStep(2);
      }
    };

    if (step === 1) {
      setIntervalState(
        setInterval(async () => {
          console.log('Running', step);
          if (step === 1) {
            await getNetInfo();
          }
        }, 2500)
      );
    } else {
      clearInterval(intervalState);
    }

    if (step === 4) {
      const intervalRequest = setInterval(() => {
        if (countRef.current > 0) setCount(countRef.current - 1);
      }, 1000);
      createEquip(intervalRequest);
    }

    return () => clearInterval(intervalState);
  }, [step]);

  useEffect(() => {
    if (count === 0) {
      clearInterval(intervalState);
      Alert.alert(
        'Erro',
        'Tentativa máxima excedida, por favor repita a operação.',
        [
          {
            text: 'OK',
            onPress: () => {
              setTryStep(0);
              setModalVisible(false);
            },
          },
        ]
      );
    }
  }, [count]);

  useEffect(() => {
    if (!show || modalPage !== 1) {
      clearInterval(intervalState);
    }
  }, [show, modalPage]);

  useEffect(() => {
    if (tryStep === 3) {
      Alert.alert(
        'Erro',
        'Tentativa máxima excedida, por favor repita a operação.',
        [
          {
            text: 'OK',
            onPress: () => {
              setTryStep(0);
              setModalVisible(false);
            },
          },
        ]
      );
    }
  }, [tryStep]);

  const sendPwdConfiguration = async () => {
    setText('Tentando se comunicar com o servidor');
    setSending(true);

    const { status, data } = await Webservice.get(
      `/varget?id=15&pwd=${values.equipPwd}`,
      {
        timeout: 5000,
      }
    );

    console.log('Solicitando MAC!', status, data);

    if (status !== 200 || !data.varvalue) {
      if (data?.message) {
        setAuxText(
          `Não foi possível comunicar com o equipamento. Motivo: ${data.message}`
        )
      } else {
        setAuxText(
          'Houve um erro de comunicação, cheque a conexão com o equipamento e tente novamente [PWD]'
        );
      }
      setSending(false);
      setStep(1);
    } else {
      setAuxText('');
      setEquipMac(data.varvalue);
      setSending(false);
      setStep(3);
    }
  }

  const sendWifiConfiguration = async () => {
    if (!sending) {
      setAuxText('');
      setSending(true);
      const { status: nameStatus } = await Webservice.get(
        `/varset?id=1795&value=${values.name}&pwd=${values.equipPwd}`,
        {
          timeout: 5000,
        }
      );
      console.log('Request feita 1', nameStatus);
      if (nameStatus !== 200) {
        setSending(false);
        setAuxText(
          'Houve um erro de comunicação, cheque a conexão com o equipamento e tente novamente [WIFI]'
        );
        return setTryStep(tryStep + 1);
      }

      const { status: passwordStatus } = await Webservice.get(
        `/varset?id=1796&value=${values.password}&pwd=${values.equipPwd}`,
        {
          timeout: 5000,
        }
      );
      console.log('Request feita 2', passwordStatus);
      if (passwordStatus !== 200) {
        setSending(false);
        setAuxText(
          'Houve um erro de comunicação, cheque a conexão com o equipamento e tente novamente [WIFI]'
        );
        return setTryStep(tryStep + 1);
      }

      const { status: resetStatus } = await Webservice.get(
        `/varset?id=2&value=1&pwd=${values.equipPwd}`,
        {
          timeout: 5000,
        }
      );
      console.log('Request feita 3', resetStatus);
      setSending(false);
      if (resetStatus !== 200) {
        setAuxText(
          'Houve um erro de comunicação, cheque a conexão com o equipamento e tente novamente [WIFI]'
        );
        return setTryStep(tryStep + 1);
      }

      setTryStep(0);
      return setStep(4);
    }

    return false;
  };

  if (step === 4) {
    return (
      <Container>
        <ProcurandoContainer>
          Aguardando equipamento reiniciar, certifique-se de estar conectado em
          uma rede com acesso a internet, o processo será automático então evite
          encerrar o aplicativo.
        </ProcurandoContainer>
        <ProcurandoContainer>{count}</ProcurandoContainer>
        <ActivityIndicator size="large" color="#A7518A" />
      </Container>
    );
  }

  if (step === 3) {
    return (
      <Container>
        <InputCode
          placeholder="Digite o nome da sua rede WIFI"
          value={values.name}
          onChangeText={(value) => setValues({ ...values, name: value })}
        />
        <InputCode
          placeholder="Digite a senha da sua rede WIFI"
          value={values.password}
          onChangeText={(value) => setValues({ ...values, password: value })}
          secureTextEntry
        />
        <Text style={{ color: 'red', textAlign: 'right', fontSize: 10 }}>
          {auxText}
        </Text>
        <Button
          title={sending ? 'Enviando...' : 'Configurar'}
          onPress={() => sendWifiConfiguration()}
        />
      </Container>
    );
  }

  if (step === 2) {
    return (
      <Container>
        <InputCode
          placeholder="Digite a senha do seu equipamento"
          value={values.equipPwd}
          onChangeText={(value) => setValues({ ...values, equipPwd: value })}
          secureTextEntry
        />
        <Text style={{ color: 'red', textAlign: 'right', fontSize: 10 }}>
          {auxText}
        </Text>
        <Button
          title={sending ? 'Enviando...' : 'Próximo'}
          onPress={() => sendPwdConfiguration()}
        />
      </Container>
    );
  }

  return (
    <Container>
      <ViewVideo>
        <Text style={{ color: 'white' }}>VIDEO HERE</Text>
      </ViewVideo>
      <ViewSubContainer>
        <ProcurandoContainer>{text}</ProcurandoContainer>
        <ActivityIndicator size="large" color="#A7518A" />
      </ViewSubContainer>
    </Container>
  );
};

export default Page1;
