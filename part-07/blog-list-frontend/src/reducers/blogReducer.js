import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return (state = [...state, action.data])
    case 'INIT_BLOGS':
      return action.data
    case 'UPDATE_BLOG': {
      const updatedBlog = action.data
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    }
    case 'DELETE_BLOG': {
      const id = action.data.id
      return state.filter((blog) => blog.id !== id)
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

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: { id }
    })
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    const newBlog = await blogService.updateLikes(id)
    dispatch({
      type: 'UPDATE_BLOG',
      data: newBlog
    })
  }
}

export const createComment = (id, comment) => {
  return async (dispatch) => {
    const blog = await blogService.createComment(id, { comment })
    dispatch({
      type: 'UPDATE_BLOG',
      data: blog
    })
  }
}

export default blogReducer
