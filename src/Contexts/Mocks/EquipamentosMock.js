import ItemsImage from '../../../assets/items.png';
import LightImage from '../../../assets/light.png';
import TemperatureImage from '../../../assets/temperature.png';

import PiscinaProfileImage from '../../../assets/piscinaProfile.png';
import BarProfileImage from '../../../assets/barProfile.png';

export const locaisAdicionados = [];

export const locaisProximos = [
  {
    id: 5,
    token: 'EQUIP005',
    name: 'Piscina',
    title: 'Local da Piscina',
    description: 'Descrição da piscina',
    icon: ItemsImage,
    background: PiscinaProfileImage,
  },
  {
    id: 6,
    token: 'EQUIP006',
    name: 'Bar',
    title: 'Local do Bar',
    description: 'Descrição do bar',
    icon: ItemsImage,
    background: BarProfileImage,
  },
];

export const meusEquipamentos = [];

export const minhasPreferencias = [
  {
    id: 4,
    token: 'PREF004',
    name: 'Luz',
    icon: LightImage,
    value: 1,
    nest: [
      {
        id: 7,
        token: 'VAL007',
        name: 'Ligado',
        icon: LightImage,
        value: 1,
        default: true,
      },
      {
        id: 8,
        token: 'VAL008',
        name: 'Desligado',
        icon: LightImage,
        value: 0,
      },
    ],
  },
  {
    id: 5,
    token: 'PREF005',
    name: 'Temperatura',
    icon: TemperatureImage,
    value: 2,
    nest: [
      {
        id: 9,
        token: 'VAL009',
        name: 'Desligado',
        icon: TemperatureImage,
        value: 0,
      },
      {
        id: 10,
        token: 'VAL010',
        name: '16º',
        icon: TemperatureImage,
        value: 1,
      },
      {
        id: 11,
        token: 'VAL011',
        name: '17º',
        icon: TemperatureImage,
        value: 2,
      },
      {
        id: 12,
        token: 'VAL012',
        name: '18º',
        icon: TemperatureImage,
        value: 3,
        default: true,
      },
    ],
  },
];
