import React from 'react'
import SearchInput from '../components/SearchInput'
import Gallery from '../components/Gallery'

const OfferedItems = props => {
  const { user } = props.data;

  return (
    <div>
      <SearchInput></SearchInput>
      <Gallery user={user} className='flex nowrap'></Gallery>
    </div>
  )
}

export default OfferedItems
