import React from 'react'
import { debounceAsync, queryPosts } from '../actions.js'
import { Picker } from '../components/Picker.js'
import { Posts } from '../components/Posts.js'

const h = React.createElement
const debounceQueryPosts = debounceAsync(200, queryPosts)

const useAsync = (asyncFunction, deps) => {
  const [value, setValue] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    let shouldAbort = false
    ;(async (...args) => {
      try {
        setValue(null)
        setLoading(true)
        const response = await asyncFunction(...args)
        if (shouldAbort) return
        setValue(response)
        setLoading(false)
      } catch (err) {
        if (shouldAbort) return
        setError(err)
      }
    })()
    return () => {
      shouldAbort = true
    }
  }, deps)

  return { loading, value, error }
}

export const App = () => {
  const [selectedReddit, setSelectedReddit] = React.useState('pics')
  const { value: posts, loading, error } = useAsync(async () => {
    return debounceQueryPosts(selectedReddit)
  }, [selectedReddit])

  return (
    h('div', null, [
      h(Picker, {
        value: selectedReddit,
        onChange: setSelectedReddit,
      }),
      loading && h('h2', null, 'Loading...'),
      !loading && posts && posts.length === 0 && h('h2', null, 'Empty.'),
      posts && posts.length > 0 && (
        h('div', {
          style: { opacity: loading ? 0.5 : 1 }
        }, [
          h(Posts, { posts }),
        ])
      ),
    ])
  )
}
