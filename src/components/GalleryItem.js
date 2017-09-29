import React, { Component } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import GalleryItemMain from './styled/GalleryItemMain';
import GalleryItemCTA from './styled/GalleryItemCTA';

const StyledGalleryItem = styled.button`
  position: relative;

  .confirm {
    width: 200px;
    line-height: 1.5;
    display: inline-block;

    p {
      margin: 2rem 0 1rem 0;
    }
  }

  .content {
    .main {
      transition: opacity .15s ease-in;
    }
    .cta {
      opacity: 0;
      position: absolute;
      top: 40%;
      left: 0;
      width: 100%;
      transition: opacity .3s ease-in;
    }
  }

  &:hover {
    .main {
      opacity: 0.6;
    }
    .cta {
      opacity: 1;
    }
  }
`;

class GalleryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requested: false,
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState() {
    if (!this.state.requested) {
      // TODO: send request to server
      this.setState({ requested: true });
    } else {
      // Item has already been requested, next step is to remove it
      this.props.onRemove();
    }
  }

  render() {
    const { item } = this.props;
    const { requested, hidden } = this.state;
    const classes = classNames('db center tc', this.props.className, {
      requested: requested,
      hidden: hidden
    });

    return (
      <StyledGalleryItem className={classes} onClick={this.updateState}>
        {requested
          ? <div className="confirm">
              <p>A message has been sent to the owner to confirm availability.
              We'll get back in touch with you shortly.</p>
              <GalleryItemCTA>
                <em>OK</em>
              </GalleryItemCTA>
            </div>
          : <div className="content">
              <GalleryItemMain className="main" item={item} />
              <GalleryItemCTA className="cta">
                <em>Me sirve</em>
              </GalleryItemCTA>
            </div>}
      </StyledGalleryItem>
    );
  }
}

export default GalleryItem;
