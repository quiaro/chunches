import styled from 'styled-components';

const FullContainer = styled.div`
  background-color: ${props => props.theme.background};
  height: 100vh;
  width: 100vw;

  > article {
    overflow: hidden;
  }
`

export default FullContainer
