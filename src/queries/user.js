import { gql } from 'react-apollo';

const CURRENT_USER = gql`
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
      requests {
        id
        item {
          id
        }
        status
      }
    }
  }
`;

export default CURRENT_USER
