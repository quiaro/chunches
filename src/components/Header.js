import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {

  render() {

    return (
      <div className='flex bb pa3 justify-between nowrap'>
        <div className='flex flex-fixed'>
          <Link to='/de-otros' className='no-underline black'>Chunches de Otros</Link>
          <div className='ml1'>|</div>
          <Link to='/mios' className='ml1 no-underline black'>Mis Chunches</Link>
          <div className='ml1'>|</div>
          <Link to='/regalar' className='ml1 no-underline black'>Regalar</Link>
          <div className='ml1'>|</div>
          <Link to='/prestar' className='ml1 no-underline black'>Prestar</Link>
          <div className='ml1'>|</div>
          <Link to='/mios' className='ml1 no-underline black'>Mi Red</Link>
        </div>
        <div className='flex flex-fixed'>
          <Link to='/perfil' className='ml1 no-underline black'>Mi Perfil</Link>
          <Link to='/prestar' className='ml1 no-underline black'>Mensajes</Link>
        </div>
      </div>
    )
  }

}

export default withRouter(Header)
