import React from 'react';
import { ImageDesignTop } from './styles';

import MainTopImage from '../../../assets/mainTop.png';

const initialVideo = () => {
  return <ImageDesignTop source={MainTopImage} resizeMode="cover" />;
};

export default initialVideo;
