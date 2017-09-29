import React from 'react'
import styled from 'styled-components'
import { IMAGE_ENDPOINT } from '../../common/constants'

const Styled = styled.div`
  position: relative;

  b {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 5px 0;
    background-color: black;
    color: white;
  }
`

const GalleryItemMain = ({ item, className }) => (
  <Styled className={className}>
    <img
      alt={item.title}
      src={`${IMAGE_ENDPOINT}/${item.image.secret}/200x`}
      width="200"
      height="200"
    />
    <b className="db mt2 f6 lh-copy">{item.title}</b>
  </Styled>
)

export default GalleryItemMain
