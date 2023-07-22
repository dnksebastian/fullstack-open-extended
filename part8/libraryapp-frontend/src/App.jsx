// import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'


import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import { useQuery } from '@apollo/client'

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
  // const [page, setPage] = useState('authors')

  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)

  if (authorsResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  return (
    <Router>
      <div style={navStyle}>
        <Link style={linkStyle} to="/">authors</Link>
        <Link style={linkStyle} to="/books">books</Link>
        <Link style={linkStyle} to="/add">add book</Link>
      </div>
      <Routes>
        <Route path='/' element={ <Authors allauthors={authorsResult.data.allAuthors}/> }/>
        <Route path='/books' element={ <Books allbooks={booksResult.data.allBooks}/> }/>
        <Route path='/add' element={ <NewBook /> }/>
      </Routes>
    </Router>
    // <div>
    //   <div>
    //     <button onClick={() => setPage('authors')}>authors</button>
    //     <button onClick={() => setPage('books')}>books</button>
    //     <button onClick={() => setPage('add')}>add book</button>
    //   </div>

    //   <Authors show={page === 'authors'} allauthors={authorsResult.data.allAuthors} />

    //   <Books show={page === 'books'} allbooks={booksResult.data.allBooks}/>

    //   <NewBook show={page === 'add'} />
    // </div>
  )
}

export default App