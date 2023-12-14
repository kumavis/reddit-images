import React from 'react'

const h = React.createElement;

const semanticThumbnails = ['default','self','nsfw']

export const Posts = ({ posts }) => {
  const imagePosts = posts
    .map((post) => imgForPost(post))
    .filter((postUrl) => postUrl)

  return (
    h('div', null, imagePosts.map((postUrl, index) =>
      h('div', {
        key: index,
        onClick: () => window.open(postUrl, '_blank'),
        style: {
          backgroundImage: `url("${postUrl}")`,
          display: 'inline-block',
          width: '200px',
          height: '200px',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        },
      })
    ))
  )
}

function imgForPost(post){
  const { url, post_hint, media, thumbnail } = post.data
  if (post_hint === 'image') {
    return url
  } else if (media?.oembed) {
    return media.oembed.thumbnail_url
  } else if (thumbnail && !semanticThumbnails.includes(thumbnail)) {
    return thumbnail
  }
}