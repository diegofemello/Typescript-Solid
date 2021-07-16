import React, { createContext, useState } from 'react';

import TvImage from '../../assets/tv.png';
import VolumeImage from '../../assets/volume.png';
import CanaisImage from '../../assets/canais.png';
import ItemsImage from '../../assets/items.png';
import LightImage from '../../assets/light.png';
import HmacImage from '../../assets/hmac.png';

const ControlsContext = createContext({
  controls: [],
  AtivedSubList: () => {},
  subListControlsAtived: [],
  controlsAtived: false,
  AtivedSubSubList: () => {},
  subSubControlsAtived: false,
});

export const ControlsProvider = ({ children }) => {
  const [controls, setControls] = useState([
    {
      id: '1',
      title: 'TV',
      image: TvImage,
      subTitleOption: true,
      subList: [
        {
          id: '1',
          image: VolumeImage,
          title: 'Volume',
          subTitleOption: true,
          atived: false,
          volume: [],
        },
        {
          id: '2',
          canais: [],
          title: 'Canais',
          image: CanaisImage,
          subTitleOption: true,
          atived: false,
        },
      ],
    },
    {
      id: '2',
      title: 'Sound',
      image: ItemsImage,
      subTitleOption: true,
      subList: [],
    },
    {
      id: '3',
      title: 'Light',
      image: LightImage,
      subTitleOption: true,
      subList: [],
    },
    {
      id: '4',
      title: 'Hmac',
      image: HmacImage,
      subTitleOption: true,
      subList: [],
    },
  ]);
  const [subSubControlsAtived, setSubSubControlsAtived] = useState(false);

  const [controlsAtived, setControlsAtived] = useState(false);
  const [subListControlsAtived, setSubListControlsAtived] = useState([]);
  const [AtualAtived, setAtualAtived] = useState('');

  function AtivedSubList(value) {
    const newData = controls.filter((res) => {
      if (res.id === value && value !== AtualAtived) {
        res.atived = true;
        setSubListControlsAtived(res.subList);
        setAtualAtived(value);
      } else {
        res.atived = false;
      }
      return res;
    });
    setControls(newData);
    if (value === AtualAtived && controlsAtived) {
      setControlsAtived(false);
      setSubListControlsAtived([]);
      setAtualAtived('');
      setSubSubControlsAtived(false);
    } else {
      setControlsAtived(true);
      setSubSubControlsAtived(false);
    }
  }

  function AtivedSubSubList() {
    return subSubControlsAtived
      ? setSubSubControlsAtived(false)
      : setSubSubControlsAtived(true);
  }

  return (
    <ControlsContext.Provider
      value={{
        controls,
        AtivedSubList: (id) => AtivedSubList(id),
        subListControlsAtived,
        controlsAtived,
        AtivedSubSubList: (id) => AtivedSubSubList(id),
        subSubControlsAtived,
      }}
    >
      {children}
    </ControlsContext.Provider>
  );
};
export default ControlsContext;
