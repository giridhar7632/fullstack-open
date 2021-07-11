import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { setUsers } from '../reducers/usersReducer'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  table: {
    background: '#e7e9eb',
    minWidth: 650
  },
  cell: {
    color: 'black',
    '&:hover': {
      background: '#adaeaf'
    }
  }
})

const Users = () => {
  const users = useSelector(({ users }) => users)
  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()

  useEffect(() => {
    dispatch(setUsers())
  }, [])

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                className={classes.cell}
                key={user.id}
                onClick={() => history.push(`/users/${user.id}`)}
              >
                <TableCell component='th' scope='row'>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users
