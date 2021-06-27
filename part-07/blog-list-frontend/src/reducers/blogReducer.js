import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return (state = [...state, action.data])
    case 'INIT_BLOG':
      return action.data
    case 'LIKE': {
      return state.map((blog) =>
        blog.id === action.data.id ? { ...blog, likes: blog.likes + 1 } : blog
      )
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOG',
      data: blogs.sort((a, b) => {
        let keyA = a.likes
        let keyB = b.likes
        if (keyA < keyB) return 1
        if (keyA > keyB) return -1
        return 0
      })
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    const newBlog = await blogService.updateLikes(id)
    dispatch({
      type: 'LIKE',
      data: newBlog
    })
  }
}

export default blogReducer
