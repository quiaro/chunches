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
      items {
        # Requests made by others for items owned by the current user
        requests {
          id
          createdAt
          item {
            title
            image {
              secret
            }
          }
          requester {
            name
          }
          status
        }
      }
      # Requests for items made by the user
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
