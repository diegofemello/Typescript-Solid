import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../Contexts/App';

import ListContainer from './ListContainer';

import { SubListContainer } from './styles';

const NestedList = (props) => {
  const { type, token } = props;
  const { subListType, subList } = useContext(AppContext);
  const [subListComponent, setSubListComponent] = useState(false);

  useEffect(() => {
    setSubListComponent(
      subList.length > 0 && type === subListType && (
        <SubListContainer>
          {subList.map((item, idx) => (
            <ListContainer
              key={Math.random().toString(36).substring(7)}
              items={item.nest}
              isSubList
              level={idx + 1}
              type={type}
              token={token}
            />
          ))}
        </SubListContainer>
      )
    );
  }, [subList]);

  return (
    <>
      <ListContainer {...props} level={0} />
      {subListComponent}
    </>
  );
};

export default NestedList;
