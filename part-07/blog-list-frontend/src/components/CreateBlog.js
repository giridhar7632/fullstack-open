import {
  Button,
  Container,
  CssBaseline,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core'
import React, { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: 'solid grey',
    borderRadius: '10px',
    padding: '5px',
    backgroundColor: 'lightGrey'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))
const CreateBlog = ({ handleCreateBlog }) => {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const clearStates = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography>Create new blog</Typography>

        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault()
            handleCreateBlog({
              title: title,
              author: author,
              url: url
            })
            clearStates()
          }}
        >
          <TextField
            variant='outlined'
            label='Title'
            autoFocus
            fullWidth
            margin='dense'
            value={title}
            id='title'
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />

          <TextField
            variant='outlined'
            label='Author'
            autoFocus
            fullWidth
            margin='dense'
            value={author}
            id='author'
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
          />

          <TextField
            variant='outlined'
            label='URL'
            autoFocus
            fullWidth
            margin='dense'
            value={url}
            id='url'
            name='url'
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button
            className={classes.submit}
            fullWidth
            variant='contained'
            color='primary'
            id='createButton'
            type='submit'
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default CreateBlog
