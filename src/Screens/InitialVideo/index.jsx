import React, { useState, useContext, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import EquipamentosContext from '../../Contexts/Equipamentos';
import AppContext from '../../Contexts/App';
import Api from '../../Services/Api';

import { Container } from './styles';
import ImageDesignBottom from '../../Components/initialVideo/imageBottom';
import ImageDesignTop from '../../Components/initialVideo/imageTop';
import ButtonLoginInitial from '../../Components/Bottoms/ButtonLoginInitial';
import VideoComponent from '../../Components/initialVideo/video';
import ItemsImage from '../../../assets/items.png';
import CasaProfileImage from '../../../assets/casaProfile.png';

const InitialVideo = (props) => {
  const { navigation } = props;
  const { setLoading } = useContext(AppContext);
  const { addEquipamentPublic } = useContext(EquipamentosContext);
  const [code, setCode] = useState('');
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const handleAddEquip = async () => {
    setLoading(true);
    const { status, data } = await Api.post('/mqtt/authenticate/code', {
      code,
      user_id: null,
    });

    if (status !== 200) {
      if (status === 404) {
        setLoading(false);
        Alert.alert('Atenção', 'Nenhum ambiente encontrado');
        setCode('');
        return false;
      }
      setLoading(false);
      Alert.alert('Atenção', 'Houve um erro de comunicação com a API.');
      setCode('');
      return false;
    }

    addEquipamentPublic({
      ...data,
      icon: ItemsImage,
      background: CasaProfileImage,
    });

    setLoading(false);
    return Alert.alert('Sucesso', 'Ambiente adicionado com sucesso!', [
      {
        text: 'OK',
        onPress: () => {
          setCode('');
          navigation.navigate('Main');
        },
      },
    ]);
  };

  useEffect(() => {
    if (code.length > 5) handleAddEquip();
  }, [code]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
    Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', () => setKeyboardOpen(true));
      Keyboard.removeListener('keyboardDidHide', () => setKeyboardOpen(false));
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      <Container>
        <ImageDesignTop />
        <ButtonLoginInitial
          title="Entrar"
          onPress={() => navigation.navigate('Login')}
        />
        <VideoComponent
          doneCode={() => {}}
          value={code}
          onChangeText={(text) => setCode(text)}
        />
      </Container>
      {!keyboardOpen && <ImageDesignBottom />}
    </KeyboardAvoidingView>
  );
};

export default InitialVideo;
