/* eslint-disable camelcase */
import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Api from '../../../Services/Api';
import SocketClient from '../../../Services/Socket';

import AppContext from '../../../Contexts/App';

import {
  TouchableWrapper,
  Container,
  SubContainer,
  Image,
  ContainerTitleItem,
  SubTitle,
  View,
  SubTitleButtonOption,
  IconOptionTitle,
} from './styles';

const NewListItem = ({
  item,
  enviromentId,
  equipmentId,
  equipmentToken,
  readonly,
  type,
  level,
  activeScene,
  openedItem,
  setOpenedItem,
  activeSub,
  setActiveSub,
  activeValue,
}) => {
  const { setLoading, subListType, setSubListType } = useContext(AppContext);
  const navigation = useNavigation();
  const [btnPressed, setBtnPressed] = useState(false);
  const [opened] = useState(item.id === openedItem && type === subListType);
  const [selected] = useState(
    item.value >= 0 && !item.nest && item.value === activeValue
  );
  const [label, setLabel] = useState(() => {
    let currentLabel = 'Desligado';
    if (item.nest && item.nest.length > 0) {
      const response = item.nest.filter((i) => i.value === item.value);
      if (response.length > 0) {
        currentLabel = response[0].name;
        if (response[0].nest && response[0].nest.length > 0) {
          currentLabel = 'Ligado';
        }
      }
    }

    if (type === 'scenes')
      currentLabel = item.id === activeScene ? 'Ligado' : 'Desligado';

    return currentLabel;
  });
  const handlePressIn = () => setBtnPressed(true);
  const handlePressOut = () => setBtnPressed(false);

  const openSubList = (value) => {
    if (item.nest && item.nest.length > 0 && type !== 'preferencias') {
      setSubListType(type);
      if (opened) {
        const newSubList = [...activeSub.splice(0, level)];
        setActiveSub(newSubList);
        setOpenedItem(false);
      } else {
        const newItem = {
          ...item,
          value,
        };
        const newSubList =
          activeSub[level] && activeSub[level].id === item.id
            ? [...activeSub.splice(0, level)]
            : [...activeSub.splice(0, level), newItem];
        setActiveSub(newSubList);
        setOpenedItem(item.id);
      }
    }
  };

  const handlePress = async () => {
    if (item.fastAction || type === 'preferencias') return false;

    if (!item.nest && level > 0) {
      if (activeSub[level - 1]) {
        const newValue = {
          id: activeSub[level - 1].id,
          value: item.value,
        };
        const variableDto = {
          equipment_id: equipmentId,
          variable_id: newValue.id,
          variable_code: activeSub[level - 1].var,
          enviroment_id: enviromentId,
          value: newValue.value,
        };
        const headers = equipmentToken
          ? { headers: { Authorization: `Bearer ${equipmentToken}` } }
          : {};
        const timeOutRequest = setTimeout(() => setLoading(true), 500);
        const { status, data } = await Api.post(
          '/mqtt/historic-values',
          {
            ...variableDto,
          },
          { ...headers }
        );
        clearTimeout(timeOutRequest);
        setLoading(false);
        if (status !== 204) {
          console.log('Mudança de valor erro', status, data, {
            ...variableDto,
          });
          return Alert.alert(
            'Atenção',
            'Houve um problema na comunicação com seu controlador. Verifique se o mesmo está ligado e se há conexão de internet no controlador e no seu dispositivo.'
          );
        }
        return console.log(
          'Mudança de valor com sucesso! Mudou para:',
          variableDto.value
        );
      }
      if (item.fast_action) {
        return false;
      }
      // return setActiveValue(item.value);
    }

    if (item.nest && item.nest.length > 0) {
      if (level === 0 || item.nest.length === 2) {
        const defaultValue = item.nest.filter((i) => i.default);
        if (defaultValue.length > 0) {
          const newValue = {
            id: item.id,
            value: item.value === '0' ? defaultValue[0].value : 0,
          };
          const variableDto = {
            equipment_id: equipmentId || item.equipment_id,
            variable_id: newValue.id,
            variable_code: item.var,
            enviroment_id: enviromentId,
            value: newValue.value.toString(),
          };
          const headers = equipmentToken
            ? { headers: { Authorization: `Bearer ${equipmentToken}` } }
            : {};
          const timeOutRequest = setTimeout(() => setLoading(true), 500);
          const { status, data } = await Api.post(
            '/mqtt/historic-values',
            {
              ...variableDto,
            },
            { ...headers }
          );
          clearTimeout(timeOutRequest);
          setLoading(false);
          if (status !== 204) {
            console.log('Mudança de valor rápido erro', status, data, {
              ...variableDto,
            });
            return Alert.alert(
              'Atenção',
              'Houve um problema na comunicação com seu controlador. Verifique se o mesmo está ligado e se há conexão de internet no controlador e no seu dispositivo.'
            );
          }
          return false;
        }
      }
      return false;
    }

    return navigation.navigate('Controller', { item });
  };

  useEffect(() => {
    if (level > 0) {
      SocketClient.on(
        `equipment/${equipmentId}/new_value`,
        ({ value, variable_id }) => {
          if (variable_id === item.id && item.nest && item.nest.length > 0) {
            let currentLabel = 'Desligado';
            const response = item.nest.filter((i) => i.value === value);
            if (response.length > 0) {
              currentLabel = response[0].name;
              if (response[0].nest && response[0].nest.length > 0) {
                currentLabel = 'Ligado';
              }
            }

            setLabel(currentLabel);
          }
        }
      );
    }
  }, []);

  return (
    <TouchableWrapper
      delayLongPress={200}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={
        item.nest && item.nest.length > 0
          ? () => openSubList(item.value)
          : handlePress
      }
      onLongPress={handlePress}
    >
      <Container readonly={readonly} btnPressed={btnPressed}>
        <SubContainer opened={opened} readonly={readonly}>
          <Image source={item.icon} />
          <SubTitle>{item.name}</SubTitle>
          <ContainerTitleItem>
            <View>
              <SubTitleButtonOption>{item.nest && label}</SubTitleButtonOption>
            </View>
            {item.nest && item.nest.length > 0 && (
              <IconOptionTitle>
                <AntDesign
                  name={opened ? 'down' : 'up'}
                  size={18}
                  color="#A7518A"
                />
              </IconOptionTitle>
            )}
          </ContainerTitleItem>
        </SubContainer>
      </Container>
    </TouchableWrapper>
  );
};

export default React.memo(NewListItem);
