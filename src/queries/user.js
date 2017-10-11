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
      incomingRequests {
        id
        requester {
          id
          name
        }
        item {
          id
          title
          image {
            secret
          }
        }
        status
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
