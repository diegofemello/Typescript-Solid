import React, { useState, useEffect, useContext } from 'react';

import { Text, TouchableWithoutFeedback, Alert } from 'react-native';
import Modal from 'react-native-modal';
import {
  Container,
  ContainerView,
  ViewVideo,
  ViewSubContainer,
  TitleCode,
  InputCode,
  ViewCloseContainer,
  CloseItem,
} from './styles';
import Api from '../../Services/Api';
import ItemsImage from '../../../assets/items.png';
import CasaProfileImage from '../../../assets/casaProfile.png';

import EquipamentosContext from '../../Contexts/Equipamentos';
import AppContext from '../../Contexts/App';

const RegisterEquipament = ({ show, handleChange }) => {
  const { addEquipamentPublic, locaisAdicionados } = useContext(
    EquipamentosContext
  );
  const { setLoading } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState('');

  const handleAddEquip = async () => {
    setLoading(true);
    const { status, data } = await Api.post('/mqtt/authenticate/code', {
      code: value,
      user_id: null,
    });

    if (status !== 200) {
      setLoading(false);
      Alert.alert('Atenção', 'Nenhum ambiente encontrado');
      setValue('');
      return false;
    }

    const checkExist = locaisAdicionados.filter((i) => i.id === data.id);

    if (checkExist.length > 0) {
      setLoading(false);
      Alert.alert('Atenção', 'Ambiente já está cadastrado');
      setValue('');
      return false;
    }

    addEquipamentPublic({
      ...data,
      icon: ItemsImage,
      background: CasaProfileImage,
    });

    setLoading(false);
    return Alert.alert('Sucesso', 'Ambiente adicionado com sucesso!', [
      {
        text: 'OK',
        onPress: () => {
          setValue('');
          setModalVisible(false);
        },
      },
    ]);
  };

  useEffect(() => {
    setModalVisible(show);
  }, [show]);
  useEffect(() => {
    if (value.length > 4) handleAddEquip();
  }, [value]);

  return (
    <Modal
      transparent
      avoidKeyboard
      isVisible={modalVisible}
      onSwipeComplete={() => handleChange(false)}
      swipeDirection="up"
    >
      <Container>
        <ContainerView>
          <TouchableWithoutFeedback onPress={() => handleChange(false)}>
            <ViewCloseContainer>
              <CloseItem>X</CloseItem>
            </ViewCloseContainer>
          </TouchableWithoutFeedback>
          <ViewVideo>
            <Text style={{ color: 'white' }}>VIDEO HERE</Text>
          </ViewVideo>
          <ViewSubContainer>
            <TitleCode>Código do equipamento</TitleCode>
            <InputCode
              placeholder="Digite o código..."
              value={value}
              onChangeText={setValue}
              keyboardType="numeric"
            />
          </ViewSubContainer>
        </ContainerView>
      </Container>
    </Modal>
  );
};

export default RegisterEquipament;
