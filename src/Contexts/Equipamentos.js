import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const EquipamentosContext = createContext({
  locaisAdicionados: [],
  setLocaisAdicionados: () => {},
  addEquipamentPublic: () => {},
  removeEquipmentPublic: () => {},
  addEquipamentPrivate: () => {},
  locaisProximos: [],
  meusEquipamentos: [],
  minhasPreferencias: [],
  changePreferencia: () => {},
  changeSubListShow: () => {},
  activeMenu: [],
  setActiveMenu: () => {},
  subListItems: [],
  setSubListItems: () => {},
  createEquipmentsPrivate: () => {},
  createEquipmentsPublic: () => {},
});

export const EquipamentosProvider = ({ children }) => {
  const [locaisAdicionados, setLocaisAdicionados] = useState([]);
  const [locaisProximos] = useState([]);
  const [meusEquipamentos, setMeusEquipamentos] = useState([]);
  const [minhasPreferencias, setMinhasPreferencias] = useState([]);
  const [activeMenu, setActiveMenu] = useState([]);
  const [subListItems, setSubListItems] = useState([]);

  const addEquipamentPublic = async (newEquip) => {
    const newLocaisAdicionados = [...locaisAdicionados, newEquip];
    await AsyncStorage.setItem(
      '@sii_universe/equipments',
      JSON.stringify(newLocaisAdicionados)
    );
    return setLocaisAdicionados(newLocaisAdicionados);
  };

  const addEquipamentPrivate = async (newEquipamento) => {
    const newMesEquipamentos = [...meusEquipamentos, newEquipamento];
    setMeusEquipamentos(newMesEquipamentos);
    return newEquipamento;
  };

  const removeEquipmentPublic = async (equipment) => {
    const newLocaisAdicionados = locaisAdicionados.filter(
      (i) => i.id !== equipment.id
    );
    await AsyncStorage.setItem(
      '@sii_universe/equipments',
      JSON.stringify(newLocaisAdicionados)
    );
    return setLocaisAdicionados(newLocaisAdicionados);
  };

  const createEquipmentsPublic = async (equipments) => {
    setLocaisAdicionados(equipments);
  };
  const createEquipmentsPrivate = async (equipments) => {
    setMeusEquipamentos(equipments);
  };

  const changeValue = (id, value, list = minhasPreferencias) => {
    return list.map((preferencia) => {
      if (preferencia.id === id) return { ...preferencia, value };
      if (preferencia.nest && preferencia.nest.length > 0)
        return {
          ...preferencia,
          nest: changeValue(id, value, preferencia.nest),
        };
      return preferencia;
    });
  };

  const handleShowSubList = (id, opened, list = minhasPreferencias) => {
    return list.map((preferencia) => {
      if (preferencia.id === id) return { ...preferencia, opened };
      if (preferencia.nest && preferencia.nest.length > 0)
        return {
          ...preferencia,
          nest: handleShowSubList(id, opened, preferencia.nest),
        };
      return { ...preferencia };
    });
  };

  const changePreferencia = (id, value) => {
    const newPreferencias = changeValue(id, value);
    setMinhasPreferencias(newPreferencias);
  };

  const changeSubListShow = (id, opened) => {
    const newPreferencias = handleShowSubList(id, opened);
    setMinhasPreferencias(newPreferencias);
  };

  return (
    <EquipamentosContext.Provider
      value={{
        locaisAdicionados,
        addEquipamentPublic,
        removeEquipmentPublic,
        addEquipamentPrivate,
        setLocaisAdicionados,
        locaisProximos,
        meusEquipamentos,
        minhasPreferencias,
        changePreferencia,
        changeSubListShow,
        activeMenu,
        setActiveMenu,
        subListItems,
        setSubListItems,
        createEquipmentsPrivate,
        createEquipmentsPublic,
      }}
    >
      {children}
    </EquipamentosContext.Provider>
  );
};
export default EquipamentosContext;
