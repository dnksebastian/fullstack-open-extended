const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')


require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to ', MONGODB_URI);


mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = `
type Author {
  name: String!
  born: Int
  bookCount: Int!
  id: ID!
}

type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}

type Query {
  allBooks(author: String, genre: String): [Book!]
  allAuthors: [Author!]!
  bookCount(author: String): Int!
  authorCount: Int!
}

type Mutation {
  addBook (
    title: String!
    author: String!
    published: Int!
    genres: [String!]
  ): Book

  addAuthor(
    name: String!
    born: Int
  ): Author

  editAuthor(
    name: String!
    setBornTo: Int!
  ): Author
}
`

const resolvers = {
  Query: {
    allBooks: async (root, args) => {

      if (Object.keys(args).length === 0) {
        return await Book.find({}).populate('author')
      } else if (args.author && args.genre) {
        const bookAuthor = await Author.findOne({name: args.author})
        return await Book.find({ author: bookAuthor._id, genres: args.genre }).populate('author')
      }
       else if (args.author) {
        const bookAuthor = await Author.findOne({name: args.author})
        return await Book.find({ author: bookAuthor._id })
      } else if (args.genre) {
        return await Book.find({genres: args.genre}).populate('author')
      }
      else {
        return await Book.find({}).populate('author')
      }

    },
    allAuthors: async (root, args) => {
      return await Author.find({})
    },
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments()
  },
  Author: {
    bookCount: async (root) => {
        const bookAuthor = await Author.findOne({name: root.name})
        const booksByAuthor = await Book.find({ author: bookAuthor._id })
        return booksByAuthor.length
    }
  },
  Mutation: {
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      const result = await author.save()
      return result
    },
    addBook: async (root, args) => {
      const checkAuthor = await Author.findOne({name: args.author})
      let bookAuthor

      if (!checkAuthor) {
        const newAuthor = new Author({name: args.author})
        bookAuthor = await newAuthor.save()
      } else {
        bookAuthor = checkAuthor
      }

      if(bookAuthor) {
        const newBook = new Book({ ...args, author: bookAuthor._id })
        const result = await newBook.save()
        return await result.populate('author')
      }
      
    },
    editAuthor: async (root, args) => {
      // const author = authors.find(a => a.name === args.name)
      // if (!author) {
      //   return null
      // }
      // const updatedAuthor = { ...author, born: args.setBornTo }
      // authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      // return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})