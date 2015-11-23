import h from 'react-hyperscript'
import React, { PropTypes, Component } from 'react'

const semanticThumbnails = ['default','self','nsfw']

export default class Posts extends Component {
  render() {
    var imagePosts = this.props.posts.filter((post) => !!imgForPost(post))
    return h('div', imagePosts.map((post, index) =>
      h('div.post-img', {
        key: index,
        onClick: () => window.open(post.url,'_blank'),
        style: {
          backgroundImage: `url("${imgForPost(post)}")`,
        },
      })
    ))
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

function imgForPost(post){
  if (post.post_hint === 'image') {
    return post.url
  } else if (post.media) {
    return post.media.oembed.thumbnail_url
  } else if (post.thumbnail && semanticThumbnails.indexOf(post.thumbnail) === -1) {
    return post.thumbnail
  // } else {
  //   return post.url
  }
}