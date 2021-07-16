import React, { useContext, useEffect, useState } from 'react';

import { useFonts } from 'expo-font';

import Auth from './Auth';
import LoggedScreens from './LoggedScreens';

import UserContext from '../Contexts/User';

import SegoeUi from '../../assets/fonts/segoe-ui.otf';

export default function Index() {
  const [render, setRender] = useState(false);
  const { isLogged, checkUser } = useContext(UserContext);
  const [loaded] = useFonts({
    segoe: SegoeUi,
  });

  useEffect(() => {
    const fetchData = async () => {
      await checkUser();
      setRender(true);
    };
    fetchData();
  }, []);

  if (!loaded || !render) {
    return <></>;
  }
  return isLogged ? <LoggedScreens /> : <Auth />;
}
