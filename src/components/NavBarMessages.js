import React from 'react';
import styled from 'styled-components';
import Badge from './Badge';

const Styled = styled.button`
  position: relative;

  .material-icons {
    font-size: 26px;
    color: ${props => props.theme.nav_link_text};
  }
`;

const NavBarMessages = ({ user, className, onToggle }) => {
  const itemRequests = user.items
    .filter(item => item.requests.length > 0)
    .map(item => item.requests)
    .reduce((a, b) => a.concat(b), []) // concat all item requests together
    .filter(itemRequest => itemRequest.status === 'PENDING');

  return (
    <Styled className={ className } onClick={ onToggle }>
      <Badge number={itemRequests.length} />
      <i className="material-icons">notifications</i>
    </Styled>
  );
};

export default NavBarMessages;
