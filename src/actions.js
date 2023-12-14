const MIN_POSTS = 100

export async function queryPosts (subreddit, count = MIN_POSTS) {
  const posts = await queryPostsSingle(subreddit)
  while (posts.length < count) {
    const lastPost = posts[posts.length-1]
    const morePosts = await queryPostsSingle(subreddit, lastPost.data.name)
    posts.push(...morePosts)
  }
  return posts
}

export async function queryPostsSingle (subreddit, lastPostName = '') {
  const req = await fetch(`https://www.reddit.com/r/${subreddit}.json?after=${lastPostName}`)
  const json = await req.json()
  if (!(json && json.data && json.data.children)) {
    throw new Error('no posts')
  }
  const posts = json.data.children
  return posts
}
