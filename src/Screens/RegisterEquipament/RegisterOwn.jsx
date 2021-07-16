import React, { useState, useEffect, useContext } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import {
  Container,
  ContainerView,
  ViewCloseContainer,
  CloseItem,
} from './styles';

import ControladoresContext from '../../Contexts/Controladores';
import EquipamentosContext from '../../Contexts/Equipamentos';

import Page1 from './RegisterOwnPages/Page1';
import Page2 from './RegisterOwnPages/Page2';
import Page3 from './RegisterOwnPages/Page3';
import Page4 from './RegisterOwnPages/Page4';

const RegisterOwn = ({ show, handleChange }) => {
  const { addControlador } = useContext(ControladoresContext);
  const { addEquipamentPrivate } = useContext(EquipamentosContext);

  const [modalPage, setModalPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddEquipament = () => {
    const newEquip = addEquipamentPrivate();
    addControlador(newEquip);
  };

  useEffect(() => {
    setModalVisible(show);
  }, [show]);

  return (
    <Modal
      transparent
      avoidKeyboard
      isVisible={modalVisible}
      onShow={() => setModalPage(1)}
      onSwipeComplete={() => handleChange(false)}
      swipeDirection={modalPage < 3 ? 'up' : null}
    >
      <Container>
        <ContainerView>
          {modalPage < 3 && (
            <TouchableWithoutFeedback onPress={() => handleChange(false)}>
              <ViewCloseContainer>
                <CloseItem>X</CloseItem>
              </ViewCloseContainer>
            </TouchableWithoutFeedback>
          )}
          {modalPage === 1 && (
            <Page1
              show={show}
              modalPage={modalPage}
              setModalVisible={setModalVisible}
              setModalPage={setModalPage}
            />
          )}
          {modalPage === 2 && <Page2 setModalPage={setModalPage} />}
          {modalPage === 3 && <Page3 setModalPage={setModalPage} />}
          {modalPage === 4 && (
            <Page4
              setModalVisible={setModalVisible}
              handleAddEquipament={handleAddEquipament}
            />
          )}
        </ContainerView>
      </Container>
    </Modal>
  );
};

export default RegisterOwn;
