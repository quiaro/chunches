import styled from 'styled-components';

const SearchInput = styled.div`
  position: relative;
  max-width: 500px;
  width: 60%;
  margin: 0 auto;

  > i {
    position: absolute;
    top: 1.4rem;
    left: 1rem;
  }

  > input {
    padding-left: 4rem;
    width: 100%;

    &:focus, &:active {
       outline: 0 none;
    }
  }
`

export default SearchInput
