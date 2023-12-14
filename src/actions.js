const MIN_POSTS = 100

export function debounceAsync(wait, func) {
  let timeout;
  let resolveList = [];
  let rejectList = [];

  return function(...args) {
    return new Promise((resolve, reject) => {
      const later = async () => {
        timeout = null;
        try {
          const result = await func.apply(this, args);
          resolveList.forEach(res => res(result));
        } catch (error) {
          rejectList.forEach(rej => rej(error));
        } finally {
          resolveList = [];
          rejectList = [];
        }
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      resolveList.push(resolve);
      rejectList.push(reject);
    });
  };
}

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
