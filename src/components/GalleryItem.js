import React from 'react';
import styled from 'styled-components';
import GalleryItemMain from './styled/GalleryItemMain';
import GalleryItemCTA from './styled/GalleryItemCTA';

const StyledGalleryItem = styled.button`
  position: relative;

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

  &:hover {
    .main {
      opacity: 0.6;
    }
    .cta {
      opacity: 1;
    }
  }
`

const GalleryItem = ({ item }) => (
  <StyledGalleryItem className="db center tc">
    <GalleryItemMain className="main" item={item} />
    <GalleryItemCTA className="cta" />
  </StyledGalleryItem>
)

export default GalleryItem
