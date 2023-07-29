import { useQuery, useSubscription } from '@apollo/client'
import { BOOKS_BY_GENRE, BOOK_ADDED } from '../queries'
import { useApolloClient } from '@apollo/client'

const RecommendBooks = ({ user, allbooks }) => {
  const client = useApolloClient()  
  const favoriteGenre = user.data.me.favoriteGenre

  const booksByFilterResult = useQuery(BOOKS_BY_GENRE, {
    variables: { genreFilter: favoriteGenre }
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

      client.cache.updateQuery({query: BOOKS_BY_GENRE, variables: {genreFilter: favoriteGenre}}, ({allBooks}) => {
        return {
          allBooks: uniqueBookByTitle(allBooks.concat(addedBook))
        }
      })

    },
    onError: (err) => {
      console.log(err)
    }
  })

  
  if (user.loading || booksByFilterResult.loading) {
    return <div>loading...</div>
  }


    let booksToDisplay

    if (booksByFilterResult.data.allBooks.length > 0) {
      booksToDisplay = booksByFilterResult.data.allBooks
    } else {
     booksToDisplay = allbooks
    }

    return (
        <>
        <h2>recommendations</h2>

        {
        booksByFilterResult.data.allBooks.length > 0 ?
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