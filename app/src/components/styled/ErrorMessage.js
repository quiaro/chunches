import styled from 'styled-components';

const ErrorMessage = styled.span`
  color: ${props => props.theme.status_error};
  font-size: 0.8rem;
`

export default ErrorMessage
