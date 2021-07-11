import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles({
  card: {
    display: 'flex',
    margin: '5px 5px 10px 5px',
    background: 'lightGrey',
    textAlign: 'center',
    width: '100%'
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  }
})

const Blog = ({ blog }) => {
  const classes = useStyles()
  return (
    <Grid item lg={12} md={6}>
      <CardActionArea component='a' href={`/blogs/${blog.id}`}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography>Title: {blog.title}</Typography>
              <Typography>Author: {blog.author}</Typography>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  )
}

export default Blog
