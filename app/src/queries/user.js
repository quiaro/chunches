import { gql } from 'react-apollo';

const CURRENT_USER = gql`
  query CurrentUser($uid: ID!) {
    User(id: $uid) {
      id
      name,
      email,
      pursuer {
        id
      }
      pursued {
        id
      }
      outgoingRequests {
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
