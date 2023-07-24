const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')


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
      
      try {
        const result = await author.save()
        return result
      } catch (error) {
        if(error.errors.name.kind === 'required') {
          throw new GraphQLError('Saving author failed - name is required', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
        else if(error.errors.name.kind === 'unique') {
          throw new GraphQLError('Saving author failed - author is already in database', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        } else if (error.errors.name.kind === 'minlength') {
          throw new GraphQLError('Saving author failed - name must have at least 4 letters', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      }

    },
    addBook: async (root, args) => {
      const checkAuthor = await Author.findOne({name: args.author})
      let bookAuthor

      if (!checkAuthor) {
        const newAuthor = new Author({name: args.author})
        try {
          bookAuthor = await newAuthor.save()
        }
        catch (error) {
          throw new GraphQLError('Saving book failed - please enter correct author name', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      } else {
        bookAuthor = checkAuthor
      }

      if(bookAuthor) {
        const newBook = new Book({ ...args, author: bookAuthor._id })
        
        try {
          const result = await newBook.save()
          return await result.populate('author')
        }
        catch (error) {

          if (error.errors.title.kind === 'required') {
            throw new GraphQLError('Saving book failed - missing book title', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.title,
                error
              }
            })
          }
          else if (error.errors.title.kind === 'unique') {
            throw new GraphQLError('Saving book failed - book already in database', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.title,
                error
              }
            })
          }
          else if (error.errors.title.kind === 'minlength') {
            throw new GraphQLError('Saving book failed - title must be at least 5 characters long', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.title,
                error
              }
            })
          }
        }

      }
      
    },
    editAuthor: async (root, args) => {

        const author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })

        if (!author) {
          throw new GraphQLError('Something went wrong - please check entered data', {
            extensions: {
              code: 'BAD_USER_INPUT',
              error
            }
          })
          // return null
        }

        return author


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