import React, { Component } from 'react'
import { gql, graphql, compose, withApollo } from 'react-apollo'
import { debounce } from '../common/utils'
import ErrorHandler from '../common/ErrorHandler';
import { GC_USER_ID } from '../constants'

class TradeRequestForm extends Component {

  constructor(props) {
    super(props);
    this.lookupUser = debounce(this.lookupUser, 100).bind(this);
  }

  state = {
    userName: '',
    userList: [],
    tradeRequestSent: false,
  }

  lookupUser = (uid, userName) => {
    // Reset user list before updating with new results
    this.setState({ userList: [] });

    if (uid && userName && userName.length > 3) {
      // Find users matching the user name
      this.props.client.query({
        query: ALL_USERS_SEARCH_QUERY,
        variables: {
          uid: uid,
          searchText: userName
        }
      }).then(res => {
        this.setState({ userList: res.data.allUsers})
      }).catch(e => ErrorHandler(e))
    }
  }

  sendTradeRequest = (uid, user) => {
    const variables = {
      pursuerId: uid,
      pursuedId: user.id
    };

    this.props.createTradeRequest({ variables })
      .then(result => {
        console.log('Trade request sent: ', result.data);

        this.setState({
          userName: '',
          userList: [],
          tradeRequestSent: true
        });

        setTimeout(() => {
          this.setState({ tradeRequestSent: false });
        }, 3000);
      })
      .catch(e => ErrorHandler(e));
  }

  render() {

    const { uid } = this.props;
    const { userName, userList, tradeRequestSent } = this.state;

    return (
      <div>
        <h3>Find a friend</h3>
        <form>
          <input
            value={this.state.userName}
            onChange={ (e) => {
              const userName = e.target.value;
              this.setState({ userName });
              this.lookupUser(uid, userName);
            } }
            type='text'
            placeholder="Your Friend's Name"
          />
        </form>
        { userName && userName.length > 3 && userList.length > 0 &&
          userList.map((user) => (
            <div key={user.id}>
              <span>{user.name}</span>
              <button onClick={ () => this.sendTradeRequest(uid, user) }>Connect</button>
            </div>
          ))
        }
        { tradeRequestSent &&
          <div>
            <span>Contact request sent!</span>
          </div>
        }
      </div>
    )
  }
}

const ALL_USERS_SEARCH_QUERY = gql`
  query ($uid: ID!, $searchText: String!) {
    allUsers(filter: {
      AND: [{
        id_not: $uid
      }, {
        name_contains: $searchText
      }]
    }) {
      id
      name
    }
  }
`

const CREATE_TRADE_REQUEST_MUTATION = gql`
  mutation ($pursuerId: ID!, $pursuedId: ID!) {
    createTradeRequest(
      pursuerId: $pursuerId,
      pursuedId: $pursuedId,
      status: PENDING
    ) {
      id
    }
  }
`

export default compose(
  graphql(CREATE_TRADE_REQUEST_MUTATION, { name: 'createTradeRequest' }),
  withApollo
)(TradeRequestForm)
