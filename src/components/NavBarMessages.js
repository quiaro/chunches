import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import Badge from './Badge';
import {
  ITEM_REQUESTS_PENDING,
  ITEM_REQUESTS_ACCEPTED,
  ITEM_REQUESTS_DENIED,
  ITEM_REQUESTS_TRANSFER,
} from '../queries/item_request';

const Styled = styled.button`
  position: relative;

  .material-icons {
    font-size: 26px;
    color: ${props => props.theme.nav_link_text};
  }
`;

const NavBarMessages = (props) => {

  const {
    loadingItemRequestsPending,
    loadingItemRequestsAccepted,
    loadingItemRequestsDenied,
    loadingItemRequestsTransfer,
    itemRequestsPending,
    itemRequestsAccepted,
    itemRequestsDenied,
    itemRequestsTransfer,
    className,
    onClick
  } = props;

  if (
    loadingItemRequestsPending ||
    loadingItemRequestsAccepted ||
    loadingItemRequestsDenied ||
    loadingItemRequestsTransfer
  )
    return null;

  const unresolved = [].concat(
    itemRequestsPending,
    itemRequestsAccepted,
    itemRequestsDenied,
    itemRequestsTransfer,
  );

  return (
    <Styled className={className} onClick={onClick}>
      <Badge number={unresolved.length} />
      <i className="material-icons">notifications</i>
    </Styled>
  );
}

export default compose(
  graphql(ITEM_REQUESTS_PENDING, {
    options: ({ user }) => ({
      variables: {
        uid: user.id,
      },
    }),
    props: ({ data: { loading, allItemRequests } }) => ({
      loadingItemRequestsPending: loading,
      itemRequestsPending: allItemRequests,
    }),
  }),
  graphql(ITEM_REQUESTS_ACCEPTED, {
    options: ({ user }) => ({
      variables: {
        uid: user.id,
      },
    }),
    props: ({ data: { loading, allItemRequests } }) => ({
      loadingItemRequestsAccepted: loading,
      itemRequestsAccepted: allItemRequests,
    }),
  }),
  graphql(ITEM_REQUESTS_DENIED, {
    options: ({ user }) => ({
      variables: {
        uid: user.id,
      },
    }),
    props: ({ data: { loading, allItemRequests } }) => ({
      loadingItemRequestsDenied: loading,
      itemRequestsDenied: allItemRequests,
    }),
  }),
  graphql(ITEM_REQUESTS_TRANSFER, {
    options: ({ user }) => ({
      variables: {
        uid: user.id,
      },
    }),
    props: ({ data: { loading, allItemRequests } }) => ({
      loadingItemRequestsTransfer: loading,
      itemRequestsTransfer: allItemRequests,
    }),
  }),
)(NavBarMessages);
