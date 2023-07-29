import { useState } from "react"
import { useQuery, useSubscription } from '@apollo/client'
import { BOOK_ADDED, BOOKS_BY_GENRE } from '../queries'
import { useApolloClient } from '@apollo/client'


const Books = ({ allbooks }) => {
    const [genre, setGenre] = useState('')
    const client = useApolloClient()  

    const booksByFilterResult = useQuery(BOOKS_BY_GENRE, {
      variables: { genreFilter: genre }
    })

    useSubscription(BOOK_ADDED, {
      onData: ({data}) => {
        const addedBook = data.data.bookAdded

        const uniqueBookByTitle = (b) => {
          let seen = new Set()
          return b.filter((i) => {
            let check = i.title
            return seen.has(check) ? false : seen.add(check)
          })
        }
  
        client.cache.updateQuery({query: BOOKS_BY_GENRE, variables: {genreFilter: genre}}, ({allBooks}) => {
          return {
            allBooks: uniqueBookByTitle(allBooks.concat(addedBook))
          }
        })
  
      },
      onError: (err) => {
        console.log(err)
      }
    })

    
    if (booksByFilterResult.loading) {
      return <div>loading...</div>
    }
    
    let booksToDisplay

    if(!genre) {
      booksToDisplay = allbooks
    } else {
      booksToDisplay = booksByFilterResult.data.allBooks
    }


    const genresArrs = allbooks.map(book => book.genres)
    const mergedGenres = [...new Set([].concat(...genresArrs))]
  
    return (
      <div>
        <h2>books</h2>

        <p>in genre <b>{genre ? genre : 'all genres'}</b></p>
  
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {booksToDisplay.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          {mergedGenres.map(g => <button key={g} onClick={() => {setGenre(g)}}>{g}</button>)}
          <button onClick={() => {setGenre('')}}>all genres</button>
        </div>

      </div>
    )
  }
  
  export default Books