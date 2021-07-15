/* eslint-disable camelcase */
/* eslint-disable no-undef */
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { wrapScrollView } from 'react-native-scroll-into-view';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Services/Api';
import SocketClient from '../../Services/Socket';

import AppContext from '../../Contexts/App';
import EquipmentContext from '../../Contexts/Equipamentos';

import AnimatedContainer from '../../Components/AnimatedView/Index';
import ImageMainBottom from '../../Components/Main/imageBottom';
import List from '../../Components/Lists/ListContainer';

import {
  Container,
  SubContainer,
  ListContainer,
  SubListContainer,
} from './styles';

import ItemsImage from '../../../assets/items.png';

const createTree = (list, parentId = null) => {
  const getBase = list.filter((i) => i.parent_id === parentId);
  return getBase.map((i) => ({
    ...i,
    icon: ItemsImage,
    nest: [...i.nest, ...createTree(list, i.id)],
  }));
};

const CustomScrollViewContainer = wrapScrollView(Container);

const Controller = ({ route }) => {
  const { item } = route.params;
  const { setSubList, subListType, setLoading } = useContext(AppContext);
  const { removeEquipmentPublic } = useContext(EquipmentContext);
  const navigation = useNavigation();

  const [controladores, setControladores] = useState({});
  const [activeValue, setActiveValue] = useState(0);
  const [activeSub, setActiveSub] = useState([]);
  const [activeSubComponent, setActiveSubComponent] = useState(false);
  const controladoresRef = useRef();

  controladoresRef.current = controladores;

  const changeVal = (variable_id, value, list) => {
    return list.map((i) => {
      if (i.id === variable_id && i.nest && i.nest.length > 0) {
        return { ...i, value };
      }
      if (i.nest && i.nest.length > 0)
        return { ...i, nest: changeVal(variable_id, value, i.nest) };
      return { ...i };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const headers = item.token
        ? { headers: { Authorization: `Bearer ${item.token}` } }
        : {};
      const { data, status } = await Api.get(`enviroments/${item.id}`, {
        ...headers,
      });
      setLoading(false);
      if (status !== 200) {
        if (status === 401) {
          removeEquipmentPublic(item);
          Alert.alert('Atenção!', 'Você não tem permissão para ver isto!');
        } else {
          Alert.alert(
            'Atenção!',
            'Ocorreu um erro na comunicação com a API, tente novamente mais tarde!'
          );
        }
        return navigation.navigate('Main');
      }
      return setControladores({
        ...data,
        controls: createTree(data.controls),
      });
    };
    fetchData();
    setSubList([]);

    SocketClient.on(
      `enviroment/${item.id}/new_value`,
      ({ value, variable_id }) => {
        const newControls = changeVal(
          variable_id,
          value,
          controladoresRef.current.controls
        );
        setControladores({
          ...controladoresRef.current,
          controls: newControls,
        });
      }
    );
  }, []);

  useEffect(() => {
    setActiveSubComponent(
      activeSub.length > 0 && (
        <SubListContainer>
          {activeSub.map((subItem, idx) => (
            <List
              key={Math.random().toString(36).substring(7)}
              items={subItem.nest}
              father={subItem}
              setItems={setControladores}
              isSubList
              level={idx + 1}
              type={subListType}
              activeValue={activeValue}
              setActiveValue={setActiveValue}
              activeSub={activeSub}
              setActiveSub={setActiveSub}
              token={item.token}
              enviromentId={item.id}
            />
          ))}
        </SubListContainer>
      )
    );
  }, [activeSub]);

  return (
    <AnimatedContainer info={item}>
      <CustomScrollViewContainer>
        <SubContainer>
          <>
            {controladores.controls && controladores.controls.length > 0 && (
              <ListContainer>
                <List
                  title="CONTROLES"
                  type="controls"
                  items={controladores.controls}
                  setItems={setControladores}
                  level={0}
                  activeSub={activeSub}
                  setActiveSub={setActiveSub}
                  token={item.token}
                  enviromentId={item.id}
                />
              </ListContainer>
            )}
            {subListType === 'controls' &&
              activeSub.length > 0 &&
              activeSubComponent}
          </>
          <ImageMainBottom />
        </SubContainer>
      </CustomScrollViewContainer>
    </AnimatedContainer>
  );
};

export default Controller;
