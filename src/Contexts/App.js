import React, { createContext, useState } from 'react';

import Loading from '../Components/Loading/Loading';

const AppContext = createContext({
  loading: false,
  setLoading: () => {},
  subList: [],
  setSubList: () => {},
  subListValue: false,
  setSubListValue: () => {},
  subListType: '',
  sceneActive: false,
  setSceneActive: () => {},
  setSubListType: () => {},
  checkActiveList: () => {},
  changeSubListValue: () => {},
  newAttrValue: false,
  setNewAttrValue: () => {},
});

export const AppProvider = ({ children }) => {
  const [subListType, setSubListType] = useState('');
  const [subList, setSubList] = useState([]);
  const [subListValue, setSubListValue] = useState(false);
  const [sceneActive, setSceneActive] = useState(false);
  const [newAttrValue, setNewAttrValue] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkActiveList = (item) => {
    return subList.filter((i) => i.id === item.id).length > 0;
  };

  const changeSubListValue = (item, value) => {
    const newSubList = subList.map((i) => {
      return i.id === item.id ? { ...i, value } : i;
    });
    setSubList(newSubList);
  };

  return (
    <>
      <AppContext.Provider
        value={{
          loading,
          setLoading,
          subListType,
          setSubListType,
          subList,
          setSubList,
          subListValue,
          setSubListValue,
          sceneActive,
          setSceneActive,
          checkActiveList,
          changeSubListValue,
          newAttrValue,
          setNewAttrValue,
        }}
      >
        {children}
      </AppContext.Provider>
      {loading && <Loading />}
    </>
  );
};
export default AppContext;
