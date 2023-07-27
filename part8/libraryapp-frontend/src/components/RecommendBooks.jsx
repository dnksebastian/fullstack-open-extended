import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'

const RecommendBooks = ({ user, allbooks }) => {
  
  const favoriteGenre = user.data.me.favoriteGenre

  const booksByFilterResult = useQuery(BOOKS_BY_GENRE, {
    variables: { genreFilter: favoriteGenre }
  })

    if (user.loading) {
        return <div>loading...</div>
    }

    let booksToDisplay

    // const booksByFavoriteGenre = allbooks.filter(b => b.genres.includes(favoriteGenre))

    if (booksByFilterResult.length > 0) {
     booksToDisplay = booksByFilterResult
    } else {
     booksToDisplay = allbooks
    }

    return (
        <>
        <h2>recommendations</h2>

        {
        booksByFilterResult.length > 0 ?
        <p>books in your favorite genre <b>{favoriteGenre}</b></p>
        : 
        <p>could not find books in genre <b>{favoriteGenre}</b>, displaying all books </p>
        }

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {booksToDisplay.map(b => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>

        </>
    )
}

export default RecommendBooks