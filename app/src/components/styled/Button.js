import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.theme.button_background};
  color: ${props => props.theme.button_text};
  border: 0 none;
  cursor: pointer;
  padding: 6px 12px;
  margin: 0 5px;
`

export default Button
