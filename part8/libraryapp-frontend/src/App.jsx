import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'

import {
  BrowserRouter as Router,
  Routes, Route, Link, Navigate
} from 'react-router-dom'


import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

import { ALL_AUTHORS, ALL_BOOKS } from './queries'


const linkStyle = {
  padding: 5,
  backgroundColor: 'rgb(99, 135, 255)',
  marginLeft: 5,
  color: 'white',
  textDecoration: 'none',
  borderRadius: 5
}
const navStyle = {
  marginTop: 20,
  marginBottom: 30
}


const App = () => {
  const client = useApolloClient()
  const [token, setToken] = useState(null)

  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)

  useEffect(() => {
    setToken(localStorage.getItem('userToken'))
  }, [])

  console.log(token)

  if (authorsResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <Router>
      <div style={navStyle}>
        <Link style={linkStyle} to="/">authors</Link>
        <Link style={linkStyle} to="/books">books</Link>
        {!token && <Link style={linkStyle} to="/login">login</Link>}
        {token && <Link style={linkStyle} to="/add">add book</Link>}
        {token && <Link style={linkStyle} to="/logout" onClick={logout}>logout</Link>}
      </div>
      <Routes>
        <Route path='/' element={ <Authors token={token} allauthors={authorsResult.data.allAuthors}/> }/>
        <Route path='/books' element={ <Books allbooks={booksResult.data.allBooks}/> }/>
        <Route path='/login' element={ !token ? <LoginForm setToken={setToken} /> : <Navigate to="/" />}/>
        <Route path='/add' element={ token ? <NewBook /> : <Navigate to="/" /> }/>
        <Route path='/logout' element={ <Navigate to="/" /> }/>
        {/*  */}
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </Router>
  )
}

export default App