import { useState } from "react"
import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'

const Books = ({ allbooks }) => {
    const [genre, setGenre] = useState('')

    const booksByFilterResult = useQuery(BOOKS_BY_GENRE, {
      variables: { genreFilter: genre }
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


    // console.log(booksByFilterResult)
 
    // const books = [...props.allbooks]

    // let booksByGenre

    // if (genre) {
    //   booksByGenre = books.filter(b => b.genres.includes(genre))
    // } else {
    //   booksByGenre = books
    // }

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