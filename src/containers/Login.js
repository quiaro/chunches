import React, { Component } from 'react'
import { gql, graphql, compose } from 'react-apollo'
import FullContainer from '../components/styled/FullContainer'
import ModalHeader from '../components/styled/ModalHeader'
import Button from '../components/styled/Button'
import Anchor from '../components/styled/Anchor'
import { GC_USER, GC_USER_ID, GC_AUTH_TOKEN } from '../constants'

class Login extends Component {

  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: ''
  }

  render() {

    return (
      <FullContainer className='pv5'>
        <article className='center bg-white mw5 mw6-ns br3 ba b--black-30 shadow-2'>

          <ModalHeader className='f4 br--top white mv0 pa3 shadow-4'>
            {this.state.login ? 'Login' : 'Sign Up'}
          </ModalHeader>

          <main className="ph3 pt2 pb4 black-60">
            <form className="measure center">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                {!this.state.login &&

                <div className="mt3 f6">
                  <label className="db fw6 lh-copy" htmlFor="user-name">Name</label>
                  <input
                    id="user-name"
                    className="pa2 input-reset ba b--black-60 bg-transparent w-100"
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                    type='text'
                    placeholder='Your name'
                  />
                </div>
                }

                <div className="mt3 f6">
                  <label className="db fw6 lh-copy" htmlFor="email-address">Email</label>
                  <input
                    id="email-address"
                    className="pa2 input-reset ba b--black-60 bg-transparent w-100"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    type='email'
                    placeholder='Your email address'
                  />
                </div>

                <div className="mv3 f6">
                  <label className="db fw6 lh-copy" htmlFor="password">Password</label>
                  <input
                    className="pa2 input-reset ba b--black-60 bg-transparent w-100"
                    id="password"
                    value={this.state.password}
                    onChange={(e) => this.setState({ password: e.target.value })}
                    type='password'
                    placeholder='Choose a safe password'
                  />
                </div>
                <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
              </fieldset>

              <div>
                <Button
                  className='f6 link dim ph3 pv2 mb2 dib white bg-black mr3'
                  onClick={(e) => { e.preventDefault(); this._confirm() }}
                >
                  {this.state.login ? 'Login' : 'Create account' }
                </Button>
              </div>
              <div className="lh-copy mt3">
                <Anchor
                  className='f6 link underline-hover dim db'
                  onClick={(e) => { e.preventDefault(); this.setState({ login: !this.state.login })} }
                >
                  {this.state.login ? 'Need to create an account?' : 'Already have an account?'}
                </Anchor>
                <Anchor href="#0" className="f6 link underline-hover dim db">Forgot your password?</Anchor>
              </div>
            </form>
          </main>
        </article>
      </FullContainer>
    )
  }

  _confirm = async () => {
    const { name, email, password } = this.state

    if (this.state.login) {
      const result = await this.props.signinUserMutation({
        variables: {
          email,
          password
        }
      })
      const user = result.data.signinUser.user
      const token = result.data.signinUser.token
      this._saveUserData(user, token)
    } else {
      const result = await this.props.createUserMutation({
        variables: {
          name,
          email,
          password
        }
      })
      const user = result.data.signinUser.user
      const token = result.data.signinUser.token

      this._saveUserData(user, token)
    }

    this.props.history.push(`/`)
  }

  _saveUserData = (user, token) => {
    localStorage.setItem(GC_USER, JSON.stringify(user))
    localStorage.setItem(GC_USER_ID, user.id)
    localStorage.setItem(GC_AUTH_TOKEN, token)
  }
}

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
    createUser(
      name: $name,
      authProvider: {
        email: {
          email: $email,
          password: $password
        }
      }
    ) {
      id
    }

    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id,
        name,
        email,
        pursuer {
          id
        }
        pursued {
          id
        }
      }
    }
  }
`

const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id,
        name,
        email,
        pursuer {
          id
        }
        pursued {
          id
        }
      }
    }
  }
`

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })
)(Login)
