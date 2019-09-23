#!/usr/bin/env node
import {createServer} from 'http'
import {GraphQLSchema, GraphQLObjectType, GraphQLNonNull} from 'graphql'
import graphqlHTTP from 'express-graphql'

import {GraphQLRichText} from '@karma.run/graphql'

const GraphQLQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    richText: {
      type: GraphQLNonNull(GraphQLRichText),
      resolve() {}
    }
  }
})

const GraphQLMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createRichText: {
      type: GraphQLNonNull(GraphQLRichText),
      args: {
        richText: {
          type: GraphQLNonNull(GraphQLRichText),
          description: 'RichText to create.'
        }
      },
      resolve() {}
    }
  }
})

const schema = new GraphQLSchema({
  query: GraphQLQuery,
  mutation: GraphQLMutation
})

const server = createServer(
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
)

const port = process.env.PORT ? parseInt(process.env.PORT) : 3012
const address = process.env.ADDRESS ? process.env.ADDRESS : 'localhost'

server.listen(port, address)
console.log(`GraphQL server listening on: http://${address}:${port}`)
