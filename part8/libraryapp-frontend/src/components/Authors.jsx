import AuthorForm from './AuthorForm'

const Authors = (props) => {
    if (!props.show) {
      return null
    }
    const authors = [...props.allauthors]
  
    return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Set Birthday</h2>
        <AuthorForm />
      </div>
    </>
    )
  }
  
  export default Authors