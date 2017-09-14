import React, { Component } from 'react'
import { gql, withApollo } from 'react-apollo'
import Dropzone from 'react-dropzone'
import { GC_USER_ID } from '../constants'

import '../styles/GiveAwayForm.css';

class GiveAwayForm extends Component {

  componentDidMount() {
    this.loadAllTags();
  }

  state = {
    itemTitle: '',
    itemPosted: false,
    itemTags: '',
    itemImage: [],
    tags: new Map()
  }

  onDrop(imageFiles) {
    this.setState({ itemImage: imageFiles })
  }

  async loadAllTags() {
    const result = await this.props.client.query({
      query: ALL_TAGS_QUERY
    })
    let tags = result.data.allTags.map(tag => [tag.key, tag.id]);
    tags = new Map(tags);
    this.setState({ tags: tags });
  }

  postFreeItem() {
    const { itemTitle, itemTags, itemImage, tags } = this.state;
    let itemTagsArray = itemTags.split(',');
    itemTagsArray = itemTagsArray.map(tag => tag.trim());

    // prepare form data, use data key!
    let data = new FormData()
    data.append('data', itemImage[0])

    // use the file endpoint
    fetch('https://api.graph.cool/file/v1/cj7gdhdwb02te01141lbxk8vo', {
      method: 'POST',
      body: data
    }).then(response => {
      return response.json()
    }).then(image => {

      // Create new free item for user
      this.props.client.mutate({
        mutation: CREATE_ITEM_MUTATION,
        variables: {
          title: itemTitle,
          ownerId: localStorage.getItem(GC_USER_ID),
          status: 'FREE',
          imageId: image.id
        }
      }).then(result => {
        const itemId = result.data.createItem.id;

        // Show confirmation message
        this.setState({
          itemTitle: '',
          itemTags: '',
          itemImage: [],
          itemPosted: true
        });

        setTimeout(() => {
          this.setState({
            itemPosted: false
          });
        }, 3000);

        const tagsPromises = itemTagsArray.map(tag => {
          if (tags.has(tag)) {
            // tag already exists; return a resolved promise
            return Promise.resolve(true);
          } else {
            return this.props.client.mutate({
              mutation: CREATE_TAG_MUTATION,
              variables: {
                tag: tag,
                itemsIds: [ itemId ],
              }
            });
          }
        })

        Promise.all(tagsPromises).then((values) => {
          console.log('Tags were resolved: ', values);
        });
      })
    })
  }

  render() {

    const { itemPosted, itemImage } = this.state;

    return (
      <div>
        <h3>Give Away Something</h3>
        <form>
          <input
            value={this.state.itemTitle}
            onChange={ (e) => this.setState({ itemTitle: e.target.value }) }
            type='text'
            placeholder="Item Name"
          />
          <input
            value={this.state.itemTags}
            onChange={ (e) => this.setState({ itemTags: e.target.value }) }
            type='text'
            placeholder="Item Tags"
          />

          <Dropzone onDrop={ this.onDrop.bind(this) }
                    accept='image/*'
                    className='dropzone'
                    activeClassName='active-dropzone'
                    multiple={false}>
            {itemImage.length === 0 &&
              <div className="hint">Drag and drop or click to select an image of your gift</div> }
            {itemImage.length > 0 &&
              <img src={itemImage[0].preview} alt={this.state.itemTitle} /> }
          </Dropzone>

          <button onClick={ (e) => {
            e.preventDefault();
            this.postFreeItem()
          } }>Post Gift</button>
          { itemPosted &&
            <span>Your gift is now available to all your friends</span>
          }
        </form>
      </div>
    )
  }
}

const ALL_TAGS_QUERY = gql`
  query AllTags {
    allTags(orderBy: key_ASC) {
      id
      key
    }
  }
`

const CREATE_TAG_MUTATION = gql`
  mutation CreateTagMutation ($tag: String!, $itemsIds: [ID!]) {
    createTag(
      key: $tag,
      itemsIds: $itemsIds
    ) {
      id
      key
    }
  }
`

const CREATE_ITEM_MUTATION = gql`
  mutation CreateItemMutation ($title: String!, $ownerId: ID!, $status: ItemStatus!, $imageId: ID!) {
    createItem(
      title: $title,
      ownerId: $ownerId,
      status: $status,
      imageId: $imageId
    ) {
      id
    }
  }
`

export default withApollo(GiveAwayForm)
