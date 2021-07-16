import React, { createContext, useState } from 'react';

import ItemsImage from '../../assets/items.png';
import OffImage from '../../assets/off.png';
import RelaxImage from '../../assets/relax.png';
import SleepImage from '../../assets/sleep.png';
import TemperatureImage from '../../assets/temperature.png';
import EnergyImage from '../../assets/energy.png';
import LightImage from '../../assets/light.png';
import TvImage from '../../assets/tv.png';
import PerturbeImage from '../../assets/pertube.png';

const EquipamentosContext = createContext({
  locaisAdicionados: [],
  locaisProximos: [],
  scenes: [],
  services: [],
  status: [],
  meusLocais: [],
  preferencias: [],
  setPreferencia: () => {},
  preferencyAtived: false,
  subListPreferencyAtived: [],
  FindEquipament: () => {},
});

export const EquipamentosProvider = ({ children }) => {
  const [locaisAdd] = useState([]);
  const [subListActive, setSubListActive] = useState(0);
  const [listActive, setListActive] = useState(0);
  const [locaisProx] = useState([
    {
      id: '1',
      title: 'Piscina',
      image: ItemsImage,
      subTitle: '',
    },
    {
      id: '2',
      title: 'Bar',
      image: ItemsImage,
      subTitle: '',
    },
  ]);
  const [scenes] = useState([
    {
      id: '3',
      title: 'Master Off',
      image: OffImage,
      subTitleOption: true,
      subList: [
        { id: '1', title: 'Ligado', image: OffImage, atived: false },
        { id: '2', title: 'Desligado', image: OffImage, atived: true },
      ],
    },
    {
      id: '4',
      title: 'Relax',
      image: RelaxImage,
      subTitleOption: true,
      subList: [
        { id: '1', title: 'Ligado', image: RelaxImage, atived: false },
        { id: '2', title: 'Desligado', image: RelaxImage, atived: true },
      ],
    },
    {
      id: '5',
      title: 'Sleep',
      image: SleepImage,
      subTitleOption: true,
      subList: [
        { id: '1', title: 'Ligado', image: SleepImage, atived: false },
        { id: '2', title: 'Desligado', image: SleepImage, atived: true },
      ],
    },
  ]);
  const [services] = useState([
    {
      id: '8',
      title: 'Não pertube',
      image: PerturbeImage,
      subTitleOption: true,
      atived: false,
      subList: [
        { id: '3', title: '5 minutos', image: PerturbeImage, atived: false },
        { id: '4', title: '30 minutos', image: PerturbeImage, atived: false },
        { id: '5', title: '1 hora', image: PerturbeImage, atived: false },
        { id: '6', title: '3 horas', image: PerturbeImage, atived: false },
      ],
    },
  ]);
  const [status] = useState([
    {
      id: '9',
      title: 'Temperatura',
      image: TemperatureImage,
      subTitle: '12Cº',
    },
    {
      id: '2',
      title: 'Energia',
      image: EnergyImage,
      subTitle: '150W',
    },
  ]);
  const [meusLocais] = useState([
    {
      id: '1',
      title: 'Quarto 1',
      image: ItemsImage,
      subTitle: 'Texto',
    },
    {
      id: '2',
      title: 'Quarto 2',
      image: ItemsImage,
      subTitle: 'Texto',
    },
    {
      id: '3',
      title: 'Quarto 3',
      image: ItemsImage,
      subTitle: 'Texto',
    },
  ]);
  const [preferencia, setPreferencia] = useState([
    {
      id: '1',
      title: 'Luz',
      image: LightImage,
      subTitleOption: true,
      atived: false,
      subList: [
        { id: '1', title: 'Ligado', image: LightImage, atived: true },
        { id: '2', title: 'Desligado', image: LightImage, atived: false },
      ],
    },
    {
      id: '2',
      title: 'Temperatura',
      image: TemperatureImage,
      subTitleOption: true,
      atived: false,
      subList: [
        { id: '3', title: '12º', image: TemperatureImage, atived: true },
        { id: '4', title: '13º', image: TemperatureImage, atived: false },
        { id: '5', title: '14º', image: TemperatureImage, atived: false },
        { id: '6', title: '15º', image: TemperatureImage, atived: false },
      ],
    },
    {
      id: '3',
      title: 'TV',
      image: TvImage,
      subTitleOption: true,
      atived: false,
      subList: [
        { id: '3', title: 'Canal 1', image: TvImage, atived: false },
        { id: '4', title: 'Canal 2', image: TvImage, atived: false },
        { id: '5', title: 'Canal 3', image: TvImage, atived: false },
        { id: '6', title: 'Canal 4', image: TvImage, atived: true },
      ],
    },
  ]);
  const [preferencyAtived, setPreferency] = useState(false);
  const [subListPreferencyAtived, setSubListPreferencyAtived] = useState([]);
  const [AtualAtived, setAtualAtived] = useState('');

  function AtivedSubList(value) {
    const newData = preferencia.filter((res) => {
      if (res.id === value && value !== AtualAtived) {
        res.atived = true;
        setSubListPreferencyAtived(res.subList);
        setAtualAtived(value);
      } else {
        res.atived = false;
      }
      return res;
    });
    setPreferencia(newData);
    if (value === AtualAtived && preferencyAtived) {
      setPreferency(false);
      setSubListPreferencyAtived([]);
      setAtualAtived('');
    } else {
      setPreferency(true);
    }
  }
  function FindEquipament(code) {
    if (code === '') {
      return false;
    }
    return true;
  }
  return (
    <EquipamentosContext.Provider
      value={{
        locaisAdicionados: locaisAdd,
        locaisProximos: locaisProx,
        scenes,
        services,
        status,
        meusLocais,
        subListActive,
        setSubListActive,
        listActive,
        setListActive,
        preferencias: preferencia,
        setPreferencia: (value) => AtivedSubList(value),
        preferencyAtived,
        subListPreferencyAtived,
        FindEquipament,
      }}
    >
      {children}
    </EquipamentosContext.Provider>
  );
};
export default EquipamentosContext;
