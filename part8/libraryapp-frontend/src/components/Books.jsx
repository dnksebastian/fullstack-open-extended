import { useState } from "react"

const Books = (props) => {

    const [genre, setGenre] = useState('')
 
    const books = [...props.allbooks]

    let booksByGenre

    if (genre) {
      booksByGenre = books.filter(b => b.genres.includes(genre))
    } else {
      booksByGenre = books
    }

    const genresArrs = books.map(book => book.genres)
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
            {booksByGenre.map((a) => (
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