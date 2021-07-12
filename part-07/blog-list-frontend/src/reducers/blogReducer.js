import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return (state = [...state, action.data])
    case 'LIKE': {
      const liked = action.data
      return state.map((blog) => (blog.id === liked.id ? liked : blog))
    }
    case 'COMMENT': {
      const commented = action.data
      return state.map((blog) => (blog.id === commented.id ? commented : blog))
    }
    case 'DELETE': {
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
      data: blogs
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
      type: 'DELETE',
      data: { id }
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const toLike = { ...blog, likes: blog.likes + 1 }
    const data = await blogService.update(toLike)
    dispatch({
      type: 'LIKE',
      data
    })
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    const blog = await blogService.createComment(id, { comment })
    dispatch({
      type: 'COMMENT',
      data: blog
    })
  }
}

export default blogReducer
