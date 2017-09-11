import React from 'react'
import { Link } from 'react-router-dom'

const PublicAppBar = ({ history }) => (
  <div className="_header flex justify-between nowrap bg-dark-blue">
    <div className="logo">
      {/* TODO */}
      App Logo Here!
    </div>
    <div>
      <Link to="/login">Log In</Link>
    </div>
  </div>
)

export default PublicAppBar;
