import { gql } from 'react-apollo';

export const ITEM_REQUESTS_PENDING = gql`
  query ItemRequestsPending($uid: ID!) {
    allItemRequests(
      filter: { AND: [{ owner: { id: $uid } }, { status: PENDING }] }
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
  query ItemRequestsAccepted($uid: ID!) {
    allItemRequests(
      filter: { AND: [{ requester: { id: $uid } }, { status: ACCEPTED }] }
    ) {
      id
      owner {
        id
        name
      }
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
      transfer {
        id
        date
        method
      }
    }
  }
`;

export const ITEM_REQUESTS_DENIED = gql`
  query ItemRequestsDenied($uid: ID!) {
    allItemRequests(
      filter: { AND: [{ requester: { id: $uid } }, { status: DENIED }] }
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

export const ITEM_REQUESTS_CANCELLED = gql`
  query ItemRequestsCancelled($uid: ID!) {
    allItemRequests(
      filter: { AND: [{ requester: { id: $uid } }, { status: CANCEL }] }
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

export const ITEM_REQUESTS_TRANSFER = gql`
  query itemRequestsTransfer($uid: ID!) {
    allItemRequests(
      filter: {
        OR: [
          {
            AND: [
              { status: TRANSFER }
              { requester: { id: $uid } }
              { transfer: { requesterApproved: false } }
            ]
          }
          {
            AND: [
              { status: TRANSFER }
              { owner: { id: $uid } }
              { transfer: { ownerApproved: false } }
            ]
          }
        ]
      }
    ) {
      id
      owner {
        id
        name
      }
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
      transfer {
        id
        date
        method
      }
    }
  }
`;

export const ITEM_REQUESTS_CONFIRMED = gql`
  query itemRequestsConfirmed($uid: ID!) {
    allItemRequests(
      filter: {
        OR: [
          {
            AND: [
              { status: TRANSFER }
              { transfer: { requesterApproved: true } }
              { transfer: { ownerApproved: true } }
              { OR: [{ requester: { id: $uid } }, { owner: { id: $uid } }] }
            ]
          }
        ]
      }
    ) {
      id
      owner {
        id
        name
      }
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
      transfer {
        id
        date
        method
      }
    }
  }
`;
