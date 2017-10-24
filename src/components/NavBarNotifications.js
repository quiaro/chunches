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

const NavBarMessages = (props) => {

  const {
    className,
    onClick
  } = props;

  return (
    <Styled className={className} onClick={onClick}>
      <Badge number={3} />
      <i className="material-icons">notifications</i>
    </Styled>
  );
}

export default NavBarMessages;
