/* eslint-disable camelcase */
import React, { useEffect, useState, useRef } from 'react';
import { ScrollIntoView } from 'react-native-scroll-into-view';
import SocketClient from '../../Services/Socket';

import ListItemController from './ListItem/NewListItem';
import ListAddItem from './ListItem/ListAddItem';

import { Container, SubContainerScroll, SubContainer, Title } from './styles';

const ListContainer = ({
  title,
  items,
  isSubList,
  handleAdd,
  level,
  type,
  activeSub,
  setActiveSub,
  token,
  enviromentId,
  father,
}) => {
  const [openedItem, setOpenedItem] = useState(false);
  const [activeValue, setActiveValue] = useState(father && father.value);
  const activeValueRef = useRef();

  activeValueRef.current = activeValue;

  useEffect(() => {
    if (father) {
      SocketClient.on(
        `enviroment/${enviromentId}/new_value`,
        ({ value, variable_id }) => {
          if (variable_id === father.id) {
            setActiveValue(value);
          }
        }
      );
    }
  }, []);

  return (
    <Container subList={isSubList}>
      <ScrollIntoView enabled={isSubList}>
        {!isSubList && <Title>{title}</Title>}
        <SubContainerScroll horizontal showsHorizontalScrollIndicator={false}>
          <SubContainer>
            {items.map((item) => (
              <ListItemController
                key={Math.random().toString(36).substring(7)}
                item={item}
                level={level}
                type={type}
                openedItem={openedItem}
                activeSub={activeSub}
                setActiveSub={setActiveSub}
                activeValue={activeValue}
                setOpenedItem={setOpenedItem}
                equipmentToken={token}
                enviromentId={enviromentId}
                equipmentId={father && father.equipment_id}
              />
            ))}
            {handleAdd && <ListAddItem handleAdd={handleAdd} />}
          </SubContainer>
        </SubContainerScroll>
      </ScrollIntoView>
    </Container>
  );
};

export default ListContainer;
