import h from 'react-hyperscript'
import React, { PropTypes, Component } from 'react'

export default class Posts extends Component {
  render() {
    var imagePosts = this.props.posts.filter((post) => !!post.post_hint)
    return h('div', imagePosts.map((post, index) =>
      h('div', {
        key: index,
        onClick: () => window.open(post.url,'_blank'),
        style: {
          width: '200px',
          height: '200px',
          backgroundImage: `url("${imgForPost(post)}")`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          display: 'inline-block',
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
  } else {
    return post.thumbnail
  }
}