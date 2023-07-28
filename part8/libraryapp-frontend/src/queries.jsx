import { gql } from '@apollo/client'

const AUTHOR_DETAILS = gql`
fragment AuthorDetails on Author {
  name
  born
  bookCount
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    ...AuthorDetails
  }
}
${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    published
    author {
      ...AuthorDetails
    }
    genres
  }
}
${AUTHOR_DETAILS}
`

export const BOOKS_BY_GENRE = gql `
query getBooksByGenre($genreFilter: String!){
  allBooks(genre: $genreFilter) {
    title
    published
    author {
      ...AuthorDetails
    }
    genres
  }
}
${AUTHOR_DETAILS}
`

export const ADD_BOOK = gql`
mutation createBook($title: String!, $author: String!, $publishedInt: Int!, $genres: [String!]){
  addBook(
    title: $title,
    author: $author,
    published: $publishedInt,
    genres: $genres
  )
  {
    title
    author {
      ...AuthorDetails
    }
    published
    genres
    id
  }
}
${AUTHOR_DETAILS}
`

export const EDIT_AGE = gql`
mutation editAge($nameValue: String!, $ageInt: Int!){
  editAuthor(name: $nameValue, setBornTo: $ageInt){
    name
    born
    bookCount
    id
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const GET_CURRENT_USER = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    title
    author {
      ...AuthorDetails
    }
    published
    genres
  }
}
${AUTHOR_DETAILS}
`