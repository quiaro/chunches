import React from 'react'
import styled from 'styled-components'

const Styled = styled.div`
  text-align: center;

  em {
    display: inline-block;
    background-color: black;
    color: white;
    padding: 0.5rem 1rem;
    border: 3px solid white;
    font-style: normal;
  }
`

const GalleryItemMain = ({ className, children }) => (
  <Styled className={className}>
    {children}
  </Styled>
)

export default GalleryItemMain
