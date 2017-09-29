import React from 'react';
import styled from 'styled-components';

const StyledGalleryItem = styled.button`

`

const GalleryItem = ({ item }) => (
  <StyledGalleryItem className="db center tc black link dim">
    <img
      className="ba b--black-10"
      alt={item.title}
      src={`https://images.graph.cool/v1/cj7gdhdwb02te01141lbxk8vo/${item
        .image.secret}/200x`}
      width="200"
      height="200"
    />

    <b className="db mt2 f6 lh-copy">
      {item.title}
    </b>
    <span className="f6 link dim ba ph3 pv2 mb2 mt2 db white bg-dark-blue">
      Me sirve
    </span>
  </StyledGalleryItem>
)



export default GalleryItem
