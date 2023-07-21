import { gql } from '@apollo/client'


export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    published
    author
    genres
  }
}
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
    author
    published
    genres
    id
  }
}
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