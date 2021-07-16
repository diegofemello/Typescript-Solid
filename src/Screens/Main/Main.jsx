import React, { useContext, useState, useEffect } from 'react';
import { wrapScrollView } from 'react-native-scroll-into-view';
import AsyncStorage from '@react-native-community/async-storage';

import EquipamentosContext from '../../Contexts/Equipamentos';
import UserContext from '../../Contexts/User';
import AppContext from '../../Contexts/App';

import AnimatedContainer from '../../Components/AnimatedView/Index';
import ImageMainBottom from '../../Components/Main/imageBottom';
import List from '../../Components/Lists/NestedList';
import ModalRegisterPublic from '../RegisterEquipament/RegisterPublic';
import ModalRegisterOwn from '../RegisterEquipament/RegisterOwn';

import ItemsImage from '../../../assets/items.png';
import CasaProfileImage from '../../../assets/casaProfile.png';
import ConceitoImage from '../../../assets/conceito.png';

import { Wrapper, Container, SubContainer, ListContainer } from './styles';

const CustomScrollViewContainer = wrapScrollView(Container);

const mockLista = {
  name: 'Lista de Ambientes',
  description: 'Descrição da lista de ambientes',
  background: ConceitoImage,
};

const Main = () => {
  const {
    locaisAdicionados,
    locaisProximos,
    meusEquipamentos,
    minhasPreferencias,
    createEquipmentsPublic,
    createEquipmentsPrivate,
  } = useContext(EquipamentosContext);
  const { setLoading } = useContext(AppContext);
  const { isLogged, userAtual } = useContext(UserContext);
  const [modalPublic, setModalPublic] = useState(false);
  const [modalOwn, setModalOwn] = useState(false);
  const [locaisAdicionadosState, setLocaisAdicionadosState] = useState(
    locaisAdicionados
  );
  const [locaisProximosState, setLocaisProximosState] = useState(
    locaisProximos
  );
  const [meusEquipamentosState, setMeusEquipamentosState] = useState(
    meusEquipamentos
  );
  const [minhasPreferenciasState, setMinhasPreferenciasState] = useState(
    minhasPreferencias
  );

  useEffect(() => {
    setLocaisAdicionadosState(locaisAdicionados);
  }, [locaisAdicionados]);
  useEffect(() => {
    setLocaisProximosState(locaisProximos);
  }, [locaisProximos]);
  useEffect(() => {
    setMeusEquipamentosState(meusEquipamentos);
  }, [meusEquipamentos]);
  useEffect(() => {
    setMinhasPreferenciasState(minhasPreferencias);
  }, [minhasPreferencias]);

  useEffect(() => {
    const createEquipments = async () => {
      setLoading(true);
      let equipmentsPublic = await AsyncStorage.getItem(
        '@sii_universe/equipments'
      );
      equipmentsPublic = equipmentsPublic ? JSON.parse(equipmentsPublic) : [];

      createEquipmentsPublic(equipmentsPublic);

      if (isLogged) {
        createEquipmentsPrivate(
          userAtual.enviroments.map((i) => ({
            ...i,
            icon: ItemsImage,
            background: CasaProfileImage,
          }))
        );
      }
      setLoading(false);
    };
    createEquipments();
  }, []);

  return (
    <Wrapper>
      <AnimatedContainer info={mockLista} hideBack>
        <CustomScrollViewContainer>
          <SubContainer>
            <ListContainer>
              <List
                title="LOCAIS ADICIONADOS"
                type="locais-adicionados"
                items={locaisAdicionadosState}
                handleAdd={setModalPublic}
              />
            </ListContainer>
            {locaisProximosState.length > 0 && (
              <ListContainer>
                <List
                  title="LOCAIS PRÓXIMOS"
                  type="locais-proximos"
                  items={locaisProximosState}
                />
              </ListContainer>
            )}
            {isLogged && (
              <>
                <ListContainer>
                  <List
                    title="MEUS AMBIENTES"
                    type="meus-equipamentos"
                    items={meusEquipamentosState}
                    handleAdd={setModalOwn}
                  />
                </ListContainer>
                {minhasPreferenciasState.length > 0 && (
                  <ListContainer>
                    <List
                      title="PREFERÊNCIAS"
                      type="preferencias"
                      items={minhasPreferenciasState}
                    />
                  </ListContainer>
                )}
              </>
            )}

            <ModalRegisterPublic
              show={modalPublic}
              handleChange={setModalPublic}
            />
            <ModalRegisterOwn show={modalOwn} handleChange={setModalOwn} />

            <ImageMainBottom />
          </SubContainer>
        </CustomScrollViewContainer>
      </AnimatedContainer>
    </Wrapper>
  );
};

export default Main;
