import React from 'react';
import styled from 'styled-components';

const Styled = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: ${props => props.theme.badge_background};
  color: ${props => props.theme.badge_text};
  font-size: 0.7rem;
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 50%;
  line-height: 1.2rem;
  text-align: center;
`;

const Badge = ({ number }) => {
  return number
    ? <Styled>
        {number}
      </Styled>
    : null;
};

export default Badge;
