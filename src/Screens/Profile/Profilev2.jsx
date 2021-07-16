import React, { useContext } from 'react';
import { Alert } from 'react-native';
import { Container, SubContainer } from './styles';

import Cabecalho from '../../Components/Cabecalho/Cabecalho';
import ButtonSignin from '../../Components/Bottoms/ButtonSigninHeader';
import Lists from '../../Components/Lists/listOptions';
import SubList from '../../Components/Lists/List';
import ImageMainBottom from '../../Components/Main/imageBottom';
import EquipamentosContext from '../../Contexts/Equipamentos';
import ControlsContext from '../../Contexts/Controls';
import UserContext from '../../Contexts/User';

import CasaProfileImage from '../../../assets/casaProfile.png';

const mockAmbiente = {
  name: 'Quarto do Hotel',
  description:
    'Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
  image: CasaProfileImage,
};

const Profile = (props) => {
  const { scenes, services, status } = useContext(EquipamentosContext);
  const { LogoutUser, isLogged } = useContext(UserContext);
  const {
    controls,
    subListControlsAtived,
    controlsAtived,
    AtivedSubList,
    AtivedSubSubList,
    subSubControlsAtived,
  } = useContext(ControlsContext);

  return (
    <Container>
      <SubContainer>
        <Cabecalho
          info={mockAmbiente}
          goBack={() => props.navigation.goBack()}
          onPressLogout={LogoutUser}
          isLogged={isLogged}
          ButtonConfig={
            <ButtonSignin
              onPressConfig={() => props.navigation.navigate('Login')}
            />
          }
        />
        <Lists title="SCENE" data={scenes} onPressAtived={() => {}} />
        {controls.length > 0 && (
          <Lists
            title="CONTROLS"
            data={controls}
            onPressAtived={(id) => AtivedSubList(id)}
          />
        )}

        {controlsAtived ? (
          <SubList
            data={subListControlsAtived}
            onPressAtived={(id) => AtivedSubSubList(id)}
          />
        ) : null}

        {subSubControlsAtived ? (
          <SubList
            data={[
              { id: '1', title: 'Canal', imageTitle: '1' },
              { id: '2', title: 'Canal', imageTitle: '2' },
            ]}
            onPressAtived={(id) => Alert.alert('Ops!', JSON.stringify(id))}
          />
        ) : null}

        {status.length > 0 && (
          <Lists
            readonly
            title="STATUS"
            data={status}
            onPressAtived={() => {}}
          />
        )}
        {services.length > 0 && (
          <Lists title="SERVICE" data={services} onPressAtived={() => {}} />
        )}
        <ImageMainBottom />
      </SubContainer>
    </Container>
  );
};

export default Profile;
