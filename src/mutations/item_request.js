import { gql } from 'react-apollo';

export const UPDATE_ITEM_REQUEST_STATUS = gql`
  mutation($id: ID!, $status: ItemRequestStatus!) {
    updateItemRequest(id: $id, status: $status) {
      id
    }
  }
`;
