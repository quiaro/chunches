import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.theme.button_background};
  color: ${props => props.theme.button_text};
  border: 0 none;
  cursor: pointer;
`

export default Button
