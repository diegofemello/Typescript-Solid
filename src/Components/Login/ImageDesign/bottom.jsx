import React from 'react';
import { ImageDesignBottom } from './styles';

import ImageBottomDesign from '../../../../assets/imageBottomDesign.png';

const Bottom = () => {
  return (
    <ImageDesignBottom
      source={ImageBottomDesign}
      resizeMode="cover"
      style={{ maxHeight: 200 }}
    />
  );
};

export default React.memo(Bottom);
