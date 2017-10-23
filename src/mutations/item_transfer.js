import { gql } from 'react-apollo';

export const UPDATE_ITEM_TRANSFER = gql`
  mutation(
    $id: ID!
    $date: DateTime!
    $method: TransferOption
    $requesterApproved: Boolean!
    $ownerApproved: Boolean!
  ) {
    updateItemTransfer(
      id: $id
      date: $date
      method: $method
      requesterApproved: $requesterApproved
      ownerApproved: $ownerApproved
    ) {
      id
    }
  }
`;
