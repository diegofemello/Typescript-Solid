import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native';
import * as Styles from './styles';

import EquipamentosContext from '../../../Contexts/EquipamentosOld';

const Itemcomponent = ({
  fatherId,
  fatherTitle,
  item,
  atived,
  readonly,
  uri,
  imageTitle,
  title,
  subTitle,
  subTitleOption,
  handleOpen,
  isValue,
}) => {
  const {
    subListActive,
    setSubListActive,
    preferencias,
    setPreferencia,
  } = useContext(EquipamentosContext);
  const navigation = useNavigation();

  const [pressed, setPressed] = useState(false);
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState('Desligado');

  const handlePress = () => {
    if (subTitleOption) {
      const newState = !open;
      setSubListActive(subListActive !== item.id ? item.id : 0);
      return handleOpen(newState, item);
    }

    if (isValue) {
      if (fatherTitle === 'PREFERÊNCIAS') {
        const newPref = preferencias.map((i) => {
          if (i.id === fatherId) {
            const newSub = i.subList.map((sub) =>
              sub.id === item.id
                ? { ...sub, atived: true }
                : { ...sub, atived: false }
            );
            return { ...i, subList: newSub };
          }
          return i;
        });
        setPreferencia(newPref);
        setLabel('new Label');
      }
      return false;
    }

    return navigation.navigate('Profile');
  };

  useEffect(() => {
    const newState = subListActive === item.id;
    setOpen(newState);
    setPressed(newState);
  }, [subListActive]);

  useEffect(() => {
    if (subTitleOption) {
      if (item.subList && item.subList.length > 0) {
        const check = item.subList.filter(
          (i) => i.atived && i.title !== 'Desligado'
        );
        if (check.length > 0) {
          setLabel(check[0].title);
          if (check[0].title === 'Ligado') {
            setActive(true);
          }
        }
      }
    }
  }, [item]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Styles.Container readonly={readonly}>
        <Styles.SubContainer
          readonly={readonly}
          pressed={pressed}
          atived={subTitleOption ? active : atived}
        >
          <Styles.ViewOptions>
            {uri ? (
              <Styles.ImageItems source={uri} resizeMode="contain" />
            ) : (
              <Styles.TextVolume>{imageTitle}</Styles.TextVolume>
            )}
            <Styles.TitleButtonOption>{title}</Styles.TitleButtonOption>
          </Styles.ViewOptions>
          {subTitle !== '' ? (
            <Styles.SubTitle>{subTitle}</Styles.SubTitle>
          ) : null}
          {subTitleOption ? (
            <Styles.ContainerViewTitleItem
              activeOpacity={0.9}
              onPress={handlePress}
            >
              <Styles.View>
                {active ? (
                  <Styles.SubTitleButtonOption>
                    {label}
                  </Styles.SubTitleButtonOption>
                ) : (
                  <Styles.SubTitleOptionDesatived>
                    {label}
                  </Styles.SubTitleOptionDesatived>
                )}
              </Styles.View>
              <Styles.IconOptionTitle>
                {open ? (
                  <AntDesign name="up" size={18} color="#A7518A" />
                ) : (
                  <AntDesign name="down" size={18} color="#A7518A" />
                )}
              </Styles.IconOptionTitle>
            </Styles.ContainerViewTitleItem>
          ) : null}
        </Styles.SubContainer>
      </Styles.Container>
    </TouchableWithoutFeedback>
  );
};

export default Itemcomponent;
