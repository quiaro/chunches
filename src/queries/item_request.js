import { gql } from 'react-apollo';

export const ITEM_REQUESTS_PENDING = gql`
  query($uid: ID!) {
    allItemRequests(
      filter: {
        AND: [
          { owner: { id: $uid } }
          { OR: [{ status: PENDING }, { status: PENDING_ACK }] }
        ]
      }
    ) {
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
  }
`;

export const ITEM_REQUESTS_ACCEPTED = gql`
  query($uid: ID!) {
    allItemRequests(
      filter: {
        AND: [
          { requester: { id: $uid } }
          { OR: [{ status: ACCEPTED }, { status: ACCEPTED_ACK }] }
        ]
      }
    ) {
      id
      owner {
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
  }
`;

export const ITEM_REQUESTS_DENIED = gql`
  query($uid: ID!) {
    allItemRequests(
      filter: {
        AND: [
          { requester: { id: $uid } }
          { OR: [{ status: DENIED }, { status: DENIED_ACK }] }
        ]
      }
    ) {
      id
      item {
        id
        title
        image {
          secret
        }
      }
      status
    }
  }
`;
