import React from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import Badge from './Badge';
import { ITEM_REQUESTS_CONFIRMED } from '../queries/item_request';

const Styled = styled.button`
  position: relative;

  .material-icons {
    font-size: 26px;
    color: ${props => props.theme.nav_link_text};
  }
`;

const NavBarNotifications = props => {
  const {
    loadingItemRequestsConfirmed,
    itemRequestsConfirmed,
    className,
    onClick,
  } = props;

  if (loadingItemRequestsConfirmed) return null;

  return (
    <Styled className={className} onClick={onClick}>
      <Badge number={itemRequestsConfirmed.length} />
      <i className="material-icons">notifications</i>
    </Styled>
  );
};

export default graphql(ITEM_REQUESTS_CONFIRMED, {
  options: ({ user }) => ({
    variables: {
      uid: user.id,
    },
  }),
  props: ({ data: { loading, allItemRequests } }) => ({
    loadingItemRequestsConfirmed: loading,
    itemRequestsConfirmed: allItemRequests,
  }),
})(NavBarNotifications);
