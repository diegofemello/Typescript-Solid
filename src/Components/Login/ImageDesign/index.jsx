import React from 'react';
import { ImageDesignTop, IconLogo } from './styles';

import ImageTopDesign from '../../../../assets/imageTopDesign.png';
import Icon from '../../../../assets/icon.png';

const Header = () => {
  return (
    <>
      <ImageDesignTop
        source={ImageTopDesign}
        resizeMode="cover"
        style={{ maxHeight: 200 }}
      />
      <IconLogo source={Icon} resizeMode="contain" />
    </>
  );
};

export default Header;
