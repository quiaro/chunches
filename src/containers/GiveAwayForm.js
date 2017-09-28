import React, { Component } from 'react';
import { gql, graphql, compose } from 'react-apollo';
import FileDropZone from '../components/styled/FileDropZone';
import ErrorHandler from '../common/ErrorHandler';
import { FILE_ENDPOINT } from '../constants';

class GiveAwayForm extends Component {
  state = {
    itemTitle: '',
    itemPosted: false,
    itemTags: '',
    itemImage: [],
    tags: new Map(),
  };

  onDrop(imageFiles) {
    this.setState({ itemImage: imageFiles });
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (!data.loading && data.allTags) {
      // Create a map of all the tags
      let tags = this.getTagsMap(data.allTags);
      this.setState({ tags: tags });
    }
  }

  getTagsMap(tagsArray) {
    // Save the tags in a map (to avoid duplication)
    let tags = tagsArray.map(tag => [tag.key, tag.id]);
    return new Map(tags);
  }

  postItem(type) {
    const { itemImage } = this.state;

    // prepare form data, use data key!
    let data = new FormData();
    data.append('data', itemImage[0]);

    this.postItemRequest(type, data)
      .then(res => {
        const variables = {
          imageId: res.imageId,
          itemId: res.itemId,
        }
        // Async calls:
        // - link image to item
        // - save tags for item
        this.props.setItemImage({ variables });
        this.postItemTags(res.itemId);

        // Clear state and show confirmation message
        this.setState({
          itemTitle: '',
          itemTags: '',
          itemImage: [],
          itemPosted: true,
        });

        setTimeout(() => {
          this.setState({
            itemPosted: false,
          });
        }, 3000);
      })
      .catch(e => ErrorHandler(e));
  }

  postItemRequest(type, data) {
    const { itemTitle } = this.state;
    const { uid } = this.props;

    const variables = {
      title: itemTitle,
      ownerId: uid,
      status: type,
    };

    // Simultaneously make calls to post item image and
    // create a new item for the user
    const postImage = fetch(FILE_ENDPOINT, {
      method: 'POST',
      body: data,
    });

    const createItem = this.props.createItem({ variables });

    return Promise.all([postImage, createItem]).then(values => {
      return values[0].json().then(image => {
        return {
          imageId: image.id,
          itemId: values[1].data.createItem.id
        }
      })
    });
  }

  postItemTags(itemId) {
    const { itemTags, tags } = this.state;
    let itemTagsArray = itemTags.split(',');
    itemTagsArray = itemTagsArray.map(tag => tag.trim());

    const tagsPromises = itemTagsArray.map(tag => {
      if (tags.has(tag)) {
        // tag already exists, add item to tag
        const variables = {
          tagId: tags.get(tag),
          itemId: itemId,
        };
        return this.props.updateTag({ variables });
      } else {
        // create tag and assign item to it
        const variables = {
          tag: tag,
          itemsIds: [itemId],
        };
        return this.props.createTag({ variables });
      }
    });

    Promise.all(tagsPromises).then(values => {
      // Refetch and recreate tags map
      this.props.data.refetch();
    });
  }

  render() {
    const { itemPosted, itemImage } = this.state;

    return (
      <div>
        <h3>Give Away Something</h3>
        <form>
          <input
            value={this.state.itemTitle}
            onChange={e => this.setState({ itemTitle: e.target.value })}
            type="text"
            placeholder="Item Name"
          />
          <input
            value={this.state.itemTags}
            onChange={e => this.setState({ itemTags: e.target.value })}
            type="text"
            placeholder="Item Tags"
          />

          <FileDropZone
            onDrop={this.onDrop.bind(this)}
            accept="image/*"
            className="dropzone"
            activeClassName="active-dropzone"
            multiple={false}
          >
            {itemImage.length === 0 &&
              <div className="hint">
                Drag and drop or click to select an image of your gift
              </div>}
            {itemImage.length > 0 &&
              <img src={itemImage[0].preview} alt={this.state.itemTitle} />}
          </FileDropZone>

          <button
            onClick={e => {
              e.preventDefault();
              this.postItem('FREE');
            }}
          >
            Post Gift
          </button>
          {itemPosted &&
            <span>Your gift is now available to all your friends</span>}
        </form>
      </div>
    );
  }
}

const ALL_TAGS_QUERY = gql`
  query {
    allTags(orderBy: key_ASC) {
      id
      key
    }
  }
`;

const CREATE_TAG_MUTATION = gql`
  mutation($tag: String!, $itemsIds: [ID!]) {
    createTag(key: $tag, itemsIds: $itemsIds) {
      id
      key
    }
  }
`;

const UPDATE_TAG_MUTATION = gql`
  mutation($tagId: ID!, $itemId: ID!) {
    addToItemTags(itemsItemId: $itemId, tagsTagId: $tagId) {
      itemsItem {
        id
        title
      }
      tagsTag {
        id
        key
      }
    }
  }
`;

const CREATE_ITEM_MUTATION = gql`
  mutation(
    $title: String!
    $ownerId: ID!
    $status: ItemStatus!
  ) {
    createItem(
      title: $title
      ownerId: $ownerId
      status: $status
    ) {
      id
    }
  }
`;

const SET_ITEM_IMAGE_MUTATION = gql`
  mutation($imageId: ID!, $itemId: ID!) {
    setItemImage(imageFileId: $imageId, itemItemId: $itemId) {
      imageFile {
        id
      }
      itemItem {
        id
      }
    }
  }
`

export default compose(
  graphql(ALL_TAGS_QUERY),
  graphql(CREATE_ITEM_MUTATION, { name: 'createItem' }),
  graphql(CREATE_TAG_MUTATION, { name: 'createTag' }),
  graphql(UPDATE_TAG_MUTATION, { name: 'updateTag' }),
  graphql(SET_ITEM_IMAGE_MUTATION, { name: 'setItemImage' }),
)(GiveAwayForm);
