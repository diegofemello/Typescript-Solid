/* eslint-disable camelcase */
import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const ControladoresContext = createContext({
  addControlador: () => {},
  getControladoresByEquip: [],
  changeAttrValue: () => {},
  changeScene: () => {},
  createControladores: () => {},
});

export const ControladoresProvider = ({ children }) => {
  const [controladores, setControladores] = useState([]);

  const addControlador = async (newControlador) => {
    const newControladores = [...controladores, newControlador];
    await AsyncStorage.setItem(
      '@sii_universe/controllers',
      JSON.stringify(newControladores)
    );
    setControladores(newControladores);
  };

  const createControladores = async (controllers) => {
    setControladores(controllers);
  };

  const getControladoresByEquip = (equipId) => {
    const response = controladores.filter(
      (i) => i.equipament_id === equipId
    )[0];
    return response;
  };

  const remapValues = (attrId, value, list) =>
    list.map((i) => {
      if (i.id === attrId) {
        return { ...i, value };
      }
      if (i.nest) return { ...i, nest: remapValues(attrId, value, i.nest) };
      return i;
    });

  const changeAttrValue = (equipId, attrId, value, type) => {
    // console.log(equipId, attrId, value, type);
    const newControladores = controladores.map((i) => {
      if (i.equipament_id === equipId) {
        if (i[type]) {
          const newType = remapValues(attrId, value, i[type]);
          const newItem = { ...i };
          newItem[type] = newType;
          return newItem;
        }
      }
      return i;
    });
    setControladores(newControladores);
  };

  const changeScene = (equipId, sceneId) => {
    const newControladores = controladores.map((i) => {
      if (i.equipament_id === equipId) {
        if (i.scenes) {
          const newScenes = i.scenes.map((scene) => {
            const newValue = sceneId === scene.id ? 1 : 0;
            return {
              ...scene,
              value: newValue,
            };
          });
          const newItem = { ...i };
          newItem.scenes = newScenes;
          return newItem;
        }
      }
      return i;
    });
    setControladores(newControladores);
  };

  return (
    <ControladoresContext.Provider
      value={{
        addControlador,
        getControladoresByEquip,
        changeAttrValue,
        changeScene,
        createControladores,
      }}
    >
      {children}
    </ControladoresContext.Provider>
  );
};
export default ControladoresContext;
