import { useQuery, useSubscription } from '@apollo/client'
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
import RecommendBooks from './components/RecommendBooks'

import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, GET_CURRENT_USER } from './queries'


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

/* eslint-disable */
export const updateCache = (cache, query, addedBook) => {
  const uniqueBookByTitle = (b) => {
    let seen = new Set()
    return b.filter((i) => {
      let check = i.title
      return seen.has(check) ? false : seen.add(check)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueBookByTitle(allBooks.concat(addedBook)),
    }
  })

}
/* eslint-enable */


const App = () => {
  const client = useApolloClient()
  const [token, setToken] = useState(null)

  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  const currentUser = useQuery(GET_CURRENT_USER, {
    skip: !localStorage.getItem('userToken')
  })

  useEffect(() => {
    setToken(localStorage.getItem('userToken'))
  }, [])// eslint-disable-line

  useSubscription(BOOK_ADDED, {
    onData: ({data}) => {
      const addedBook = data.data.bookAdded

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)

      // window.alert(`Book ${addedBook.title} by ${addedBook.author.name} has been added!`)
      console.log(`Book ${addedBook.title} by ${addedBook.author.name} has been added!`)
    },
    onError: (err) => {
      console.log(err)
    }
  })


  if (authorsResult.loading || booksResult.loading || currentUser.loading) {
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
        {token && <Link style={linkStyle} to="/recommend">recommend</Link>}
        {token && <Link style={linkStyle} to="/logout" onClick={logout}>logout</Link>}
      </div>
      <Routes>
        <Route path='/' element={ <Authors token={token} allauthors={authorsResult.data.allAuthors}/> }/>
        <Route path='/books' element={ <Books allbooks={booksResult.data.allBooks}/> }/>
        <Route path='/login' element={ !token ? <LoginForm setToken={setToken} /> : <Navigate to="/" />}/>
        <Route path='/add' element={ token ? <NewBook /> : <Navigate to="/" /> }/>
        <Route path='/recommend' element={ currentUser ? <RecommendBooks allbooks={booksResult.data.allBooks} user={currentUser} /> : <Navigate to="/" /> }/>
        <Route path='/logout' element={ <Navigate to="/" /> }/>
        {/*  */}
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </Router>
  )
}

export default App