import React from 'react';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Alert } from 'react-native';
import { ViewButtonProfile, IconButtonProfile } from './styles';
import UserImage from '../../../assets/user.png';

const Bottoms = ({ titleOption1, titleOption2, onPressLogout }) => {
  return (
    <ViewButtonProfile>
      <Menu>
        <MenuTrigger>
          <IconButtonProfile source={UserImage} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption
            style={{ height: 40, justifyContent: 'center' }}
            onSelect={() => Alert.alert('', 'Configurações')}
            text={titleOption1}
          />
          <MenuOption
            style={{ height: 40, justifyContent: 'center' }}
            text={titleOption2}
            onSelect={onPressLogout}
          />
        </MenuOptions>
      </Menu>
    </ViewButtonProfile>
  );
};

export default Bottoms;
