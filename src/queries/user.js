import { gql } from 'react-apollo';

const USER_QUERY = gql`
  query {
    user {
      id
      name,
      email,
      pursuer {
        id
      }
      pursued {
        id
      }
    }
  }
`;

export default USER_QUERY
