import {ApolloServer} from '@apollo/server'
import {Neo4jGraphQL} from '@neo4j/graphql'
import neo4j from 'neo4j-driver'
import {userTypeDefs} from 'users'
import {ContextValue} from 'types'
import {partyTypeDefs} from 'parties'
import {adminGroupTypeDefs} from 'adminGroups'

export const IS_DEV = process.env.NODE_ENV === 'development'

export const driver = neo4j.driver(
  process.env.DB_URL,
  neo4j.auth.basic(process.env.DB_USERNAME, process.env.DB_PASSWORD),
)

const typeDefs = [
  ...userTypeDefs,
  ...partyTypeDefs,
  ...adminGroupTypeDefs,
]

export const neoSchema = new Neo4jGraphQL({
  typeDefs,
  driver,
  debug: IS_DEV,
  features: {
    authorization: {
      key: process.env.JWT_SECRET,
    },
  },
})

const schema = await neoSchema.getSchema()

export const server = new ApolloServer<ContextValue>({
  schema,
  introspection: IS_DEV,
  includeStacktraceInErrorResponses: IS_DEV,
  stopOnTerminationSignals: true,
})

await neoSchema.assertIndexesAndConstraints({options: {create: true}})
