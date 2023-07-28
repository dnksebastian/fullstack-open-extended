const { GraphQLError } = require('graphql')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')


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
      authorCount: async () => Author.collection.countDocuments(),
      me: (root, args, context) => {
        return context.currentUser
      }
    },
    Author: {
      bookCount: async (root) => {
          const bookAuthor = await Author.findOne({name: root.name})
          const booksByAuthor = await Book.find({ author: bookAuthor._id })
          return booksByAuthor.length
      }
    },
    Mutation: {
      addAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
  
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
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
  
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
            const populatedResult = await result.populate('author')
            pubsub.publish('BOOK_ADDED', { bookAdded: populatedResult })
            return populatedResult
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
      editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
  
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
  
  
      },
      createUser: async (root, args) => {
        const user = new User({ ...args })
    
        return await user.save()
          .catch(error => {
            throw new GraphQLError('Could not create user', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          })
      },
      login: async (root, args, context) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('Wrong login data', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })        
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
        
        const result = jwt.sign(userForToken, process.env.JWT_SECRET)
    
        return { value: result }
      },
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      }
    }
  }

  module.exports = resolvers