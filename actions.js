import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

const MIN_POSTS = 100

export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  }
}

export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit
  }
}

function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit
  }
}

function receivePosts(reddit, posts) {
  return {
    type: RECEIVE_POSTS,
    reddit,
    posts: posts.map(post => post.data),
    receivedAt: Date.now()
  }
}

function fetchPosts(reddit) {
  var posts = []
  var lastPostName = ''

  return function(dispatch) {
    dispatch(requestPosts(reddit))
    return fetchPostBatch(reddit, dispatch)
  }

  function fetchPostBatch(reddit, dispatch) {
    return fetch(`https://www.reddit.com/r/${reddit}.json?after=${lastPostName}`)
      .then( req => req.json() )
      .then(function(json){
        if (!(json && json.data && json.data.children)) return dispatch(receivePosts(reddit, posts))
        posts = [].concat.call(posts, json.data.children)
        var lastPost = posts[posts.length-1]
        // abort if nothing new
        if (!lastPost || lastPostName === lastPost.data.name) return dispatch(receivePosts(reddit, posts))
        lastPostName = lastPost.data.name
        if (posts.length < MIN_POSTS) {
          return fetchPostBatch(reddit, dispatch)
        } else {
          return dispatch(receivePosts(reddit, posts))
        }
      })
  }

}



function shouldFetchPosts(state, reddit) {
  const posts = state.postsByReddit[reddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(reddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit))
    }
  }
}