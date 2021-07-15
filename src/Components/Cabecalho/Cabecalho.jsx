import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ContainerCabecalho,
  ViewButtonsTop,
  SubContainerCabecalho,
  TitleDescriptionCabecalho,
  ButtonContainer,
  TitleDescriptionType,
} from './styles';
import UserContext from '../../Contexts/User';

import ButtonSignin from '../Bottoms/ButtonSigninHeader';
import ButtonHeaderRight from '../Bottoms/ButtonProfileHeader';

const MainLogout = ({ info, hideBack }) => {
  const { isLogged, LogoutUser } = useContext(UserContext);
  const navigation = useNavigation();

  const handleBack = () => navigation.navigate('Main');

  return (
    <LinearGradient colors={['#A7518A', '#A7518A', '#B9E2F3']}>
      <ContainerCabecalho source={info.background} resizeMode="cover">
        <ViewButtonsTop>
          <AntDesign
            size={30}
            name="left"
            color="#F9F9F9"
            onPress={handleBack}
            style={{ opacity: hideBack ? 0 : 1 }}
          />
          {isLogged ? (
            <ButtonHeaderRight
              titleOption1="Informações"
              titleOption2="Sair"
              onPressLogout={LogoutUser}
            />
          ) : (
            <ButtonContainer>
              <ButtonSignin
                onPressConfig={() => navigation.navigate('Login')}
              />
            </ButtonContainer>
          )}
        </ViewButtonsTop>
        <SubContainerCabecalho>
          <TitleDescriptionCabecalho>
            {info.description}
          </TitleDescriptionCabecalho>
          <TitleDescriptionType>{info.name}</TitleDescriptionType>
        </SubContainerCabecalho>
      </ContainerCabecalho>
    </LinearGradient>
  );
};

export default MainLogout;
